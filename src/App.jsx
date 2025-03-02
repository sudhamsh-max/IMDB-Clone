import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = '83cfeb3b'; // Replace with your OMDB API key

  // Fetch movies based on the search term
  const fetchMovies = async (term) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${term}&apikey=${apiKey}`);
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search); // Set the movies result
      } else {
        setError(data.Error); // Display error if no movies found
      }
    } catch (err) {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search form submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetchMovies(searchTerm);
    }
  };

  // Fetch details of a specific movie when clicked
  const fetchMovieDetails = async (movieId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`);
      const data = await response.json();
      if (data.Response === 'True') {
        setSelectedMovie(data);
      } else {
        setError(data.Error);
      }
    } catch (err) {
      setError('Failed to fetch movie details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1 className="title">IMDB Clone</h1>

        {/* Search Form */}
        <form onSubmit={handleSearchSubmit} className="search-form" role="search">
          <input
            type="text"
            placeholder="Search for movies, TV shows, and celebrities"
            value={searchTerm}
            onChange={handleSearchChange}
            aria-label="Search for movies"
          />
          <button type="submit" aria-label="Submit search">Search</button>
        </form>
      </header>

      {/* Display loading */}
      {loading && <p className="loading">Loading...</p>}

      {/* Display error */}
      {error && <p className="error">{error}</p>}

      {/* Display Search Results */}
      {!selectedMovie && !loading && movies.length > 0 && (
        <div className="movie-list">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="movie-card"
              onClick={() => fetchMovieDetails(movie.imdbID)}
              role="button"
              tabIndex="0"
              aria-label={`View details of ${movie.Title}`}
            >
              <img src={movie.Poster} alt={movie.Title} />
              <h2>{movie.Title}</h2>
              <p>{movie.Year}</p>
            </div>
          ))}
        </div>
      )}

      {/* Display Movie Details */}
      {selectedMovie && !loading && (
        <div className="movie-details">
          <h2>{selectedMovie.Title}</h2>
          <img
            src={selectedMovie.Poster}
            alt={selectedMovie.Title}
            className="movie-poster"
          />
          <div className="details">
            <p><strong>Year:</strong> {selectedMovie.Year}</p>
            <p><strong>Rated:</strong> {selectedMovie.Rated}</p>
            <p><strong>Director:</strong> {selectedMovie.Director}</p>
            <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
            <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
            <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
            <p><strong>IMDB Rating:</strong> {selectedMovie.imdbRating}</p>
          </div>
          <button onClick={() => setSelectedMovie(null)} aria-label="Back to search">Back to Search</button>
        </div>
      )}
    </div>
  );import React, { useState } from 'react';
  import './App.css';
  
  const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const apiKey = '83cfeb3b'; // Replace with your OMDB API key
  
    // Fetch movies based on the search term
    const fetchMovies = async (term) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://www.omdbapi.com/?s=${term}&apikey=${apiKey}`);
        const data = await response.json();
        if (data.Response === 'True') {
          setMovies(data.Search); // Set the movies result
        } else {
          setError(data.Error); // Display error if no movies found
        }
      } catch (err) {
        setError('Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };
  
    // Handle search input change
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };
  
    // Handle search form submit
    const handleSearchSubmit = (e) => {
      e.preventDefault();
      if (searchTerm) {
        fetchMovies(searchTerm);
      }
    };
  
    // Fetch details of a specific movie when clicked
    const fetchMovieDetails = async (movieId) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`);
        const data = await response.json();
        if (data.Response === 'True') {
          setSelectedMovie(data);
        } else {
          setError(data.Error);
        }
      } catch (err) {
        setError('Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="App">
        <header className="header">
          <h1 className="title">IMDB Clone</h1>
  
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="search-form" role="search">
            <input
              type="text"
              placeholder="Search for movies, TV shows, and celebrities"
              value={searchTerm}
              onChange={handleSearchChange}
              aria-label="Search for movies"
            />
            <button type="submit" aria-label="Submit search">Search</button>
          </form>
        </header>
  
        {/* Display loading */}
        {loading && <p className="loading">Loading...</p>}
  
        {/* Display error */}
        {error && <p className="error">{error}</p>}
  
        {/* Display Search Results */}
        {!selectedMovie && !loading && movies.length > 0 && (
          <div className="movie-list">
            {movies.map((movie) => (
              <div
                key={movie.imdbID}
                className="movie-card"
                onClick={() => fetchMovieDetails(movie.imdbID)}
                role="button"
                tabIndex="0"
                aria-label={`View details of ${movie.Title}`}
              >
                <img src={movie.Poster} alt={movie.Title} />
                <h2>{movie.Title}</h2>
                <p>{movie.Year}</p>
              </div>
            ))}
          </div>
        )}
  
        {/* Display Movie Details */}
        {selectedMovie && !loading && (
          <div className="movie-details">
            <h2>{selectedMovie.Title}</h2>
            <img
              src={selectedMovie.Poster}
              alt={selectedMovie.Title}
              className="movie-poster"
            />
            <div className="details">
              <p><strong>Year:</strong> {selectedMovie.Year}</p>
              <p><strong>Rated:</strong> {selectedMovie.Rated}</p>
              <p><strong>Director:</strong> {selectedMovie.Director}</p>
              <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
              <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
              <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
              <p><strong>IMDB Rating:</strong> {selectedMovie.imdbRating}</p>
            </div>
            <button onClick={() => setSelectedMovie(null)} aria-label="Back to search">Back to Search</button>
          </div>
        )}
      </div>
    );
  };
  
  export default App;
  
};

export default App;
