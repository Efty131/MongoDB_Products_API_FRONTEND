// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

console.log('Firebase API Key:', process.env.REACT_APP_FIREBASE_API_KEY);
console.log('Firebase Auth Domain:', process.env.REACT_APP_FIREBASE_AUTH_DOMAIN);

const firebaseConfig = {
  apiKey: "AIzaSyA9WSQ1StcQg_67Vs1wWzuNlCy6cIaEK4E",
  authDomain: "store-mern.firebaseapp.com",
  projectId: "store-mern",
  storageBucket: "store-mern.appspot.com", 
  messagingSenderId: "63247474483",  
  appId: "1:63247474483:web:dfd25507b77d4692d62846"  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const { uid, email, displayName, photoURL } = user;

    // Send user data to your server
    const response = await fetch('https://mongodb-products-api.onrender.com/api/routes/saveUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ uid, email, displayName, photoURL })
    });

    const userData = await response.json();

    // Log the MongoDB ObjectId and return it
    console.log('MongoDB ObjectId:', userData.objectId);

    // Return the MongoDB ObjectId and user information
    return { objectId: userData.objectId, email, displayName, photoURL, uid };
  } catch (error) {
    console.error("Error during sign-in with Google", error);
    throw error;
  }
};

export { auth, signInWithGoogle };