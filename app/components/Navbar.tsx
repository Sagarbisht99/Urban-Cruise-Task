"use client"
import Link from 'next/link'; // Import Link for Next.js routing

export default function Navbar() {
  return (
    <nav className=" font-semibold text-white p-8 border-b-zinc-900 border-b-2 shadow-sm"> {/* White background, padding, subtle shadow */}
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Section: Logo */}
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-white">
            URBAN CRUISE {/* Your logo text */}
          </Link>
        </div>

        {/* Center Section: Navigation Links */}
        <div className="hidden md:flex space-x-8"> {/* Hide on small screens, show on medium and up, add spacing */}
          <Link href="/" className="text-white  transition-colors duration-200">
            How it works
          </Link>
          <Link href="/dashboard" className="text-white  transition-colors duration-200">
            Dashboard
          </Link>
          <Link href="/" className="text-white  transition-colors duration-200">
            Configurator
          </Link>
        </div>

        {/* Right Section: Action Buttons */}
        <div className="flex items-center space-x-4"> {/* Spacing between items */}
         
          <Link target="_blank" href="https://urbancruise.in/" className="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
            Booking
          </Link>
        </div>

        {/* Placeholder for Mobile Menu Icon (optional, but good practice for responsive design) */}
        {/* You'd typically add a hamburger icon here for md:hidden and toggle a mobile menu */}
        <div className="md:hidden">
            {/* <button className="text-gray-800 focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button> */}
        </div>

      </div>
    </nav>
  );
}