import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDj2nYPO1tDwgOghQGMqalLa8UhPTNbsUk",
  authDomain: "coolproject-9a3e2.firebaseapp.com",
  projectId: "coolproject-9a3e2",
  storageBucket: "coolproject-9a3e2.firebasestorage.app",
  messagingSenderId: "1081555847823",
  appId: "1:1081555847823:web:f51e001ab0100609393efa"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);