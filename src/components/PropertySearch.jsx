import React, { useState } from "react";
import propertiesData from "../Data/properties.json"; // Import properties data from JSON file
import PropertyList from "./PropertyList.jsx"; // Component to display search results
import SearchForm from "./SearchForm.jsx"; // Component for the search form
import "./PropertySearch.css"; // Styling for this component

const PropertySearch = ({ onAddToFavorites }) => {
  const [filteredProperties, setFilteredProperties] = useState([]); // State to hold the filtered properties

  const handleSearch = (filters) => {
    // Filters the properties based on user criteria
    const filtered = propertiesData.properties.filter((property) => {
      // Check if the property matches the location filter
      const meetsLocation =
        !filters.location ||
        property.location
          .toLowerCase()
          .includes(filters.location.toLowerCase());

      // Check if the property matches the type filter
      const meetsType =
        !filters.type ||
        filters.type === "Any" ||
        property.type.toLowerCase() === filters.type.toLowerCase();

      // Check if the property meets the minimum price filter
      const meetsMinPrice =
        filters.minPrice === null || property.price >= filters.minPrice;

      // Check if the property meets the maximum price filter
      const meetsMaxPrice =
        filters.maxPrice === null || property.price <= filters.maxPrice;

      // Check if the property meets the minimum bedrooms filter
      const meetsMinBedrooms =
        filters.minBedrooms === null ||
        property.bedrooms >= filters.minBedrooms;

      // Check if the property meets the maximum bedrooms filter
      const meetsMaxBedrooms =
        filters.maxBedrooms === null ||
        property.bedrooms <= filters.maxBedrooms;

      // Parse the property's added date into a valid Date object
      const propertyAddedDate = new Date(
        property.added.year,
        new Date(Date.parse(property.added.month)).getMonth(),
        property.added.day
      );

      // Check if the property matches the "added after" date filter
      const meetsDateAdded =
        !filters.dateAdded || propertyAddedDate >= filters.dateAdded;

      // Include the property only if it meets all the conditions
      return (
        meetsLocation &&
        meetsType &&
        meetsMinPrice &&
        meetsMaxPrice &&
        meetsMinBedrooms &&
        meetsMaxBedrooms &&
        meetsDateAdded
      );
    });

    setFilteredProperties(filtered); // Update state with filtered properties
  };

  return (
    <div className="property-search">
      <div className="search-form-container">
        {/* Render the search form and pass the handleSearch callback */}
        <SearchForm onSearch={handleSearch} />
      </div>
      {/* Display search results if there are any */}
      {filteredProperties.length > 0 && (
        <div className="search-results-display">
          <h2>Search Results</h2>
          {/* Render the PropertyList component with the filtered properties */}
          <PropertyList
            properties={filteredProperties}
            onAddToFavorites={onAddToFavorites}
          />
        </div>
      )}
    </div>
  );
};

export default PropertySearch;
