import React, { useState } from 'react';
import CategoryList from './CategoryList';
import ProductsList from './productList';

const Category = () => {
    const categories = ['Soft Drinks', 'Tea', 'Water', 'Juice', 'Powdered Drink Mixes', 'Soap', 'Handwash'];
    const [selectedCategory, setSelectedCategory] = useState('');

    return (
        <div className="max-w-4xl mx-auto p-4">
            <CategoryList categories={categories} onSelectCategory={setSelectedCategory} />
            <ProductsList category={selectedCategory} />
        </div>
    );
};

export default Category;