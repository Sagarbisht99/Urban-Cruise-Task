"use client"
import Link from 'next/link';
import { useState } from 'react'; // Import useState for managing mobile menu state

export default function Navbar() {
  // State to manage the visibility of the mobile menu
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the menu state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Define the navigation links (reusable for desktop and mobile)
  const navLinks = (
    <>
      <Link href="/" className="hover:text-gray-400 transition-colors duration-200" onClick={() => setIsOpen(false)}>
        How it works
      </Link>
      <Link href="/dashboard" className="hover:text-gray-400 transition-colors duration-200" onClick={() => setIsOpen(false)}>
        Dashboard
      </Link>
      <Link href="/" className="hover:text-gray-400 transition-colors duration-200" onClick={() => setIsOpen(false)}>
        Configurator
      </Link>
    </>
  );

  return (
    <nav className="font-semibold text-white p-4 sm:p-6 border-b-zinc-900 border-b-2 shadow-sm sticky top-0 z-50"> {/* Added bg-black and z-50 */}
      <div className="container mx-auto flex items-center justify-between">
        
        {/* Left Section: Logo */}
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-white">
            URBAN CRUISE
          </Link>
        </div>

        {/* Center Section: Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 text-lg"> {/* Hidden on small, shown on medium+ */}
          {navLinks}
        </div>

        {/* Right Section: Action Buttons (Visible on all sizes) */}
        <div className="flex items-center space-x-4">
          <Link target="_blank" href="https://urbancruise.in/" className="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
            Booking
          </Link>

          {/* Hamburger Icon: Visible on small, hidden on medium+ */}
          <button 
            className="md:hidden text-white focus:outline-none" 
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            {/* Conditional rendering for X icon or Hamburger icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                // 'X' icon when menu is open
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                // Hamburger icon when menu is closed
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu: Conditionally Rendered */}
      {isOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-zinc-800">
          <div className="flex flex-col space-y-4 text-white text-lg">
            {navLinks}
          </div>
        </div>
      )}
    </nav>
  );
}