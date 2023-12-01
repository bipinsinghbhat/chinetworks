import React, { useEffect, useState } from "react";
import "./Favorites.css"; 

const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    const storedFavoriteMovies = localStorage.getItem("favoriteMovie");
    if (storedFavoriteMovies) {
      setFavoriteMovies(JSON.parse(storedFavoriteMovies));
    }
  }, []);

  const applyFilters = () => {
    let filtered = [...favoriteMovies];

    if (selectedGenre !== "") {
      filtered = filtered.filter((movie) =>
        movie.Genre.toLowerCase().includes(selectedGenre.toLowerCase())
      );
    }

    if (selectedYear !== "") {
      filtered = filtered.filter((movie) => movie.Year === selectedYear);
    }

    return filtered;
  };

  const removeMovieFromFavorites = (imdbID) => {
    const updatedFavoriteMovies = favoriteMovies.filter(
      (movie) => movie.imdbID !== imdbID
    );
    setFavoriteMovies(updatedFavoriteMovies);
    localStorage.setItem(
      "favoriteMovie",
      JSON.stringify(updatedFavoriteMovies)
    );
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div className="favorites-container">
      <h2>Favorite Movies</h2>
      <div className="filter-container">
        <label htmlFor="genre">Filter by Genre:</label>
        <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Drama">Drama</option>
          {/* Add other genre options */}
        </select>

        <label htmlFor="year">Filter by Year:</label>
        <select id="year" value={selectedYear} onChange={handleYearChange}>
          <option value="">All Years</option>
          <option value="1989">1989</option>
          <option value="1990">1990</option>
          <option value="1991">1991</option>
          <option value="1992">1992</option>
       
        </select>
      </div>

      <div className="movies-container">
        {applyFilters().length > 0 ? (
          applyFilters().map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img src={movie.Poster} alt="Favorite Movie Poster" />
              <h3>Title: {movie.Title}</h3>
              <h3>Actor: {movie.Actors}</h3>
              <h3>Genre: {movie.Genre}</h3>
              <h4>Imdb Rating: {movie.imdbRating}</h4>
              <button onClick={() => removeMovieFromFavorites(movie.imdbID)}>
                Remove from Favorites
              </button>
            </div>
          ))
        ) : (
          <p>No movies found with selected filters</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
