// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 🔹 Firestore import

// 🔹 Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx0-GHf9bDRHnRvBgsFfgNk_DpZ85R3Uk",
  authDomain: "shopping-center-3c38c.firebaseapp.com",
  projectId: "shopping-center-3c38c",
  storageBucket: "shopping-center-3c38c.appspot.com",
  messagingSenderId: "596668192850",
  appId: "1:596668192850:web:5ffa24c97ab6ca5641678b",
  measurementId: "G-C3LVDNYKL4"
};

// 🔹 Initialize Firebase App
const app = initializeApp(firebaseConfig);

// 🔹 Firebase Auth & Google Provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// 🔹 Firestore DB
const db = getFirestore(app);

export { auth, googleProvider, db };
