// Nav.jsx

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import NightMode from './nightMode';

const NavLinks = () => {
  return (
    <>
      <NavLink to="/" className="mt-4 md:mt-0 md:ml-4">Home</NavLink>
      <NavLink to="/upload" className="mt-4 md:mt-0 md:ml-4">Upload</NavLink>
      <NavLink to="/indian" className="mt-4 md:mt-0 md:ml-4">Indian</NavLink>
      <NavLink to="/update-products" className="mt-4 md:mt-0 md:ml-4">Update</NavLink>
      <NavLink to="/category" className="mt-4 md:mt-0 md:ml-4">Category</NavLink>
      <NavLink to="/posts" className="mt-4 md:mt-0 md:ml-4">Posts</NavLink>
      <NavLink to="/search-products" className="mt-4 md:mt-0 md:ml-4"><Search /></NavLink>
    </>
  );
};

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="flex w-1/3 justify-end">
        <div className="hidden w-full md:flex justify-between text text-stone-100 font-semibold">
          <NightMode />
          <NavLinks />
        </div>
        <div className="md:hidden">
          <button onClick={toggleNavbar}>{isOpen ? <X color="#fff" /> : <Menu color="#fff" />}</button>
        </div>
      </nav>
      {isOpen && (
        <div className="flex basis-full flex-col items-center text-white font-medium">
          <NavLinks />
          <NightMode className="pt-mobileNavIcon" />
          {/* mobileNavIcon is a custom class created on tailwind.config.js file */}
        </div>
      )}
    </>
  );
};

export default Nav;