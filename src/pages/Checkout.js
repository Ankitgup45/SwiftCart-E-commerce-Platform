import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const Checkout = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({ fullName: "", address: "", paymentMethod: "Credit Card" });
  const [showModal, setShowModal] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  // ✅ Authenticate user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        alert("You must be logged in to checkout!");
        navigate("/auth");
      } else {
        setUserEmail(currentUser.email);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // ✅ Load Cart
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
  const productList = cart.map((item) => `${item.name} - ₹${item.price}`).join(", ");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (totalPrice < 50) {
      alert("⚠ Order must be more than ₹50 to proceed!");
      return;
    }

    if (!formData.fullName || !formData.address) {
      setEmailError("Please fill in all required fields.");
      return;
    }

    if (!userEmail) {
      setEmailError("Error fetching user email. Try signing in again.");
      return;
    }

    setEmailError("");

    const emailParams = {
      user_name: formData.fullName,
      user_email: userEmail,
      user_address: formData.address,
      total_price: totalPrice.toFixed(2),
      product_list: productList,
      store_name: "SwiftCart Shopping Center"
    };

    try {
      // 🔹 Store in Firestore
      await addDoc(collection(db, "orders"), {
        fullName: formData.fullName,
        email: userEmail,
        address: formData.address,
        paymentMethod: formData.paymentMethod,
        total: totalPrice,
        items: cart,
        createdAt: Timestamp.now()
      });

      // 🔹 Send Email
      await emailjs.send("service_z8l80ji", "template_akojuh3", emailParams, "dPb252IfwJiIk9Nb5");

      setOrderPlaced(true);
      setShowModal(true);
      localStorage.removeItem("cart");
    } catch (error) {
      console.error("Order submission failed:", error);
      setEmailError("Error submitting order. Please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/checkout_bg.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          width: "400px",
          textAlign: "center"
        }}
      >
        <h2>Checkout</h2>
        <h4>Total Price: ₹{totalPrice.toFixed(2)}</h4>
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}

        <form onSubmit={handleSubmit}>
          <input type="text" name="fullName" placeholder="Full Name" className="form-control mb-3" required onChange={handleChange} />
          <input type="text" name="address" placeholder="Shipping Address" className="form-control mb-3" required onChange={handleChange} />
          <select name="paymentMethod" className="form-control mb-3" onChange={handleChange}>
            <option>Credit Card</option>
            <option>PayPal</option>
            <option>Cash on Delivery</option>
          </select>
          <button type="submit" className="btn btn-primary w-100" disabled={orderPlaced}>
            {orderPlaced ? "Order Placed" : "Place Order"}
          </button>
        </form>
      </div>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "10px",
              textAlign: "center",
              width: "350px"
            }}
          >
            <h4>🎉 Order Confirmed!</h4>
            <p>Thank you, <strong>{formData.fullName}</strong>!</p>
            <p>Your order has been placed successfully at <strong>SwiftCart Shopping Center</strong>.</p>
            <h4>Total: ₹{totalPrice.toFixed(2)}</h4>
            <p>Confirmation email sent to <strong>{userEmail}</strong>.</p>
            <button className="btn btn-success w-100 mt-3" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
