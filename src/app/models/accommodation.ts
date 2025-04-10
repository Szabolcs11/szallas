export interface Accommodation {
  id: number;
  name: string;
  description: string;
  location: string;
  pricePerNight: number;
  imageUrl: string;
}

// reservation.ts
export interface Reservation {
  id: number;
  accommodationId: number;
  userId: number;
  checkIn: Date;
  checkOut: Date;
}

// user.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

// review.ts
export interface Review {
  id: number;
  accommodationId: number;
  rating: number;
  comment: string;
}
