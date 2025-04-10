import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css"; // Import external CSS

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🔹 Sign Up with Email & Password
  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration Successful! ✅");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  // 🔹 Sign In with Email & Password
  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful! ✅");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  // 🔹 Sign In with Google
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google Sign-In Successful! ✅");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">{isRegistering ? "Sign Up" : "Sign In"}</h2>

        {error && <p className="auth-error">{error}</p>}

        <input
          type="email"
          placeholder="Enter your email"
          className="auth-input"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="auth-input"
          onChange={(e) => setPassword(e.target.value)}
        />

        {isRegistering ? (
          <button className="auth-btn auth-btn-signup" onClick={handleRegister}>
            Sign Up
          </button>
        ) : (
          <button className="auth-btn auth-btn-signin" onClick={handleSignIn}>
            Sign In
          </button>
        )}

        <button className="auth-btn auth-btn-google" onClick={handleGoogleSignIn}>
          Sign In with Google
        </button>

        <p className="auth-toggle">
          {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
          <span onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
