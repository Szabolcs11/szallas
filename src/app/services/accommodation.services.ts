import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { from, map, Observable, switchMap } from 'rxjs';
import { Accommodation, Reservation } from './../models/accommodation';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  collection,
  collectionData,
  doc,
  Firestore,
  getDoc,
  getDocs,
  where,
  query,
  orderBy,
  addDoc,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AccommodationService {
  private jsonUrl = 'placeholderdata/accommodations.json';
  private reservations: Reservation[] = [];

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private firestore: Firestore
  ) {}

  getAccommodations(): Observable<Accommodation[]> {
    const itemCollection = query(
      collection(this.firestore, 'accommodation'),
      orderBy('createdAt', 'desc')
    );

    return collectionData<Accommodation>(itemCollection as any, {
      idField: 'id',
    });
  }

  getAccommodationById(id: string): Observable<Accommodation | undefined> {
    const itemDocRef = doc(this.firestore, 'accommodation', id);
    return from(getDoc(itemDocRef)).pipe(
      map((docSnapshot) => {
        if (docSnapshot.exists()) {
          return { id: docSnapshot.id, ...docSnapshot.data() } as any;
        } else {
          return undefined;
        }
      })
    );
  }

  getAccommodationsByLocation(location: string): Observable<Accommodation[]> {
    const itemCollection = collection(this.firestore, 'accommodation');
    const q = query(
      itemCollection,
      where('location', '==', location),
      orderBy('title', 'asc')
    );
    return from(getDocs(q)).pipe(
      map((querySnapshot) => {
        const accommodations: Accommodation[] = [];
        querySnapshot.forEach((doc) => {
          accommodations.push({ id: doc.id, ...doc.data() } as any);
        });
        return accommodations;
      })
    );
  }

  getAccommodationsByPriceRange(
    minPrice: number | null,
    maxPrice: number | null
  ): Observable<Accommodation[]> {
    const itemCollection = collection(this.firestore, 'accommodation');
    let q = query(itemCollection);
    if (minPrice !== null) {
      q = query(q, where('price', '>=', minPrice));
    }
    if (maxPrice !== null) {
      q = query(q, where('price', '<=', maxPrice));
    }
    return from(getDocs(q)).pipe(
      map((querySnapshot) => {
        const accommodations: Accommodation[] = [];
        querySnapshot.forEach((doc) => {
          accommodations.push({ id: doc.id, ...doc.data() } as any);
        });
        return accommodations;
      })
    );
  }

  createAccommodation(accommodation: Accommodation): Promise<any> {
    if (!accommodation) {
      this.snackBar.open('Szállás nem található!', 'Bezárás', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      return Promise.resolve(false);
    }
    const itemCollection = collection(this.firestore, 'accommodation');
    return from(addDoc(itemCollection, accommodation))
      .pipe(
        map((docRef) => {
          if (docRef.id) {
            this.snackBar.open('Szállás sikeresen létrehozva!', 'Bezárás', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
            return true;
          } else {
            this.snackBar.open(
              'Hiba történt a szállás létrehozásakor!',
              'Bezárás',
              {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
              }
            );
            return false;
          }
        })
      )
      .toPromise();
  }

  getUserAccommodations(userId: string): Observable<Accommodation[]> {
    const itemCollection = collection(this.firestore, 'accommodation');
    const q = query(
      itemCollection,
      where('userId', '==', userId),
      orderBy('title', 'asc')
    );
    return from(getDocs(q)).pipe(
      map((querySnapshot) => {
        const accommodations: Accommodation[] = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          data['id'] = doc.id;
          accommodations.push(data as any);
        });
        return accommodations;
      })
    );
  }

  deleteAccommodation(id: string): Promise<void> {
    const itemDocRef = doc(this.firestore, 'accommodation', id);
    return from(getDoc(itemDocRef))
      .pipe(
        map((docSnapshot) => {
          if (docSnapshot.exists()) {
            return deleteDoc(itemDocRef);
          } else {
            this.snackBar.open('Szállás nem található!', 'Bezárás', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
            return Promise.resolve();
          }
        }),
        switchMap((deleteOperation) => from(deleteOperation))
      )
      .toPromise();
  }

  updateAccommodation(id: string, accommodation: Accommodation): Promise<void> {
    const itemDocRef = doc(this.firestore, 'accommodation', id);
    return from(
      updateDoc(itemDocRef, {
        title: accommodation.title,
        location: accommodation.location,
        price: accommodation.price,
        description: accommodation.description,
      })
    )
      .pipe(
        map(() => {
          this.snackBar.open('Szállás sikeresen frissítve!', 'Bezárás', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          // return true;
        })
      )
      .toPromise()
      .catch((error) => {
        this.snackBar.open(
          'Error updating accommodation. Please try again.',
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          }
        );
      });
  }

  addReservation(accommodation: Accommodation): number {
    if (!accommodation) {
      this.snackBar.open('Szállás nem található!', 'Bezárás', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      return 0;
    }
    const user = localStorage.getItem('currentUser');
    if (!user) {
      this.snackBar.open('Kérjük, jelentkezzen be a foglaláshoz!', 'Bezárás', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      return 0;
    }
    const parsedUser = JSON.parse(user);
    if (!parsedUser) {
      this.snackBar.open(
        'Hiba történt a felhasználó betöltésekor!',
        'Bezárás',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }
      );
      return 0;
    }
    const userId = parsedUser.id;
    const reservation: Reservation = {
      id: this.reservations.length + 1,
      accommodationId: accommodation.id as unknown as number,
      userId: userId,
    };
    this.reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
    return reservation.id;
  }
}
