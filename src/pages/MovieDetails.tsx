import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, Calendar, Play } from 'lucide-react';
import { movies } from '../data/movies';

const MovieDetails = () => {
  const { id } = useParams();
  const movie = movies.find(m => m.id === parseInt(id || ''));

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
          <Link to="/" className="text-purple-400 hover:text-purple-300">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const showtimes = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'];

  // Build IMDb URL assuming you have movie.imdbId or build from title
  const imdbUrl = `https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
        <img 
          src={movie.backdrop} 
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Movie Poster */}
          <div className="lg:w-1/3">
            <img 
              src={movie.poster} 
              alt={movie.title}
              className="w-full max-w-sm mx-auto rounded-xl shadow-2xl"
            />
          </div>

          {/* Movie Info */}
          <div className="lg:w-2/3 text-white">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center space-x-1 bg-yellow-500 text-black px-3 py-1 rounded-lg">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-semibold">{movie.rating}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-300">
                <Clock className="w-5 h-5" />
                <span>{movie.duration}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-300">
                <Calendar className="w-5 h-5" />
                <span>{movie.year}</span>
              </div>
              <span className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm">
                {movie.genre}
              </span>
            </div>

            {/* Movie Description */}
            <p className="text-gray-300 text-lg mb-4 leading-relaxed">{movie.description}</p>

            {/* External IMDb Link */}
            <p className="mb-6">
              <a 
                href={imdbUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 underline"
              >
                View on IMDb
              </a>
            </p>

            {/* Showtimes */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Showtimes</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {showtimes.map((time) => (
                  <Link
                    key={time}
                    to={`/seats/${movie.id}`}
                    state={{ movie, showtime: time }}
                    className="bg-gray-800 hover:bg-purple-600 transition-colors p-3 rounded-lg text-center hover:shadow-lg hover:shadow-purple-500/20"
                  >
                    <div className="font-semibold">{time}</div>
                    <div className="text-sm text-gray-400">₹{movie.price}</div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Sharing */}
            <div className="mb-8 flex space-x-4">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300"
              >
                Share on Facebook
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=Check out ${encodeURIComponent(movie.title)} on CineMax!`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300"
              >
                Share on Twitter
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg transition-colors">
                <Play className="w-5 h-5" />
                <span>Watch Trailer</span>
              </button>
              <Link 
                to={`/seats/${movie.id}`}
                state={{ movie }}
                className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg transition-colors font-semibold"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
