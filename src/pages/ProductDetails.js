import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import productsData from "../data/products.json";

const ProductDetails = () => {
  const { id } = useParams();
  const product = productsData.find((item) => item.id === parseInt(id));
  const [cart, setCart] = useState([]);

  // Load cart from localStorage when page loads
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Function to add product to cart
  const addToCart = () => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${product.name} added to cart! ✅`);
  };

  if (!product) {
    return <h2 className="text-center mt-4">Product not found!</h2>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">{product.name}</h2>

      <div className="row justify-content-center">
        {/* Image Section */}
        <div className="col-md-6 text-center">
          <img 
            src={process.env.PUBLIC_URL + product.image} 
            alt={product.name} 
            className="img-fluid w-75 rounded shadow-lg"
          />
        </div>

        {/* Product Info */}
        <div className="col-md-6">
          <h4 className="text-success">₹{product.price}</h4>
          <p className="text-muted">{product.category}</p>
          <p className="mt-3">
          Our products are crafted with premium quality materials and designed to meet modern-day needs. 
Each item is thoroughly tested to ensure durability, functionality, and style. 
we provide detailed specifications, user reviews, and clear pricing to help you make informed decisions.

          </p>
          {/* Add to Cart Button */}
          <button className="btn btn-primary btn-lg" onClick={addToCart}>
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
