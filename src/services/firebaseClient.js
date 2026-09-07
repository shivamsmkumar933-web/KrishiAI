import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCsyDos6m1GOubU7d86cK4Xt8GNr4Vaq5c",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "krishiai-ec763.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "krishiai-ec763",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "krishiai-ec763.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "917756014776",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:917756014776:web:d360a1e0a79ec533de444d",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-PCC0JRZJP1"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
