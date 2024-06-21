import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

const Post = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts(); // Load posts initially when component mounts
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://mongodb-products-api.onrender.com/api/routes/posts');
      const data = await response.json();
      console.log(data);
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 transition-colors duration-500">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded shadow-md p-4 mb-4 transition-colors duration-500">
        <div className="w-full max-w-md">
          {posts.map((post) => (
            <div key={post._id} className="bg-white dark:bg-gray-800 rounded shadow-md p-4 mb-6 transition-colors duration-500"> {/* mb-6 for gap below each card */}
              <div className="flex items-center mb-2">
                {post.uid && (
                  <img src={post.uid.photoURL} alt={post.uid.displayName} className="w-10 h-10 rounded-full mr-2" />
                )}
                <div>
                  {post.uid ? (
                    <div>
                      <div className="font-bold text-black dark:text-white transition-colors duration-500">{post.uid.displayName}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-500">
                        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                      </div>
                    </div>
                  ) : (
                    <div className="font-bold text-black dark:text-white transition-colors duration-500">Anonymous</div>
                  )}
                </div>
              </div>
              <div className="text-black dark:text-white transition-colors duration-500">{post.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;