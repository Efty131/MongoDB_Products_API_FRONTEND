import React from 'react';
import Nav from './nav';
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className='bg-gray-800 top-0 flex-wrap z-[20] mx-auto flex w-full items-center justify-between border-b border-gray-500 md:p-4 p-2'>
      <NavLink to="/" className="text-stone-200 font-bold">Store</NavLink>
      <Nav />
    </header>
  )
};

export default Header;