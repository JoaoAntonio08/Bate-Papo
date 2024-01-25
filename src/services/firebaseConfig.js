import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import{ getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDW2aYxd1YX_Xy2vEYnJsr6DrISTXsWxuA",
  authDomain: "chat-6ab4d.firebaseapp.com",
  projectId: "chat-6ab4d",
  storageBucket: "chat-6ab4d.appspot.com",
  messagingSenderId: "1002933953298",
  appId: "1:1002933953298:web:ab7617f5eb803bb71449cb",
  measurementId: "G-22BLMSZ8VV"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const databaseApp = getFirestore(app);
