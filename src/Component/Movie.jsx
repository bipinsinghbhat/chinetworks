
import React, { useEffect, useState } from "react";
import "./Movie.css"


const FetchandFilter = () => {
  const [data, setData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState({});
  const [loading, setLoading] = useState(false);

  const getData = async (url) => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return {};
    } finally {
      setLoading(false);
    }
  };

  const fetchMovie = async (searchTerm) => {
    const apiUrl = `http://www.omdbapi.com/?apikey=ce2f7920&t=${searchTerm}`;
    const result = await getData(apiUrl);
    setSearchResult(result);
  };

  const handleSearch = () => {
    fetchMovie(searchTerm);
  };

  const handleAddToFavorites = () => {
   
    let storedFavoriteMovies = JSON.parse(localStorage.getItem("favoriteMovie")) || [];
  
   
    if (!Array.isArray(storedFavoriteMovies)) {
      storedFavoriteMovies = [];
    }
  
   
    const isMovieAlreadyAdded = storedFavoriteMovies.some(
      (favMovie) => favMovie.imdbID === searchResult?.imdbID
    );
  
    if (!isMovieAlreadyAdded && searchResult) {
     
      const updatedFavoriteMovies = [...storedFavoriteMovies, searchResult];
      localStorage.setItem("favoriteMovie", JSON.stringify(updatedFavoriteMovies));
    } else {
      console.log("This movie is already in your favorites list or no movie found!");
    }
  };
  
  

  useEffect(() => {
    if (searchTerm !== "") {
      handleSearch();
    } else {
    
      fetchMovie("Batman");
    }
  }, [searchTerm]);

  return (
    <div style={{backgroundColor: "lightblue"}}>
      <div className="search-container">
      <input
        className="search-input"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a movie..."
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div key={searchResult?.imdbID} className="divv">
          <img src={searchResult?.Poster} alt="Movie Poster" />
          <h4>Title: {searchResult?.Title}</h4>
          <h4>Actors: {searchResult?.Actors}</h4>
          <h4>Genre: {searchResult?.Genre}</h4>
          <h4>Release Year:{searchResult?.Year}</h4>
          <h4>Imbd Rating:{searchResult?.imdbRating}</h4>
          <button className="add-to-favorites" onClick={handleAddToFavorites}>Add to Favorites</button>
        </div>
      )}
    </div>
  );
};

export default FetchandFilter;
