import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';
import SocialLinks from './social/SocialLinks';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <GraduationCap className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-white">EduHorizon</span>
            </Link>
            <p className="text-sm mb-4">
              Your trusted partner in education consulting, helping students achieve their academic dreams.
            </p>
            <SocialLinks />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-blue-400">About Us</Link>
              </li>
              <li>
                <Link to="/colleges" className="hover:text-blue-400">Colleges</Link>
              </li>
              <li>
                <Link to="/success-stories" className="hover:text-blue-400">Success Stories</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-blue-400">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="hover:text-blue-400">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-400">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-500 mr-2" />
                <span>contact@eduhorizon.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-blue-500 mr-2" />
                <span>+91 8877434088</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-blue-500 mr-2" />
                <span>Kankarbagh, Kumhrar, Patna</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © {currentYear} EduHorizon. All rights reserved.
            </p>
            <p className="text-sm mt-2 md:mt-0">
              Developed by{' '}
              <a
                href="https://fusionbirdtechnology.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                Fusion Bird Technology
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}