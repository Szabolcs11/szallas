import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Accommodation } from './../models/accommodation';

@Injectable({
  providedIn: 'root',
})
export class AccommodationService {
  private jsonUrl = 'placeholderdata/accommodations.json';

  constructor(private http: HttpClient) {}

  getAccommodations(): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>(this.jsonUrl);
  }
}
