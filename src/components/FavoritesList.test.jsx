import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FavoritesList from "./FavouritesList";

// Mock react-dnd to avoid ES module issues
jest.mock("react-dnd", () => ({
  useDrop: () => [{ isOver: false }, jest.fn()],
}));

// Helper function to render component
const renderComponent = (component) => {
  return render(component);
};

// Sample test data
const mockFavorites = [
  {
    id: 1,
    location: "London",
    type: "Apartment",
    bedrooms: 2,
    price: 500000,
    picture: "https://example.com/image1.jpg",
  },
  {
    id: 2,
    location: "Manchester",
    type: "House",
    bedrooms: 3,
    price: 350000,
    picture: "https://example.com/image2.jpg",
  },
];

describe("FavoritesList Component", () => {
  // Test 1: Check if the component renders with the correct title
  test("renders the favorites list title", () => {
    const mockOnRemove = jest.fn();
    const mockOnClearFavorites = jest.fn();
    const mockOnAdd = jest.fn();

    renderComponent(
      <FavoritesList
        favorites={[]}
        onRemove={mockOnRemove}
        onClearFavorites={mockOnClearFavorites}
        onAdd={mockOnAdd}
      />
    );

    // Check if "Your Favorites" heading is displayed
    const heading = screen.getByText("Your Favorites");
    expect(heading).toBeInTheDocument();
  });

  // Test 2: Display message when no favorites exist
  test("displays placeholder message when favorites list is empty", () => {
    const mockOnRemove = jest.fn();
    const mockOnClearFavorites = jest.fn();
    const mockOnAdd = jest.fn();

    renderComponent(
      <FavoritesList
        favorites={[]}
        onRemove={mockOnRemove}
        onClearFavorites={mockOnClearFavorites}
        onAdd={mockOnAdd}
      />
    );

    // Check if the placeholder message is shown
    const message = screen.getByText(
      "Drag properties here to add them to favorites."
    );
    expect(message).toBeInTheDocument();
  });

  // Test 3: Display all favorite properties correctly
  test("displays all favorite properties when favorites exist", () => {
    const mockOnRemove = jest.fn();
    const mockOnClearFavorites = jest.fn();
    const mockOnAdd = jest.fn();

    renderComponent(
      <FavoritesList
        favorites={mockFavorites}
        onRemove={mockOnRemove}
        onClearFavorites={mockOnClearFavorites}
        onAdd={mockOnAdd}
      />
    );

    // Check if both properties are displayed
    expect(screen.getByText("London")).toBeInTheDocument();
    expect(screen.getByText("Manchester")).toBeInTheDocument();
    expect(screen.getByText("Type: Apartment")).toBeInTheDocument();
    expect(screen.getByText("Type: House")).toBeInTheDocument();
    expect(screen.getByText("Bedrooms: 2")).toBeInTheDocument();
    expect(screen.getByText("Bedrooms: 3")).toBeInTheDocument();
  });

  // Test 4: Remove button works correctly
  test("calls onRemove function when Remove button is clicked", () => {
    const mockOnRemove = jest.fn();
    const mockOnClearFavorites = jest.fn();
    const mockOnAdd = jest.fn();

    renderComponent(
      <FavoritesList
        favorites={mockFavorites}
        onRemove={mockOnRemove}
        onClearFavorites={mockOnClearFavorites}
        onAdd={mockOnAdd}
      />
    );

    // Find all Remove buttons
    const removeButtons = screen.getAllByText("Remove");

    // Click the first Remove button
    fireEvent.click(removeButtons[0]);

    // Check if onRemove was called with the correct property ID
    expect(mockOnRemove).toHaveBeenCalledTimes(1);
    expect(mockOnRemove).toHaveBeenCalledWith(1);
  });

  // Test 5: Clear All button works correctly
  test("calls onClearFavorites function when Clear All button is clicked", () => {
    const mockOnRemove = jest.fn();
    const mockOnClearFavorites = jest.fn();
    const mockOnAdd = jest.fn();

    renderComponent(
      <FavoritesList
        favorites={mockFavorites}
        onRemove={mockOnRemove}
        onClearFavorites={mockOnClearFavorites}
        onAdd={mockOnAdd}
      />
    );

    // Find the Clear All button
    const clearButton = screen.getByText("Clear All");

    // Click the Clear All button
    fireEvent.click(clearButton);

    // Check if onClearFavorites was called
    expect(mockOnClearFavorites).toHaveBeenCalledTimes(1);
  });

  // Test 6 (BONUS): Check if prices are formatted correctly
  test("displays property prices in correct format", () => {
    const mockOnRemove = jest.fn();
    const mockOnClearFavorites = jest.fn();
    const mockOnAdd = jest.fn();

    renderComponent(
      <FavoritesList
        favorites={mockFavorites}
        onRemove={mockOnRemove}
        onClearFavorites={mockOnClearFavorites}
        onAdd={mockOnAdd}
      />
    );

    // Check if prices are displayed with proper formatting
    expect(screen.getByText("Price: £500,000")).toBeInTheDocument();
    expect(screen.getByText("Price: £350,000")).toBeInTheDocument();
  });
});
