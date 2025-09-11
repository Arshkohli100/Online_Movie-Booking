import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Movie {
  id: number;
  title: string;
  genre: string;
  duration: string;
  year: number;
  rating: number;
  price: number;
  poster: string;
  backdrop: string;
  description: string;
}

interface BookingDetails {
  movie: Movie;
  showtime: string;
  seats: string[];
  totalPrice: number;
  bookingId: string;
}

interface BookingContextType {
  bookingDetails: BookingDetails | null;
  setBookingDetails: (details: BookingDetails) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  return (
    <BookingContext.Provider value={{ bookingDetails, setBookingDetails }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};