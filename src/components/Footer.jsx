import React from 'react';
import { settings } from '../content';
import { getSocialIcon } from '../utils/icons';

const Footer = () => {
  const socialLinks = settings.socials || [];

  return (
    <footer className="relative z-20 bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          {socialLinks.map((link, index) => {
            const Icon = getSocialIcon(link.platform);
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.platform}
                className="text-gray-400 hover:text-cyan-400 transition-transform duration-300 hover:scale-125"
              >
                <Icon size={24} />
              </a>
            );
          })}
        </div>
        <div className="mb-6 text-gray-400 flex flex-col sm:flex-row justify-center items-center gap-4">
          {settings.email && (
            <a href={`mailto:${settings.email}`} className="hover:text-cyan-400 transition-colors duration-300">
              {settings.email}
            </a>
          )}
          {settings.email && settings.phone && <span className="hidden sm:inline text-gray-600">|</span>}
          {settings.phone && (
            <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="hover:text-cyan-400 transition-colors duration-300">
              {settings.phone}
            </a>
          )}
        </div>
        <p className="text-gray-500">
          &copy; {new Date().getFullYear()} {settings.copyrightName}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
