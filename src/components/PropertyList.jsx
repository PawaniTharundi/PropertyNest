import React from "react";
import { useDrag } from "react-dnd"; // Enables drag-and-drop functionality
import { Link } from "react-router-dom"; // Used for navigation to property details
import "./PropertyList.css";

const PropertyItem = ({ property, onAddToFavorites }) => {
  // Hook to make the property item draggable
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "PROPERTY", // Type identifier for drag-and-drop
    item: { property }, // Data to transfer during the drag
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(), // Indicates if the item is being dragged
    }),
  }));

  return (
    <div
      className={`property-item ${isDragging ? "dragging" : ""}`} // Apply styling when dragging
      ref={drag} // Attach the drag reference
    >
      {/* Display property image */}
      <img src={property.picture} alt={property.location} />
      {/* Display property details */}
      <h3>{property.location}</h3>
      <p>Type: {property.type}</p>
      <p>Bedrooms: {property.bedrooms}</p>
      <p>Furnishing: {property.furnishing}</p>
      <p>Has Garden: {property.hasGarden.toLocaleString()}</p>
      <p>Has Parking: {property.hasParking.toLocaleString()}</p>
      <p>Has Pet Friendly: {property.petFriendly.toLocaleString()}</p>
      <p>Price: £{property.price.toLocaleString()}</p>
      {/* Link to view detailed property page */}
      <Link to={`/property/${property.id}`}>View Details</Link>
      {/* Button to add property to favorites */}
      <button
        className="add-to-favorites-button"
        onClick={() => onAddToFavorites(property)}
      >
        Add to Favorites
      </button>
    </div>
  );
};

const PropertyList = ({ properties, onAddToFavorites }) => {
  return (
    <div className="property-list">
      {/* Display property items if available */}
      {properties.length > 0 ? (
        properties.map((property) => (
          <PropertyItem
            key={property.id} // Unique key for each property
            property={property} // Pass property data
            onAddToFavorites={onAddToFavorites} // Callback to handle adding to favorites
          />
        ))
      ) : (
        <p>No properties found.</p> // Message when no properties match the criteria
      )}
    </div>
  );
};

export default PropertyList;
