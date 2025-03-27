import React from "react";

const Footer = () => {
  return (
    <footer className="bg-indigo-600 text-white py-8">
      <div className="container mx-auto text-center">
        <p className="mb-4">Prudentia Bank - Your Trusted Financial Partner</p>
        <ul className="flex justify-center space-x-8">
          <li>
            <a href="#about" className="hover:text-indigo-300">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-indigo-300">
              Contact
            </a>
          </li>
          <li>
            <a href="#privacy" className="hover:text-indigo-300">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#terms" className="hover:text-indigo-300">
              Terms of Service
            </a>
          </li>
        </ul>
        <p className="mt-4">&copy; 2025 Prudentia Bank. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
