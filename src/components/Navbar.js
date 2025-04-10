import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import "../styles/Navbar.css"; // Import external CSS

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged Out Successfully!");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container">
        <Link className="navbar-brand logo-text" to="/">🛍️ SwiftCart Shopping Center</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link nav-hover" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link nav-hover" to="/products">Products</Link></li>
            <li className="nav-item"><Link className="nav-link nav-hover" to="/cart">🛒 Cart</Link></li>
            <li className="nav-item"><Link className="nav-link nav-hover" to="/checkout">💳 Checkout</Link></li>
            <li className="nav-item"><Link className="nav-link nav-hover" to="/about">ℹ️ About Us</Link></li> {/* ✅ Added About Us */}

            {user ? (
              <li className="nav-item">
                <button className="btn btn-outline-light logout-btn ms-2" onClick={handleLogout}>🚪 Logout</button>
              </li>
            ) : (
              <li className="nav-item"><Link className="nav-link nav-hover" to="/auth">🔑 Sign In</Link></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
