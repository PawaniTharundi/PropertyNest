import React from "react";
import PropertySearch from "./PropertySearch";
import "./SearchPage.css";

const SearchPage = ({ favorites, setFavorites }) => {
  // Add property to favorites if not already present
  const addToFavorites = (property) => {
    if (!favorites.some((fav) => fav.id === property.id)) {
      setFavorites((prevFavorites) => [...prevFavorites, property]);
    } else {
      alert("This property is already in your favorites!");
    }
  };

  return (
    <div className="search-page-container">
      <div className="search-page-header">
        <h1 className="page-title">Discover Your Perfect Home</h1>
        <p className="page-subtitle">
          Use our advanced search filters to find properties that match your
          exact requirements
        </p>
      </div>

      <div className="search-content">
        <PropertySearch onAddToFavorites={addToFavorites} />
      </div>
    </div>
  );
};

export default SearchPage;