import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuIcon, XIcon } from '@heroicons/react/outline'; // Icons for the hamburger menu

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
  return (
    <nav className="w-full bg-blue-500 p-4 text-white flex justify-between items-center">
      <div className="text-lg font-bold cursor-pointer" onClick={()=>navigate('/')}>Quiz App</div>
      <div className="hidden md:flex">
        <Link to="/createblog" className="mr-4">Create Blog</Link>
        <Link to="/userblog" className="mr-4">Your Blogs</Link>
        <Link to="/logout">Logout</Link>
      </div>
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
          {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-blue-500 w-full flex flex-col items-center py-2">
          <Link to="/createblog" className="py-2" onClick={() => setIsMenuOpen(false)}>Create Blog</Link>
          <Link to="/userblog" className="py-2" onClick={() => setIsMenuOpen(false)}>Your Blogs</Link>
          <Link to="/logout" className="py-2" onClick={() => setIsMenuOpen(false)}>Logout</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
