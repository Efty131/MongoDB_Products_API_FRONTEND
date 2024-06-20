// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID, 
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