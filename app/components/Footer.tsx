// components/Footer.js

import Link from 'next/link';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-900 text-white mt-12">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Column 1: Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-indigo-400">NextSite Co.</h3>
            <p className="text-sm text-gray-400">
              Building fast, modern web applications with Next.js and React.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition duration-300">
                <FaFacebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition duration-300">
                <FaLinkedin size={20} />
              </a>
              <a href="#" aria-label="GitHub" className="text-gray-400 hover:text-white transition duration-300">
                <FaGithub size={20} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white">Services</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
              <li><Link href="/support" className="text-gray-400 hover:text-white">Support</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-gray-400 hover:text-white">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          {/* Bottom Copyright Bar */}
          <p className="text-center text-sm text-gray-400">
            &copy; {currentYear} NextSite Co. All rights reserved. Built with Next.js.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;