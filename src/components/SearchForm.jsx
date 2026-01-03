import React, { useState } from "react";
import "./SearchForm.css";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faMapMarkerAlt,
  faBed,
  faPoundSign,
} from "@fortawesome/free-solid-svg-icons";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const SearchForm = ({ onSearch }) => {
  // State hooks for form inputs
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [priceRange, setPriceRange] = useState([0, 3000000]);
  const [minBedrooms, setMinBedrooms] = useState("");
  const [maxBedrooms, setMaxBedrooms] = useState("");
  const [dateAdded, setDateAdded] = useState(null);
  const [propertyStatus, setPropertyStatus] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [hasGarden, setHasGarden] = useState("");
  const [hasParking, setHasParking] = useState("");
  const [petFriendly, setPetFriendly] = useState("");
  const [minSquareFeet, setMinSquareFeet] = useState("");
  const [keywords, setKeywords] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Property type options
  const typeOptions = [
    { value: "", label: "Any" },
    { value: "House", label: "House" },
    { value: "Flat", label: "Flat" },
  ];

  // Bedroom options (1-6)
  const bedroomOptions = Array.from({ length: 6 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}`,
  }));

  // Property status options
  const statusOptions = [
    { value: "", label: "Any" },
    { value: "sale", label: "For Sale" },
    { value: "rent", label: "To Rent" },
  ];

  // Furnishing options
  const furnishingOptions = [
    { value: "", label: "Any" },
    { value: "furnished", label: "Furnished" },
    { value: "unfurnished", label: "Unfurnished" },
    { value: "part-furnished", label: "Part Furnished" },
  ];

  // Yes/No/Any options
  const yesNoOptions = [
    { value: "", label: "Any" },
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  // Custom styles for React Select (blue theme)
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "12px",
      border: state.isFocused ? "2px solid #1976d2" : "2px solid #cfd8dc",
      padding: "0.3rem 0.5rem",
      boxShadow: state.isFocused ? "0 0 0 3px rgba(25, 118, 210, 0.1)" : "none",
      fontFamily: "'Inter', sans-serif",
      "&:hover": {
        borderColor: "#1976d2",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#1976d2"
        : state.isFocused
        ? "#e3f2fd"
        : "white",
      color: state.isSelected ? "white" : "#263238",
      padding: "0.8rem 1rem",
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#78909c",
    }),
  };

  // Handle form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    // Check if minBedrooms is less than or equal to maxBedrooms
    if (
      minBedrooms &&
      maxBedrooms &&
      parseInt(minBedrooms) > parseInt(maxBedrooms)
    ) {
      alert("Minimum bedrooms cannot exceed maximum bedrooms.");
      return;
    }

    // Trigger onSearch with the collected data
    // Trigger onSearch with the collected data (including new fields)
    onSearch({
      location,
      type,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      minBedrooms: minBedrooms || null,
      maxBedrooms: maxBedrooms || null,
      dateAdded,
      // New search criteria
      propertyStatus,
      furnishing,
      hasGarden,
      hasParking,
      petFriendly,
      minSquareFeet: minSquareFeet || null,
      keywords,
    });
  };

  return (
    <form className="search-form" onSubmit={handleSearchSubmit} role="form">
      {/* Location input */}
      <div className="search-group location-group">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
        <input
          type="text"
          placeholder="Enter a location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Property type dropdown */}
      <div className="search-group property-type-selector">
        <Select
          options={typeOptions}
          onChange={(option) => setType(option.value)}
          placeholder="Property Type"
          isClearable
          styles={customSelectStyles}
        />
      </div>

      {/* Price range slider */}
      <div className="search-group price-group">
        <FontAwesomeIcon icon={faPoundSign} className="icon" />
        <Slider
          range
          min={0}
          max={3000000}
          step={10000}
          value={priceRange}
          onChange={setPriceRange}
        />
        <div className="price-labels">
          <span>£{priceRange[0].toLocaleString()}</span> -{" "}
          <span>£{priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Bedrooms selection */}
      <div className="search-group bedrooms-selector">
        <FontAwesomeIcon icon={faBed} className="icon" />
        <Select
          options={bedroomOptions}
          onChange={(option) => setMinBedrooms(option ? option.value : "")}
          placeholder="Min Bedrooms"
          isClearable
          styles={customSelectStyles}
        />
        <Select
          options={bedroomOptions}
          onChange={(option) => setMaxBedrooms(option ? option.value : "")}
          placeholder="Max Bedrooms"
          isClearable
          styles={customSelectStyles}
        />
      </div>

      {/* Date added picker */}
      <div className="search-group date-picker">
        <DatePicker
          selected={dateAdded}
          onChange={(date) => setDateAdded(date)}
          placeholderText="Date Added"
          isClearable
        />
      </div>

      {/* Property Status */}
      <div className="search-group property-status-group">
        <label>
          <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
          Property Status
        </label>
        <Select
          options={statusOptions}
          onChange={(option) => setPropertyStatus(option?.value || "")}
          placeholder="For Sale or Rent"
          isClearable
          styles={customSelectStyles}
        />
      </div>

      {/* Advanced Filters Toggle Button */}
      <div className="advanced-toggle">
        <button
          type="button"
          className="toggle-button"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? "− Hide Advanced Filters" : "+ Show Advanced Filters"}
        </button>
      </div>

      {/* Advanced Filters Section */}
      {showAdvanced && (
        <div className="advanced-filters">
          <h3 className="advanced-title">Advanced Filters</h3>

          <div className="filters-grid">
            {/* Furnishing */}
            <div className="search-group">
              <label>🛋️ Furnishing</label>
              <Select
                options={furnishingOptions}
                onChange={(option) => setFurnishing(option?.value || "")}
                placeholder="Any"
                isClearable
                styles={customSelectStyles}
              />
            </div>

            {/* Garden */}
            <div className="search-group">
              <label>🌳 Garden</label>
              <Select
                options={yesNoOptions}
                onChange={(option) => setHasGarden(option?.value || "")}
                placeholder="Any"
                isClearable
                styles={customSelectStyles}
              />
            </div>

            {/* Parking */}
            <div className="search-group">
              <label>🚗 Parking</label>
              <Select
                options={yesNoOptions}
                onChange={(option) => setHasParking(option?.value || "")}
                placeholder="Any"
                isClearable
                styles={customSelectStyles}
              />
            </div>

            {/* Pet Friendly */}
            <div className="search-group">
              <label>🐕 Pet Friendly</label>
              <Select
                options={yesNoOptions}
                onChange={(option) => setPetFriendly(option?.value || "")}
                placeholder="Any"
                isClearable
                styles={customSelectStyles}
              />
            </div>

            {/* Minimum Square Footage */}
            <div className="search-group">
              <label>📏 Min Square Feet</label>
              <input
                type="number"
                placeholder="e.g., 1000"
                value={minSquareFeet}
                onChange={(e) => setMinSquareFeet(e.target.value)}
                className="number-input"
                min="0"
              />
            </div>

            {/* Keywords Search */}
            <div className="search-group full-width">
              <label>🔍 Keywords</label>
              <input
                type="text"
                placeholder="e.g., balcony, fireplace, en-suite"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="keywords-input"
              />
            </div>
          </div>
        </div>
      )}

      {/* Submit button */}
      <button type="submit" className="search-button">
        <FontAwesomeIcon icon={faSearch} /> Search
      </button>
    </form>
  );
};

export default SearchForm;
