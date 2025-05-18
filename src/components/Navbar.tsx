
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-green-600 to-teal-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <span className="material-icons-outlined mr-2">eco</span>
            FoodChain ML
          </Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-green-200 transition-colors">Dashboard</Link>
            <Link to="/data" className="hover:text-green-200 transition-colors">Data Management</Link>
            <Link to="/predictions" className="hover:text-green-200 transition-colors">Predictions</Link>
            <Link to="/chain-view" className="hover:text-green-200 transition-colors">Chain View</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
