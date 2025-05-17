export interface Accommodation {
  id?: number;
  title: string;
  description: string;
  location: string;
  price: number;
  rating: number;
  amenities: string[];
  userId: number;
  // imageUrls: string[];
  // imageUrl: string;
  // reviews: Review[];
}

export interface Review {
  id: number;
  userId: number;
  rating: number;
  comment: string;
  date: string;
  accommodationId: number;
}

export interface Reservation {
  id: number;
  accommodationId: number;
  userId: number;
  // checkIn: Date;
  // checkOut: Date;
}
