import React, { useState, useEffect } from 'react';
import { auth, provider, firestore, signInWithPopup, collection, addDoc, updateDoc, doc, getDocs } from '../firebase';
import { Timestamp } from 'firebase/firestore';

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [commentText, setCommentText] = useState('');
  const [user, setUser] = useState(null);
  const [visibleComments, setVisibleComments] = useState({});

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
      const postsData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          comments: data.comments.map(comment => ({ ...comment }))
        };
      });
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
    if (!postContent.trim()) return;

    try {
      const postRef = await addDoc(collection(firestore, 'posts'), {
        content: postContent,
        likes: 0,
        comments: [],
        createdAt: Timestamp.now(), // Use Firestore Timestamp
        user: {
          displayName: user.displayName,
          photoURL: user.photoURL
        }
      });
      fetchPosts(); // Refresh posts to show new post
      setPostContent('');
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
    if (!commentText.trim()) return;

    try {
      const postRef = doc(firestore, 'posts', postId);
      const newComment = {
        text: commentText,
        user: {
          displayName: user.displayName,
          photoURL: user.photoURL
        },
        createdAt: Timestamp.now() // Use Firestore Timestamp
      };
      await updateDoc(postRef, {
        comments: [
          ...posts.find(post => post.id === postId).comments,
          newComment
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

  const toggleComments = (postId) => {
    setVisibleComments(prevState => ({
      ...prevState,
      [postId]: !prevState[postId]
    }));
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      {user ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center mb-4">
            {user.photoURL && (
              <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full mr-2" />
            )}
            <div>
              <div className="font-bold">{user.displayName}</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">Just now</div>
            </div>
          </div>
          <textarea
            className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-md resize-none focus:outline-none"
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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
          <button
            onClick={handleSignIn}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Sign In with Google
          </button>
        </div>
      )}

      {posts.map(post => (
        <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center mb-4">
            {post.user && post.user.photoURL && (
              <img src={post.user.photoURL} alt={post.user.displayName} className="w-10 h-10 rounded-full mr-2" />
            )}
            <div>
              {post.user && (
                <div>
                  <div className="font-bold">{post.user.displayName}</div>
                 
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
            <button
              onClick={() => toggleComments(post.id)}
              className="text-blue-500 hover:text-blue-600 focus:outline-none"
            >
              Comments
            </button>
          </div>

          {visibleComments[post.id] && (
            <>
              <div className="mt-4">
                {post.comments && post.comments.map((comment, index) => (
                  <div key={index} className="mt-2 flex items-start">
                    {comment.user.photoURL && (
                      <img src={comment.user.photoURL} alt={comment.user.displayName} className="w-8 h-8 rounded-full mr-2" />
                    )}
                    <div>
                      <div className="font-medium">{comment.user.displayName}</div>
                      
                      <div>{comment.text}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex">
                <input
                  type="text"
                  value={commentText}
                  onChange={handleCommentInputChange}
                  className="flex-1 p-2 border border-gray-200 dark:border-gray-700 rounded-md resize-none focus:outline-none"
                  placeholder="Write a comment..."
                />
                <button
                  onClick={() => handleComment(post.id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none ml-4"
                >
                  Comment
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Post;