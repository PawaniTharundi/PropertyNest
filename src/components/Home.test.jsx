import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./Home";

describe("Home Component", () => {
  // Test 1: Check if the main heading renders
  test("renders the welcome heading", () => {
    render(<Home />);

    const heading = screen.getByText("Welcome to PropertyNest");
    expect(heading).toBeInTheDocument();
  });

  // Test 2: Check if the first paragraph renders
  test("renders the introductory paragraph", () => {
    render(<Home />);

    const paragraph = screen.getByText(
      /PropertyNest helps you discover beautiful homes/i
    );
    expect(paragraph).toBeInTheDocument();
  });

  // Test 3: Check if the image renders with correct attributes
  test("renders the home image with correct alt text", () => {
    render(<Home />);

    const image = screen.getByAltText("Home");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994"
    );
    expect(image).toHaveClass("home-image");
  });

  // Test 4: Check if the second paragraph renders
  test("renders the call-to-action paragraph", () => {
    render(<Home />);

    const ctaParagraph = screen.getByText(
      /Whether you are looking to buy or rent/i
    );
    expect(ctaParagraph).toBeInTheDocument();
  });

  // Test 5: Check if the component has the correct CSS class
  test("renders with the correct home class wrapper", () => {
    const { container } = render(<Home />);

    const homeDiv = container.querySelector(".home");
    expect(homeDiv).toBeInTheDocument();
  });
});
