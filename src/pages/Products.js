import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import productsData from "../data/products.json";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // 🔹 Function to update product list based on search, category, and price range
  const applyFilters = () => {
    let results = productsData;

    // Filter by category
    if (selectedCategory !== "All") {
      results = results.filter((product) => product.category === selectedCategory);
    }

    // Filter by search term and price range
    results = results.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.price >= minPrice &&
        product.price <= maxPrice
    );

    setFilteredProducts(results);
  };

  // 🔹 Update products whenever a category or search term is selected
  useEffect(() => {
    applyFilters();
  }, [selectedCategory, searchTerm, minPrice, maxPrice]); // ✅ Automatically updates when any of these change

  // Function to add product to cart
  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Show toast notification
    setToastMessage(`${product.name} added to cart!`);
    setTimeout(() => setToastMessage(""), 2000);
  };

  // Function to reset all filters
  const handleClear = () => {
    setSearchTerm("");
    setMinPrice(0);
    setMaxPrice(1000);
    setSelectedCategory("All");
    setFilteredProducts(productsData);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Products</h2>

      {/* Search & Filter Section */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Search products..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Real-time search updates the searchTerm state
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={applyFilters}>
            Search 🔍
          </button>
        </div>
        <div className="col-md-2">
          <button className="btn btn-danger w-100" onClick={handleClear}>
            Clear ❌
          </button>
        </div>
      </div>

      {/* Price Range Inputs */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-200" onClick={applyFilters}>
            Apply Filter 🎯
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="text-center mb-3">
        {["All", "Men Wear", "Women Wear", "Electronics", "Household Items"].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`btn ${selectedCategory === category ? "btn-primary" : "btn-outline-primary"} mx-2`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
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
          ))
        ) : (
          <h4 className="text-center text-muted">No products found.</h4>
        )}
      </div>

      {/* Toast Notification */}
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

export default Products;
