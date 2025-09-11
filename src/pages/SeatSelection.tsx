import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { ArrowLeft } from 'lucide-react';

const SeatSelection = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { setBookingDetails } = useBooking();
  
  const movie = location.state?.movie;
  const showtime = location.state?.showtime || '7:00 PM';
  
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Generate seat layout
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 12;
  
  // Mock occupied seats
  const occupiedSeats = ['A5', 'A6', 'B8', 'C3', 'C4', 'D10', 'E7', 'F2', 'F3', 'G9'];

  const toggleSeat = (seatId: string) => {
    if (occupiedSeats.includes(seatId)) return;
    
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(seat => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const getSeatClass = (seatId: string) => {
    if (occupiedSeats.includes(seatId)) return 'bg-red-500 cursor-not-allowed';
    if (selectedSeats.includes(seatId)) return 'bg-purple-500 hover:bg-purple-600';
    return 'bg-gray-600 hover:bg-gray-500 cursor-pointer';
  };

  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) return;

    const bookingDetails = {
      movie,
      showtime,
      seats: selectedSeats,
      totalPrice: selectedSeats.length * movie.price,
      bookingId: `BK${Date.now()}`
    };

    setBookingDetails(bookingDetails);
    navigate('/payment');
  };

  if (!movie) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate(`/movie/${id}`)}
            className="text-gray-400 hover:text-white mr-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
            <p className="text-gray-400">{showtime} • ₹{movie.price} per seat</p>
          </div>
        </div>

        {/* Screen */}
        <div className="text-center mb-12">
          <div className="relative">
            <div className="w-full h-2 bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-full mb-4"></div>
            <p className="text-gray-400 text-sm">SCREEN</p>
          </div>
        </div>

        {/* Seat Map */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8">
          <div className="space-y-4">
            {rows.map((row) => (
              <div key={row} className="flex items-center justify-center space-x-2">
                <span className="text-white font-semibold w-6">{row}</span>
                {Array.from({ length: seatsPerRow }, (_, i) => {
                  const seatNumber = i + 1;
                  const seatId = `${row}${seatNumber}`;
                  
                  return (
                    <button
                      key={seatId}
                      onClick={() => toggleSeat(seatId)}
                      className={`w-8 h-8 rounded-lg transition-all duration-200 text-xs font-semibold ${getSeatClass(seatId)}`}
                      disabled={occupiedSeats.includes(seatId)}
                    >
                      {seatNumber}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex justify-center space-x-8 mt-8 pt-6 border-t border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-600 rounded"></div>
              <span className="text-gray-400 text-sm">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span className="text-gray-400 text-sm">Selected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-gray-400 text-sm">Occupied</span>
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Booking Summary</h3>
              <div className="text-gray-400">
                {selectedSeats.length > 0 ? (
                  <>
                    <p>Selected Seats: {selectedSeats.join(', ')}</p>
                    <p className="text-white font-semibold mt-1">
                      Total: ₹{selectedSeats.length * movie.price}
                    </p>
                  </>
                ) : (
                  <p>No seats selected</p>
                )}
              </div>
            </div>
            
            <button
              onClick={handleProceedToPayment}
              disabled={selectedSeats.length === 0}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-8 py-3 rounded-lg transition-colors font-semibold text-white"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;