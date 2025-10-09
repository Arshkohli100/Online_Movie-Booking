import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Calendar } from 'lucide-react';
import { movies } from '../data/movies';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-pink-900/90"></div>
        <img 
          src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg" 
          alt="Cinema"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Welcome to CineMax</h1>
            <p className="text-xl text-gray-200">Book your favorite movies with ease</p>
            <p className="text-lg text-purple-300 mt-2">Owned by Arshdeep Singh Kohli</p>

            {/* SEO-friendly descriptive paragraph */}
            <p className="max-w-3xl mx-auto text-gray-300 text-center mt-6 px-4 leading-relaxed">
              CineMax is your go-to platform for booking movie tickets online with ease and convenience. Whether you want to catch the latest blockbusters, timeless classics, or independent films, CineMax has you covered. Enjoy a seamless booking experience with multiple showtime options, real-time seat selection, and secure online payments. Stay updated with trending movies and exclusive offers to make your movie nights unforgettable.
            </p>

            {/* Social sharing links */}
            <div className="flex justify-center space-x-4 mt-4">
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://online-movie-booking-rho.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300"
              >
                Share on Facebook
              </a>
              <a
                href="https://twitter.com/intent/tweet?url=https://online-movie-booking-rho.vercel.app/&text=Book%20your%20movie%20tickets%20online%20at%20CineMax!"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300"
              >
                Share on Twitter
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Movies Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-white mb-8">Now Showing</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="group cursor-pointer">
              <Link to={`/movie/${movie.id}`}>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
                  <div className="relative">
                    <img 
                      src={movie.poster} 
                      alt={movie.title}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-yellow-500 text-black px-2 py-1 rounded-lg flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-semibold">{movie.rating}</span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">{movie.title}</h3>
                    <div className="flex items-center justify-between text-gray-400 text-sm mb-2">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{movie.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{movie.year}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">{movie.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-400 font-bold">₹{movie.price}</span>
                      <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">
                        {movie.genre}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* External link to IMDb */}
        <p className="text-center text-gray-400 mt-8">
          Learn more about movies on{' '}
          <a
            href="https://www.imdb.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300"
          >
            IMDb
          </a>.
        </p>
      </div>
    </div>
  );
};

export default Home;
