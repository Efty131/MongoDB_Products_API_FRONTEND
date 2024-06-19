import React, { useState } from 'react';

const UpdateProduct = () => {
  const [productName, setProductName] = useState('');
  const [productDetails, setProductDetails] = useState(null);
  const [updatedData, setUpdatedData] = useState({ name: '', description: '', image: '' });

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://mongodb-products-api.onrender.com/api/routes/search?q=${productName}`);
      const data = await response.json();
      if (data.length > 0) {
        const product = data[0];
        setProductDetails(product);
        setUpdatedData({
          name: product.name,
          description: product.description,
          image: product.image,
        });
      } else {
        alert('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      alert('Error fetching product details');
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://mongodb-products-api.onrender.com/api/routes/update/${productName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });
      const data = await response.json();
      if (response.ok) {
        alert('Product updated successfully');
        setProductDetails(data);
      } else {
        alert(`Error updating product: ${data.message}`);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product');
    }
  };

  return (
    <div>
      <h2>Update Product</h2>
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder="Enter product name"
        className="border p-2 mb-4 w-full"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2 mb-4">Search</button>

      {productDetails && (
        <div>
          <h3>Product Details</h3>
          <p>ID: {productDetails._id}</p>
          <p>Current Name: {productDetails.name}</p>
          <p>Current Description: {productDetails.description}</p>
          <p>Current Image: <img src={productDetails.image} alt={productDetails.name} className="w-20 h-20"/></p>

          <h3>Update Details</h3>
          <input
            type="text"
            value={updatedData.name}
            onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
            placeholder="New name"
            className="border p-2 mb-4 w-full expand-cursor"
          />
          <input
            type="text"
            value={updatedData.description}
            onChange={(e) => setUpdatedData({ ...updatedData, description: e.target.value })}
            placeholder="New description"
            className="border p-2 mb-4 w-full"
          />
          <input
            type="text"
            value={updatedData.image}
            onChange={(e) => setUpdatedData({ ...updatedData, image: e.target.value })}
            placeholder="New image URL"
            className="border p-2 mb-4 w-full"
          />
          <button onClick={handleUpdate} className="bg-green-500 text-white p-2">Update</button>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;