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

// export interface Accommodation {
//   id: number;
//   name: string;
//   location: string;
//   description: string;
//   pricePerNight: number;
//   rating: number;
//   images: string[];
//   amenities: string[];
// }

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
  userId: number;
  rating: number;
  comment: string;
  date: string;
  accommodationId: number;
}
