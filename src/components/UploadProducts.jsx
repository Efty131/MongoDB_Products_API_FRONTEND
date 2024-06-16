import React, { useState } from 'react';

const UploadProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !description || !image) {
            setMessage('Please fill in all required fields');
            return;
        }

        try {
            const response = await fetch('https://mongodb-products-api.onrender.com/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, description, image }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                // Clear the form fields
                setName('');
                setDescription('');
                setImage('');
            } else {
                setMessage(data.message || 'Error uploading product');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error uploading product');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Upload Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Product Name</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Image URL</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white p-2 rounded"
                >
                    Upload Product
                </button>
            </form>
            {message && <p className="mt-4 text-center">{message}</p>}
        </div>
    );
};

export default UploadProduct;
