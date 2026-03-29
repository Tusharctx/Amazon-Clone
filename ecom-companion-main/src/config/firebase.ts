import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8DQEIz9AUVX951d4qQ3nFG_Kc2lGId7A",
  authDomain: "ecom-fbf5e.firebaseapp.com",
  projectId: "ecom-fbf5e",
  storageBucket: "ecom-fbf5e.firebasestorage.app",
  messagingSenderId: "729539706532",
  appId: "1:729539706532:web:6e4f9eacad05e61b79b031",
  measurementId: "G-GWH3N2ET9C"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
