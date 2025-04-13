import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Accommodation, Reservation } from './../models/accommodation';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AccommodationService {
  private jsonUrl = 'placeholderdata/accommodations.json';
  private reservations: Reservation[] = [];

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  getAccommodations(): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>(this.jsonUrl);
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
