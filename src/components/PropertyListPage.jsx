import React, { useEffect } from "react";
import PropertyList from "./PropertyList.jsx";
import FavoritesList from "./FavouritesList.jsx"; // Import FavoritesList
import propertiesData from "../Data/properties.json";

import "./PropertyListPage.css";

const PropertyListPage = ({ favorites, setFavorites }) => {
  // Sync favorites with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add property to favorites if not already added
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
    <div className="property-list-page">
      <h1>All Properties</h1>
      
      {/* Container for properties and favorites side by side */}
      <div className="property-list-container">
        {/* Left side: Property List */}
        <div className="properties-section">
          <PropertyList
            properties={propertiesData.properties}
            onAddToFavorites={addToFavorites}
          />
        </div>

        {/* Right side: Favorites Box */}
        <div className="favorites-section">
          <FavoritesList
            favorites={favorites}
            onRemove={removeFromFavorites}
            onClearFavorites={clearFavorites}
            onAdd={addToFavorites}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyListPage;