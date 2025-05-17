import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { Accommodation, Reservation } from './../models/accommodation';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  collection,
  collectionData,
  doc,
  Firestore,
  getDoc,
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
    const itemCollection = collection(this.firestore, 'accommodation');
    const item = collectionData<any>(itemCollection, {
      idField: 'id',
    });
    return item;
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
      accommodationId: accommodation.id,
      userId: userId,
    };
    this.reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
    return reservation.id;
  }
}
