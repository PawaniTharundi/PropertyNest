import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import propertiesData from "../Data/properties.json"; // Import properties data from JSON file
import "./PropertyDetail.css";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = propertiesData.properties.find((prop) => prop.id === id);

  // State for current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // State for active tab
  const [activeTab, setActiveTab] = useState("description");

  // If property not found
  if (!property) {
    return (
      <div className="property-detail-container">
        <div className="not-found">
          <h2>Property Not Found</h2>
          <button onClick={() => navigate("/property-list")}>
            ← Back to Properties
          </button>
        </div>
      </div>
    );
  }

  // Use only first 4 images
  const images = property.pictures ? property.pictures.slice(0, 4) : [];

  // Go to next image
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  // Go to previous image
  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Shorten description to 300 characters
  const shortDescription = property.description
    ? property.description.substring(0, 300) + "..."
    : "No description available.";

  return (
    <div className="property-detail-container">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Property Header */}
      <div className="property-header">
        <h1 className="property-title">{property.location}</h1>
        <div className="property-price">£{property.price.toLocaleString()}</div>
      </div>

      {/* Image Slider */}
      <div className="image-slider">
        {images.length > 0 ? (
          <>
            <img
              src={images[currentImageIndex]}
              alt={`Property ${currentImageIndex + 1}`}
              className="main-image"
            />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button className="arrow arrow-left" onClick={previousImage}>
                  ‹
                </button>
                <button className="arrow arrow-right" onClick={nextImage}>
                  ›
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="image-counter">
              {currentImageIndex + 1} / {images.length}
            </div>

            {/* Thumbnail Dots */}
            <div className="thumbnail-dots">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${
                    index === currentImageIndex ? "active" : ""
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                ></span>
              ))}
            </div>
          </>
        ) : (
          <div className="no-image">No images available</div>
        )}
      </div>

      {/* Property Info Grid */}
      <div className="property-info-grid">
        <div className="info-card">
          <span className="info-icon">🏠</span>
          <div className="info-content">
            <div className="info-label">Type</div>
            <div className="info-value">{property.type}</div>
          </div>
        </div>

        <div className="info-card">
          <span className="info-icon">🛏️</span>
          <div className="info-content">
            <div className="info-label">Bedrooms</div>
            <div className="info-value">{property.bedrooms}</div>
          </div>
        </div>

        <div className="info-card">
          <span className="info-icon">📋</span>
          <div className="info-content">
            <div className="info-label">Tenure</div>
            <div className="info-value">{property.tenure}</div>
          </div>
        </div>

        <div className="info-card">
          <span className="info-icon">📅</span>
          <div className="info-content">
            <div className="info-label">Added</div>
            <div className="info-value">
              {property.added.month} {property.added.day}, {property.added.year}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="tabs-section">
        <div className="tabs-header">
          <button
            className={`tab-button ${
              activeTab === "description" ? "active" : ""
            }`}
            onClick={() => setActiveTab("description")}
          >
            📝 Description
          </button>
          <button
            className={`tab-button ${activeTab === "location" ? "active" : ""}`}
            onClick={() => setActiveTab("location")}
          >
            📍 Location
          </button>
        </div>

        <div className="tabs-content">
          {activeTab === "description" && (
            <div className="tab-panel">
              <h3>About This Property</h3>
              <p className="description-text">{shortDescription}</p>
            </div>
          )}

          {activeTab === "location" && (
            <div className="tab-panel">
              <h3>Location</h3>
              <p className="location-address">{property.location}</p>
              <div className="map-container">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    property.location
                  )}&output=embed`}
                  width="100%"
                  height="350"
                  style={{ border: 0, borderRadius: "12px" }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Property Location"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="btn-contact">📞 Contact Agent</button>
        <button className="btn-save">❤️ Save Property</button>
      </div>
    </div>
  );
};

export default PropertyDetail;
