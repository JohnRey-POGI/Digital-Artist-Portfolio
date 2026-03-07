import React from 'react';
import { FaTwitter, FaInstagram, FaArtstation, FaLinkedin } from 'react-icons/fa';

const socialLinks = [
  { icon: <FaTwitter />, url: 'https://twitter.com' },
  { icon: <FaInstagram />, url: 'https://instagram.com' },
  { icon: <FaArtstation />, url: 'https://www.artstation.com/xr374rt6' },
  { icon: <FaLinkedin />, url: 'https://linkedin.com' },
];

const Footer = () => {
  return (
    <footer className="relative z-20 bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-transform duration-300 hover:scale-125"
            >
              {React.cloneElement(link.icon, { size: 24 })}
            </a>
          ))}
        </div>
        <div className="mb-6 text-gray-400 flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="mailto:xr374rt@gmail.com" className="hover:text-cyan-400 transition-colors duration-300">
            xr374rt@gmail.com
          </a>
          <span className="hidden sm:inline text-gray-600">|</span>
          <a href="tel:+63 929 423 1447" className="hover:text-cyan-400 transition-colors duration-300">
            +63 929 423 1447
          </a>
        </div>
        <p className="text-gray-500">
          &copy; {new Date().getFullYear()} XR374RT. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;