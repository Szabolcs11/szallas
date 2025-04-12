export interface Accommodation {
  id: number;
  name: string;
  description: string;
  location: string;
  pricePerNight: number;
  imageUrl: string;
}

export interface Reservation {
  id: number;
  accommodationId: number;
  userId: number;
  checkIn: Date;
  checkOut: Date;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Review {
  id: number;
  accommodationId: number;
  rating: number;
  comment: string;
}
