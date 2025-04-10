import React from "react";

const About = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/about1.jpg"})`, // ✅ Background Image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        padding: "40px",
      }}
    >
      {/* Dark Overlay for Readability */}
      <div
        style={{
          background: "rgba(0, 0, 0, 0.6)", // ✅ Dark overlay for better text visibility
          padding: "30px",
          borderRadius: "10px",
          width: "60%",
          color: "#fff",
        }}
      >
        <h2>About Us</h2>
        <p style={{ fontSize: "18px" }}>
          Welcome to <strong>SwiftCart Shopping Center</strong>! We are dedicated to providing the best online
          shopping experience, offering fashion, electronics, and household items.
        </p>

        {/* User Information Section */}
        <div style={{ marginTop: "20px" }}>
          <h3>About Me</h3>
          <img
            src={`${process.env.PUBLIC_URL}/Ankit.jpg`}
            alt="My Profile"
            style={{ width: "150px", height: "150px", borderRadius: "50%", marginBottom: "10px", border: "3px solid #fff" }}
          />
          <p><strong>Name:</strong> Ankit Vishwakarma  Gupta</p>
          
          <p><strong>Email:</strong> ankitgupta3227@gmail.com</p>
        </div>

        {/* Website Information Section */}
        <div style={{ marginTop: "20px" }}>
          <h3>About Our Website</h3>
          <p>
            <strong>SwiftCart Shopping Center</strong> is a user-friendly e-commerce platform where customers can browse, 
            filter, and purchase products with ease. Our secure checkout ensures smooth transactions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
