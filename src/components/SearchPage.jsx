import React, { useEffect } from "react";
import PropertySearch from "./PropertySearch";
import FavoritesList from "./FavouritesList";
import "./SearchPage.css";

const SearchPage = ({ favorites, setFavorites }) => {
  // Sync favorites with localStorage on each update
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add property to favorites if not already present
  const addToFavorites = (property) => {
    if (!favorites.some((fav) => fav.id === property.id)) {
      setFavorites((prevFavorites) => [...prevFavorites, property]);
    } else {
      alert("This property is already in your favorites!");
    }
  };

  // Remove property from favorites
  const removeFromFavorites = (propertyId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== propertyId)
    );
  };

  // Clear all favorites
  const clearFavorites = () => {
    setFavorites([]);
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

        <div className="search-layout">
          <div className="results-section">
            {/* Results will be shown here by PropertySearch component */}
          </div>

          <div className="favorites-sidebar">
            <FavoritesList
              favorites={favorites}
              onRemove={removeFromFavorites}
              onClearFavorites={clearFavorites}
              onAdd={addToFavorites}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
