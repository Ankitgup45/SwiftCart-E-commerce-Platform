import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import productsData from "../data/products.json";

// 🔹 Image list from public folder
const bannerImages = [
  `${process.env.PUBLIC_URL}/bg7.jpg`,
  `${process.env.PUBLIC_URL}/bg2.jpg`,
  `${process.env.PUBLIC_URL}/bg.jpg`,
  `${process.env.PUBLIC_URL}/bg4.jpg`,
  `${process.env.PUBLIC_URL}/bg5.jpg`,
  `${process.env.PUBLIC_URL}/bg6.jpg`,
  `${process.env.PUBLIC_URL}/bg8.jpg`
];

const Home = () => {
  const [cart, setCart] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // 🔹 Image Slider - Auto change every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // 🔹 Function to update search results
  const updateSearchResults = () => {
    if (searchTerm === "") {
      setFilteredProducts(productsData);
    } else {
      const results = productsData.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(results);
    }
  };

  useEffect(() => {
    updateSearchResults();
  }, [searchTerm]);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setToastMessage(`${product.name} added to cart!`);
    setTimeout(() => setToastMessage(""), 2000);
  };

  const handleClear = () => {
    setSearchTerm(""); 
    setFilteredProducts(productsData);
  };

  return (
    <div>
      {/* 🔹 Full-Screen Banner for Laptop & Mobile */}
      <div
        className="banner d-flex justify-content-center align-items-center text-white text-center"
        style={{
          backgroundImage: `url(${bannerImages[currentImage]})`,
          backgroundSize: "cover", // ✅ Cover full screen
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "100vh", // ✅ Full height on all screens
          width: "100vw", // ✅ Full width on all screens
          transition: "background-image 0.5s ease-in-out",
        }}
      >
        <h1 className="fw-bold bg-dark p-3 rounded opacity-75">Welcome to Our Shopping Center</h1>
      </div>

      {/* 🔹 Search Bar */}
      <div className="container mt-4">
        <div className="d-flex justify-content-center mb-4">
          <input
            type="text"
            placeholder="Search products..."
            className="form-control w-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary ms-2" onClick={updateSearchResults}>
            Search 🔍
          </button>
          <button className="btn btn-danger ms-2" onClick={handleClear}>
            Clear ❌
          </button>
        </div>

        {filteredProducts.length === 0 ? (
          <h4 className="text-center text-muted">No products found.</h4>
        ) : (
          <div className="row">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card text-center">
                  <img
                    src={process.env.PUBLIC_URL + product.image}
                    alt={product.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">₹{product.price}</p>
                    <Link to={`/products/${product.id}`} className="btn btn-primary me-2">
                      View Details
                    </Link>
                    <button onClick={() => addToCart(product)} className="btn btn-success">
                      Add to Cart 🛒
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-4">
          <Link to="/products" className="btn btn-success">View All Products</Link>
        </div>
      </div>

      {/* 🔹 Toast Notification */}
      {toastMessage && (
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 5 }}>
          <div className="toast show bg-success text-white">
            <div className="toast-body">{toastMessage}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
