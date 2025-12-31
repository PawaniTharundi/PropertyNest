import React from "react";
import { Link } from "react-router-dom"; // Use Link for navigation with React Router
import './Header.css'; // Import CSS for styling

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <div className="logo-icon">🏠</div>
        <h1 className="logo-text">PropertyNest</h1>
      </div>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/search">Discover Homes</Link>
          </li>
          <li>
            <Link to="/property-list">View All</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
