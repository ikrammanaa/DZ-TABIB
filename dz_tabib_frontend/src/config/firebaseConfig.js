// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import firebase from 'firebase/app';
// import 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your Firebase config object
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnuSgXmmCBDqdEc3XECNoA-44zRisL_0w",
  authDomain: "login-dbfc4.firebaseapp.com",
  projectId: "login-dbfc4",
  storageBucket: "login-dbfc4.firebasestorage.app",
  messagingSenderId: "346017081358",
  appId: "1:346017081358:web:c83a1d9940e8130a61345f",
  measurementId: "G-515HFDNPN4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider,signInWithPopup };
