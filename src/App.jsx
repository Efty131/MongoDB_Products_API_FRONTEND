import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/productList';
import UploadProduct from './components/UploadProducts';
import IndianProductList from './components/IndianProductList';
import SearchProducts from './components/searchProduct';
import Header from './components/Header';
import UpdateProduct from './components/updateProduct';
import Category from './components/Category';
import Post from './components/post';

function App() {
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
          <Route path="/posts" element={<Post />} /> {/* Add this route for Post component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;