import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import SeatSelection from './pages/SeatSelection';
import Payment from './pages/Payment';
import Ticket from './pages/Ticket';
import { BookingProvider } from './context/BookingContext';

function App() {
  return (
    <BookingProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800">
          <Navbar />

          {/* ✅ Hidden H1 for SEO (Google will see it, users won’t) */}
          <h1 className="sr-only">CineMax – Online Movie Ticket Booking</h1>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/seats/:id" element={<SeatSelection />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/ticket" element={<Ticket />} />
          </Routes>
        </div>
      </Router>
    </BookingProvider>
  );
}

export default App;
