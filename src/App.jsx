import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/productList';
import UploadProduct from './components/UploadProducts';
import IndianProductList from './components/IndianProductList';
import SearchProducts from './components/searchProduct';
import Header from './components/Header';
import UpdateProduct from './components/updateProduct';

function App() {

  return (
    <Router>
     
      <Header />
      <div className="p-4 container mx-auto">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/indian" element={<IndianProductList />} />
          <Route path="/upload" element={<UploadProduct />} />
          <Route path="/search-products" element={<SearchProducts />} />
          <Route path="/update-products" element={<UpdateProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
