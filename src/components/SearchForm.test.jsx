import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchForm from "./SearchForm";

// Mock react-select to avoid complex component issues
jest.mock("react-select", () => {
  return function MockSelect({ placeholder, onChange, options }) {
    return (
      <select
        data-testid={`select-${placeholder}`}
        onChange={(e) => {
          const selectedOption = options.find(
            (opt) => opt.value === e.target.value
          );
          onChange(selectedOption);
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };
});

// Mock react-datepicker
jest.mock("react-datepicker", () => {
  return function MockDatePicker({ placeholderText, onChange }) {
    return (
      <input
        type="date"
        placeholder={placeholderText}
        onChange={(e) =>
          onChange(e.target.value ? new Date(e.target.value) : null)
        }
        data-testid="date-picker"
      />
    );
  };
});

// Mock rc-slider
jest.mock("rc-slider", () => {
  return function MockSlider({ value, onChange, min, max }) {
    return (
      <input
        type="range"
        min={min}
        max={max}
        value={value[0]}
        onChange={(e) => onChange([parseInt(e.target.value), value[1]])}
        data-testid="price-slider"
      />
    );
  };
});

describe("SearchForm Component", () => {
  // Test 1: Check if form renders correctly
  test("renders the search form", () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);

    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();
  });

  // Test 2: Check if location input works
  test("allows user to enter location", () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);

    const locationInput = screen.getByPlaceholderText("Enter a location");
    fireEvent.change(locationInput, { target: { value: "London" } });

    expect(locationInput.value).toBe("London");
  });

  // Test 3: Check if property type selector renders
  test("renders property type selector", () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);

    const propertyTypeSelect = screen.getByTestId("select-Property Type");
    expect(propertyTypeSelect).toBeInTheDocument();
  });

  // Test 4: Check if search button exists
  test("renders search button", () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);

    const searchButton = screen.getByRole("button", { name: /search/i });
    expect(searchButton).toBeInTheDocument();
  });

  // Test 5: Check if form submission calls onSearch
  test("calls onSearch function when form is submitted", () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);

    const locationInput = screen.getByPlaceholderText("Enter a location");
    fireEvent.change(locationInput, { target: { value: "Manchester" } });

    const searchButton = screen.getByRole("button", { name: /search/i });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith(
      expect.objectContaining({
        location: "Manchester",
      })
    );
  });

  // Test 6: Check if advanced filters toggle works
  test("shows advanced filters when toggle button is clicked", () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);

    // Find and click the toggle button
    const toggleButton = screen.getByText(/Show Advanced Filters/i);
    fireEvent.click(toggleButton);

    // Check if advanced filters section appears
    const advancedTitle = screen.getByText("Advanced Filters");
    expect(advancedTitle).toBeInTheDocument();

    // Check if button text changes
    const hideButton = screen.getByText(/Hide Advanced Filters/i);
    expect(hideButton).toBeInTheDocument();
  });

  // Test 7: Check if keywords input works in advanced filters
  test("allows user to enter keywords in advanced filters", () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);

    // Open advanced filters
    const toggleButton = screen.getByText(/Show Advanced Filters/i);
    fireEvent.click(toggleButton);

    // Find and use keywords input
    const keywordsInput = screen.getByPlaceholderText(/balcony, fireplace/i);
    fireEvent.change(keywordsInput, { target: { value: "balcony" } });

    expect(keywordsInput.value).toBe("balcony");
  });

  // Test 8: Check if minimum square feet input works
  test("allows user to enter minimum square feet", () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);

    // Open advanced filters
    const toggleButton = screen.getByText(/Show Advanced Filters/i);
    fireEvent.click(toggleButton);

    // Find and use square feet input
    const sqFtInput = screen.getByPlaceholderText(/e.g., 1000/i);
    fireEvent.change(sqFtInput, { target: { value: "1500" } });

    expect(sqFtInput.value).toBe("1500");
  });
});
