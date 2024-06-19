import React, { useState, useEffect } from 'react';

const ProductsList = ({ category }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(category 
                    ? `https://mongodb-products-api.onrender.com/api/routes/category/${encodeURIComponent(category)}`
                    : 'https://mongodb-products-api.onrender.com/api/routes'
                );
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data.products || data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, [category]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1 className="text-center text-5xl pb-8 pt-8">Products List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {products.map(product => (
                    <div key={product.id} className="border border-gray-300 rounded-lg p-5 text-center">
                        <h2 className="text-green-600 font-bold text-xl">{product.name}</h2>
                        <p className='text-xl'>{product.description}</p>
                        <img className="w-full max-w-xs mx-auto mt-2" src={product.image} alt={product.name} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsList;