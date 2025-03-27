import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-semibold">Prudentia</div>
        <ul className="flex space-x-6">
          <li>
            <a href="/" className="hover:text-indigo-300">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-indigo-300">
              About Us
            </a>
          </li>
          <li>
            <a href="#services" className="hover:text-indigo-300">
              Services
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-indigo-300">
              Contact
            </a>
          </li>
          <li>
            <a
              href="login"
              className="px-4 py-2 bg-indigo-700 rounded-lg text-white hover:bg-indigo-800"
            >
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
