// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from "firebase/auth";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD90pizo2eY1ygQXU9sidcSUwMWX2QBqM8",
  authDomain: "lista-de-mercado-89fe4.firebaseapp.com",
  projectId: "lista-de-mercado-89fe4",
  storageBucket: "lista-de-mercado-89fe4.firebasestorage.app",
  messagingSenderId: "138200954745",
  appId: "1:138200954745:web:db2cd8e3bb5f73a09e21a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Proveedores de autenticación
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, githubProvider, facebookProvider };
