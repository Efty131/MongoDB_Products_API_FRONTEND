// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, addDoc, updateDoc, doc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9WSQ1StcQg_67Vs1wWzuNlCy6cIaEK4E",
  authDomain: "store-mern.firebaseapp.com",
  projectId: "store-mern",
  storageBucket: "store-mern.appspot.com", 
  messagingSenderId: "63247474483",  
  appId: "1:63247474483:web:dfd25507b77d4692d62846"  
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firestore = getFirestore(app);

export { auth, provider, firestore, signInWithPopup, collection, addDoc, updateDoc, doc, getDocs };