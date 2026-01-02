import React from 'react';
import { useDrop } from 'react-dnd'; // Enables drag-and-drop functionality
import './FavouritesList.css';

const FavoritesList = ({ favorites, onRemove, onClearFavorites, onAdd }) => {
  // Drop zone for adding properties to favorites
  const [{ isOver }, drop] = useDrop({
    accept: 'PROPERTY', // Accept items of type 'PROPERTY' for drag-and-drop
    drop: (item) => {
      // Check if the property is already in the favorites list
      const alreadyInFavorites = favorites.some((fav) => fav.id === item.property.id);
      if (!alreadyInFavorites) {
        onAdd(item.property); // Add to favorites if not already present
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(), // Indicates if an item is currently being dragged over the drop zone
    }),
  });

  return (
    <div
      className={`favorites-list ${isOver ? 'favorites-list-over' : ''}`} // Add hover effect styling if dragging over
      ref={drop} // Attach the drop zone reference
    >
      <h2>Your Favorites</h2>
      {favorites.length > 0 ? (
        <div className="favorites-container">
          {favorites.map((property) => (
            <div
              key={property.id} // Unique key for each favorite item
              className="favorite-item"
              draggable // Makes each favorite item draggable
              onDragStart={(e) => e.dataTransfer.setData('propertyId', property.id)} // Set the dragged item's ID
            >
              {/* Display property details */}
              <img src={property.picture} alt={property.location} />
              <h3>{property.location}</h3>
              <p>Type: {property.type}</p>
              <p>Bedrooms: {property.bedrooms}</p>
              <p>Price: £{property.price.toLocaleString()}</p>
              {/* Button to remove the property from favorites */}
              <button onClick={() => onRemove(property.id)}>Remove</button>
            </div>
          ))}
          {/* Button to clear all favorites */}
          <button className="clear-favorites-button" onClick={onClearFavorites}>
            Clear All
          </button>
        </div>
      ) : (
        <p>Drag properties here to add them to favorites.</p> // Placeholder message if no favorites exist
      )}
    </div>
  );
};

export default FavoritesList;
