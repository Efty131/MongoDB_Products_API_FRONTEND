import React from 'react';

const CategoryList = ({ categories, onSelectCategory }) => {
    return (
        <div className="flex flex-wrap gap-4 mb-8">
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => onSelectCategory(category)}
                    className="px-4 py-2 border border-gray-300 rounded bg-gray-100 hover:bg-gray-200 focus:outline-none text-green-600 hover:text-blue-600 font-semibold"
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryList;