export interface Accommodation {
  id: number;
  name: string;
  description: string;
  location: string;
  pricePerNight: number;
  imageUrl: string;
  imageUrls: string[];
  rating: number;
  amenities: string[];
  reviews: Review[];
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
  checkIn: Date;
  checkOut: Date;
}
