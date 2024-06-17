import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 relative z-20">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-semibold">
          Store
        </Link>
        <div className="md:hidden"> 
          <button onClick={toggleMenu} aria-expanded={isOpen} className="text-white focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <ul className={`md:flex space-x-4 ${isOpen ? 'block' : 'hidden md:flex'}`}>
          <li>
            <Link to="/" className="text-white hover:underline block py-2 px-4">
              Home
            </Link>
          </li>
          <li>
            <Link to="/upload" className="text-white hover:underline block py-2 px-4">
              Upload Product
            </Link>
          </li>
          <li>
            <Link to="/indian" className="text-white hover:underline block py-2 px-4">
              Indian Products
            </Link>
          </li>
          <li>
            <Link to="/search-products" className="text-white hover:underline block py-2 px-4">
            <FaSearch className='inline' />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
