import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import ProductList from './components/productList';
import UploadProduct from './components/UploadProducts';
import IndianProductList from './components/IndianProductList';
import SearchProducts from './components/searchProduct';
import Nav from './components/nav';

function App() {
  const [isOpen, setIsOpen] = useState(false); // Track menu state

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
     
      <Nav />
      <div className="p-4 container mx-auto">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/indian" element={<IndianProductList />} />
          <Route path="/upload" element={<UploadProduct />} />
          <Route path="/search-products" element={<SearchProducts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
