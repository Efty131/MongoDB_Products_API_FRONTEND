import React, { useState, useEffect } from 'react';

const UploadProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [productType, setProductType] = useState('');
    const [message, setMessage] = useState('');
    const [uri, setUri] = useState(null);

    useEffect(() => {
        if (productType === 'indian') {
            setUri('https://mongodb-products-api.onrender.com/api/routes/upload/indianProduct');
        } else if (productType === 'upload') {
            setUri('https://mongodb-products-api.onrender.com/upload');
        } else {
            setUri(null);
        }

        // Log the current state
        console.log('Product Type:', productType);
        console.log('URI:', uri);
    }, [productType, uri]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !description || !image) {
            setMessage('Please fill in all required fields');
            return;
        }

        if (uri === null) {
            setMessage('Please select a product type');
            return;
        }

        try {
            const response = await fetch(uri, {
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
                setProductType('');
                setUri(null);
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
                        className="w-full p-2 border border-gray-300 rounded focus:text-blue-600 text-green-600"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded text-green-600 focus:text-blue-600"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Image URL</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded text-green-600 focus:text-blue-600"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Product Type</label>
                    <div>
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                className="form-radio"
                                value="indian"
                                checked={productType === 'indian'}
                                onChange={() => setProductType('indian')}
                            />
                            <span className="ml-2">Indian Product</span>
                        </label>
                        <label className="inline-flex items-center ml-4">
                            <input
                                type="checkbox"
                                className="form-radio"
                                value="upload"
                                checked={productType === 'upload'}
                                onChange={() => setProductType('upload')}
                            />
                            <span className="ml-2">Bangladeshi Product</span>
                        </label>
                    </div>
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
