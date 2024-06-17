import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/productList';
import UploadProduct from './components/UploadProducts';
import IndianProductList from './components/IndianProductList';

function App() {
    return (
        <Router>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white text-lg font-semibold">
                        <Link to="/" className="hover:underline">Store</Link>
                    </div>
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/" className="text-white hover:underline">Home</Link>
                        </li>
                        <li>
                            <Link to="/upload" className="text-white hover:underline">Upload Product</Link>
                        </li>
                        <li>
                            <Link to="/indian" className="text-white hover:underline">Indian Products</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="p-4 container mx-auto">
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/indian" element={<IndianProductList />} />
                    <Route path="/upload" element={<UploadProduct />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
