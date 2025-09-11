import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { Download, Home, CheckCircle } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Ticket = () => {
  const navigate = useNavigate();
  const { bookingDetails } = useBooking();
  const ticketRef = useRef<HTMLDivElement>(null);

  if (!bookingDetails) {
    navigate('/');
    return null;
  }

  const downloadTicket = async () => {
    if (!ticketRef.current) return;

    try {
      const canvas = await html2canvas(ticketRef.current, {
        backgroundColor: '#1f2937',
        scale: 2
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save(`CineMax-Ticket-${bookingDetails.bookingId}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h1>
          <p className="text-gray-400">Your ticket has been generated successfully</p>
        </div>

        {/* Ticket */}
        <div 
          ref={ticketRef}
          className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl mb-8"
        >
          {/* Ticket Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">CineMax</h2>
                <p className="text-purple-200">Owned by Arshdeep Singh Kohli</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-purple-200">Booking ID</p>
                <p className="font-mono font-bold">{bookingDetails.bookingId}</p>
              </div>
            </div>
          </div>

          {/* Ticket Body */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">{bookingDetails.movie.title}</h3>
                
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="text-white font-semibold">
                      {new Date().toLocaleDateString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Show Time:</span>
                    <span className="text-white font-semibold">{bookingDetails.showtime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="text-white">{bookingDetails.movie.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Genre:</span>
                    <span className="text-white">{bookingDetails.movie.genre}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Seat Details</h4>
                
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span>Seats:</span>
                    <span className="text-white font-semibold">{bookingDetails.seats.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span className="text-white">{bookingDetails.seats.length} tickets</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price per ticket:</span>
                    <span className="text-white">₹{bookingDetails.movie.price}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-700 pt-3">
                    <span className="font-semibold">Total Amount:</span>
                    <span className="text-white font-bold text-lg">₹{bookingDetails.totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code Area */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Please present this ticket at the cinema</p>
                  <p className="text-purple-400 text-sm font-semibold">
                    Arrive 15 minutes before showtime
                  </p>
                </div>
                <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Footer */}
          <div className="bg-gray-900 px-6 py-4">
            <p className="text-gray-400 text-xs text-center">
              Thank you for choosing CineMax! Enjoy your movie experience.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={downloadTicket}
            className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <Download className="w-5 h-5" />
            <span>Download PDF</span>
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ticket;