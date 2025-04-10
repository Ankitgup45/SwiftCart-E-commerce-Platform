import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-4 pb-2 mt-5">
      <div className="container text-center">
        <div className="row">
          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white text-decoration-none">Home</a></li>
              <li><a href="/products" className="text-white text-decoration-none">Products</a></li>
              <li><a href="/cart" className="text-white text-decoration-none">Cart</a></li>
              <li><a href="/checkout" className="text-white text-decoration-none">Checkout</a></li>
              <li><a href="/about" className="text-white text-decoration-none">About Us</a></li>  {/* ✅ Added About Us */}
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="col-md-4 mb-3">
            <h5>Follow Us</h5>
            <div>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                <FaInstagram size={24} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                <FaFacebook size={24} />
              </a>
              <a href="mailto:info@example.com" className="text-white mx-2">
                <FaEnvelope size={24} />
              </a>
            </div>
          </div>

          {/* Subscribe Section */}
          <div className="col-md-4">
            <h5>Subscribe to Our Newsletter</h5>
            <form className="d-flex">
              <input type="email" className="form-control me-2" placeholder="Enter your email" />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4">
          <p className="mb-0">&copy; 2025 SwiftCart Shopping Center. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
