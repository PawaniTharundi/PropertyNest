import React from "react";
import PropertyList from "./PropertyList.jsx";
import propertiesData from "../Data/properties.json";

import "./PropertyListPage.css";

const PropertyListPage = ({ favorites, setFavorites }) => {
  // Add property to favorites if not already added
  const addToFavorites = (property) => {
    if (!favorites.some((fav) => fav.id === property.id)) {
      setFavorites((prevFavorites) => [...prevFavorites, property]);
    } else {
      alert("This property is already in your favorites!");
    }
  };

  return (
    <div className="property-list-page">
      <h1>All Properties</h1>
      {/* Pass properties and add-to-favorites function to PropertyList */}
      <PropertyList
        properties={propertiesData.properties}
        onAddToFavorites={addToFavorites}
      />
    </div>
  );
};

export default PropertyListPage;
