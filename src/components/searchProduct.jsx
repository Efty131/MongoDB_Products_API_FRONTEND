import React, { useState } from 'react';

const SearchProducts = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!query) {
            setMessage('Please enter a search term');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const response = await fetch(`https://mongodb-products-api.onrender.com/api/routes/search?q=${query}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (response.ok) {
                setResults(data);
                setMessage('');
            } else {
                setMessage(data.message || 'Error fetching search results');
                setResults([]);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error fetching search results');
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Search Products</h1>
            <form onSubmit={handleSearch}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Search</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded focus:text-green-600 text-blue-600" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded"
                >
                    Search
                </button>
            </form>
            {message && <p className="mt-4 text-center">{message}</p>}
            {loading && <p className="mt-4 text-center">Loading...</p>}
            <div className="mt-4">
                {results.length > 0 && (
                    <ul>
                        {results.map((product) => (
                            <li key={product._id} className="mb-4 p-4 border border-gray-300 rounded">
                                <h2 className="text-xl font-bold text-center text-green-600">{product.name}</h2>
                                <p className='text-center'>{product.description}</p>
                                {product.image && <img src={product.image} alt={product.name} className="mt-2" />}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SearchProducts;
