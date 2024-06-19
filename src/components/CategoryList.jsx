import React from 'react';

const CategoryList = ({ categories, onSelectCategory }) => {
    return (
        <div className="category-list">
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <ul>
                {categories.map((category) => (
                    <li
                        key={category}
                        className="cursor-pointer text-blue-600 hover:text-blue-800 mb-2"
                        onClick={() => onSelectCategory(category)}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;