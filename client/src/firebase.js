// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-noticias.firebaseapp.com",
  projectId: "mern-noticias",
  storageBucket: "mern-noticias.appspot.com",
  messagingSenderId: "405082877464",
  appId: "1:405082877464:web:01359ed32a362003ffdd6d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);