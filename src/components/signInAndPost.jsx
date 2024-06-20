import React, { useState } from 'react';
import { signInWithGoogle } from '../firebase';

const SignInAndPost = ({ onSignIn }) => {
  const [postContent, setPostContent] = useState('');
  const [alert, setAlert] = useState('');
  const [signedIn, setSignedIn] = useState(false);
  const [userData, setUserData] = useState(null); // State to store user data

  const handleSignIn = async () => {
    try {
      const userData = await signInWithGoogle();
      setUserData(userData); // Save user data
      setSignedIn(true); // Update state to indicate signed in
      onSignIn(userData.objectId); // Pass the ObjectId to parent component
      console.log('Signed-in user data:', userData); // Print the user data
    } catch (error) {
      setAlert('Error during sign-in');
      console.error('Error during sign-in', error);
    }
  };

  const handlePost = async () => {
    if (!postContent || !userData) return;

    try {
      const requestBody = {
        uid: userData.objectId, // Use the MongoDB ObjectId
        content: postContent,
      };

      const response = await fetch('https://mongodb-products-api.onrender.com/api/routes/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      setPostContent('');
      setAlert('Post created successfully!');
    } catch (error) {
      console.error('Error creating post', error);
      setAlert('Error creating post');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {alert && <div className="mb-4 p-2 bg-green-200 text-green-800 rounded">{alert}</div>}
      {!signedIn ? (
        <button
          onClick={handleSignIn}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700 focus:outline-none"
        >
          Sign in with Google
        </button>
      ) : (
        <div className="w-full max-w-md bg-white rounded shadow-md p-4 mb-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Write your post here..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          ></textarea>
          <button
            onClick={handlePost}
            className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-700 focus:outline-none"
          >
            Post
          </button>
        </div>
      )}
    </div>
  );
};

export default SignInAndPost;