import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCznfNITQJddRnD0dcqpnXlSqbFMoKTVy8",
  authDomain: "nextjsauth-e7d5b.firebaseapp.com",
  projectId: "nextjsauth-e7d5b",
  storageBucket: "nextjsauth-e7d5b.firebasestorage.app",
  messagingSenderId: "354082300685",
  appId: "1:354082300685:web:adb9b3c6ee6ce094518644",
  measurementId: "G-61HHWTPXFT"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
