import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0bOm-f5vFBVHwUOjiV9j7bwsOZOezijA",
  authDomain: "studiyo-2.firebaseapp.com",
  projectId: "studiyo-2",
  storageBucket: "studiyo-2.firebasestorage.app",
  messagingSenderId: "312586992290",
  appId: "1:312586992290:web:dd7ad5474a58bc1d0b75fb"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };
