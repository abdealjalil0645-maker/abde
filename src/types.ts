export type Language = 'en' | 'ar';

export interface Room {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  pricePerNight: number; // in MAD (Moroccan Dirham)
  capacity: number;
  sizeSqM: number;
  featuresEn: string[];
  featuresAr: string[];
  image: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  roomId: string;
  roomNameEn: string;
  roomNameAr: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  isCustom?: boolean;
}

export interface Amenity {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  iconName: string;
}
