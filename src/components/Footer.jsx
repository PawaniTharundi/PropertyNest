import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-icon">🏠</span>
          <span className="footer-name">PropertyNest</span>
        </div>
        <p className="footer-text">
          © {new Date().getFullYear()} PropertyNest. Your trusted property
          partner.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
