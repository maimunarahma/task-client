// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCA-ABzVQNM9yf2O9e0ew4vbGp_XLH7G3U",
  authDomain: "scic-project-81170.firebaseapp.com",
  projectId: "scic-project-81170",
  storageBucket: "scic-project-81170.firebasestorage.app",
  messagingSenderId: "15724769965",
  appId: "1:15724769965:web:914e0d34ac5bd24f63cc24",
  measurementId: "G-HLL3B1BF9M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);