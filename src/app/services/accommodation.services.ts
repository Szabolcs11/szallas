import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Accommodation, Reservation } from './../models/accommodation';

@Injectable({
  providedIn: 'root',
})
export class AccommodationService {
  private jsonUrl = 'placeholderdata/accommodations.json';
  private reservations: Reservation[] = [];

  constructor(private http: HttpClient) {}

  getAccommodations(): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>(this.jsonUrl);
  }

  addReservation(accommodation: Accommodation): number {
    if (!accommodation) {
      alert('Szállás nem található!');
      return 0;
    }
    const user = localStorage.getItem('currentUser');
    if (!user) {
      alert('Kérjük, jelentkezzen be a foglaláshoz!');
      return 0;
    }
    const parsedUser = JSON.parse(user);
    if (!parsedUser) {
      alert('Hiba történt a felhasználó betöltésekor!');
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
