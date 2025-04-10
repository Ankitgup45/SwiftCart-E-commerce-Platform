import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Load cart only once to prevent unnecessary re-renders
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  // Function to remove item from cart
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ✅ Use `useMemo` to optimize total price calculation
  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price, 0);
  }, [cart]);

  return (
    <div
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/cart2.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "40px 0",
      }}
    >
      <div className="container mt-4">
        <h2 className="text-center mb-4 text-white">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-center text-white">Your cart is empty.</p>
        ) : (
          <div>
            <div className="row">
              {cart.map((item) => (
                <div key={item.id} className="col-md-4 mb-4">
                  <div className="card text-center">
                    <img
                      src={`${process.env.PUBLIC_URL}${item.image}`}
                      alt={item.name}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">₹{item.price}</p>
                      <button onClick={() => removeFromCart(item.id)} className="btn btn-danger">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Price Section */}
            <h3 className="text-center text-white mt-4">Total: ₹{totalPrice.toFixed(2)}</h3>

            {/* Proceed to Checkout Button */}
            <div className="text-center mt-4">
              <Link to="/checkout" className="btn btn-success">Proceed to Checkout</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
