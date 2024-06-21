import React, { useState, useEffect } from 'react';
import { auth, provider, firestore, signInWithPopup, collection, addDoc, updateDoc, doc, getDocs } from '../firebase'; // Ensure you import necessary Firebase functions

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [commentText, setCommentText] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    fetchPosts(); // Load posts initially when component mounts
    return () => unsubscribe();
  }, []);

  const fetchPosts = async () => {
    try {
      const postsCollection = collection(firestore, 'posts');
      const snapshot = await getDocs(postsCollection);
      const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  const handlePost = async (postContent) => {
    try {
      const postRef = await addDoc(collection(firestore, 'posts'), {
        content: postContent,
        likes: 0,
        comments: [],
        createdAt: new Date(),
        user: {
          displayName: user.displayName,
          photoURL: user.photoURL
        }
      });
      fetchPosts(); // Refresh posts to show new post
    } catch (error) {
      console.error('Error adding post', error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const postRef = doc(firestore, 'posts', postId);
      await updateDoc(postRef, {
        likes: posts.find(post => post.id === postId).likes + 1
      });
      fetchPosts(); // Refresh posts to reflect updated likes
    } catch (error) {
      console.error('Error liking post', error);
    }
  };

  const handleComment = async (postId) => {
    try {
      const postRef = doc(firestore, 'posts', postId);
      await updateDoc(postRef, {
        comments: [
          ...posts.find(post => post.id === postId).comments,
          { text: commentText, user: user.displayName } // Adjust structure as per your schema
        ]
      });
      setCommentText('');
      fetchPosts(); // Refresh posts to show new comments
    } catch (error) {
      console.error('Error commenting on post', error);
    }
  };

  const handleCommentInputChange = (e) => {
    setCommentText(e.target.value);
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      {user ? (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center mb-4">
            {user.photoURL && ( // Render profile picture if photoURL exists
              <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full mr-2" />
            )}
            <div>
              <div className="font-bold">{user.displayName}</div>
              <div className="text-gray-500 text-sm">Just now</div>
            </div>
          </div>
          <textarea
            className="w-full p-2 border border-gray-200 rounded-md resize-none focus:outline-none"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Write something..."
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={() => handlePost(postContent)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Post
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <button
            onClick={handleSignIn}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Sign In with Google
          </button>
        </div>
      )}

      {posts.map(post => (
        <div key={post.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center mb-4">
            {post.user && post.user.photoURL && ( // Render profile picture if post.user and photoURL exist
              <img src={post.user.photoURL} alt={post.user.displayName} className="w-10 h-10 rounded-full mr-2" />
            )}
            <div>
              {post.user && ( // Render user details if post.user exists
                <div>
                  <div className="font-bold">{post.user.displayName}</div>
                  <div className="text-gray-500 text-sm">2 hours ago</div>
                </div>
              )}
            </div>
          </div>
          <p className="mb-4">{post.content}</p>
          <div className="flex items-center">
            <button
              onClick={() => handleLike(post.id)}
              className="text-blue-500 hover:text-blue-600 focus:outline-none mr-4"
            >
              Like
            </button>
            <input
              type="text"
              value={commentText}
              onChange={handleCommentInputChange}
              className="flex-1 p-2 border border-gray-200 rounded-md resize-none focus:outline-none"
              placeholder="Write a comment..."
            />
            <button
              onClick={() => handleComment(post.id)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none ml-4"
            >
              Comment
            </button>
          </div>
          {post.comments && post.comments.map((comment, index) => (
            <div key={index} className="mt-2">
              <div className="font-medium">{comment.user}</div>
              <div>{comment.text}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Post;