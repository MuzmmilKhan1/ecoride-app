import React, { createContext, useState, useContext } from 'react';

// Create a context
const BookingContext = createContext();

// Create a custom hook to use the context
export const useBookingContext = () => useContext(BookingContext);

// Data Provider component
export const BookingProvider = ({ children }) => {
  const [timeStamp, setTimeStamp] = useState(0);
  const [price, setPrice] = useState(15);
  const [totalAmount, setTotalAmount] = useState(0);

  return (
    <BookingContext.Provider value={{ timeStamp, setTimeStamp, price, setPrice, totalAmount, setTotalAmount }}>
      {children}
    </BookingContext.Provider>
  );
};
