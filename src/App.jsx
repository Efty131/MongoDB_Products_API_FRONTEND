import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/productList';
import UploadProduct from './components/UploadProducts';
import IndianProductList from './components/IndianProductList';
import SearchProducts from './components/searchProduct';
import Header from './components/Header';
import UpdateProduct from './components/updateProduct';
import Category from './components/Category';
import Post from './components/post';
import SignInAndPost from './components/signInAndPost';

function App() {
  const [userUid, setUserUid] = useState(null);

  const handleSignIn = (objectId) => {
    setUserUid(objectId); // Set the MongoDB ObjectId
    console.log('Received MongoDB ObjectId:', objectId); // Print the ObjectId
  };

  return (
    <Router>
      <Header />
      <div className="p-4 container mx-auto dark-mode-transition">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/indian" element={<IndianProductList />} />
          <Route path="/upload" element={<UploadProduct />} />
          <Route path="/search-products" element={<SearchProducts />} />
          <Route path="/update-products" element={<UpdateProduct />} />
          <Route path="/category" element={<Category />} /> 
          <Route path="/post" element={<Post />} /> 
          <Route
            path="/sign-in-and-post"
            element={<SignInAndPost onSignIn={handleSignIn} uid={userUid} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;