import React from "react";
import "./Home.css"; // we will create this next

const Home = () => {
  return (
    <div className="home">

        <h1>Welcome to PropertyNest</h1><br/>
      <img
        src="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
        alt="Home"
        className="home-image"
      />

      <p>
        PropertyNest helps you discover beautiful homes easily and quickly.
        We provide a simple and user-friendly way to explore properties.
      </p>

      <p>
        Whether you are looking to buy or rent, PropertyNest is your trusted
        place to begin your journey.
      </p>
    </div>
  );
};

export default Home;
