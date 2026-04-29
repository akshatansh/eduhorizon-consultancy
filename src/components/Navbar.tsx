import React, { useState } from 'react';
import { GraduationCap, Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import ConsultationButton from './consultation/ConsultationButton';
import { citiesData } from '../data/citiesData';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCitiesOpen, setIsCitiesOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/colleges', label: 'Colleges' },
    { path: '/cities-we-serve', label: 'Cities We Serve' },
    { path: '/faq', label: 'FAQ' },
    { path: '/success-stories', label: 'Success Stories' },
    { path: '/testimonials', label: 'Testimonials' },
    { path: '/blog', label: 'Blog' }
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/EDUHORIZON (1).jpg" 
                alt="EduHorizon Admission Consultancy Logo" 
                className="h-10 w-auto object-contain rounded-sm" 
              />
              <span className="ml-2 text-xl font-bold text-gray-800 hidden sm:block">EduHorizon</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 text-sm lg:text-base">
            {navItems.map((item) => {
              if (item.label === 'Cities We Serve') {
                return (
                  <div key={item.path} className="relative group">
                    <Link
                      to={item.path}
                      className="text-gray-600 hover:text-blue-600 flex items-center py-5"
                    >
                      {item.label} <ChevronDown className="h-4 w-4 ml-1" />
                    </Link>
                    <div className="absolute left-0 mt-0 w-56 bg-white rounded-b-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-t-0 border-gray-100">
                      <div className="py-2 max-h-[70vh] overflow-y-auto">
                        {citiesData.map((city) => (
                          <Link
                            key={city.slug}
                            to={`/best-admission-consultation-in-${city.slug}`}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            {city.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-600 hover:text-blue-600 py-5"
                >
                  {item.label}
                </Link>
              );
            })}
            <ConsultationButton
              label="Book Consultation"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
            />
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white max-h-[80vh] overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              if (item.label === 'Cities We Serve') {
                return (
                  <div key={item.path} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Link
                        to={item.path}
                        className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 flex-grow"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                      <button 
                        onClick={() => setIsCitiesOpen(!isCitiesOpen)}
                        className="p-2 text-gray-500 hover:text-blue-600"
                        aria-label="Toggle cities menu"
                      >
                        <ChevronDown className={`h-4 w-4 transition-transform ${isCitiesOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    {isCitiesOpen && (
                      <div className="pl-6 pr-3 py-1 space-y-1 bg-gray-50 rounded-lg">
                        {citiesData.map(city => (
                          <Link
                            key={city.slug}
                            to={`/best-admission-consultation-in-${city.slug}`}
                            className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {city.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2 pb-1" onClick={() => setIsMenuOpen(false)}>
              <ConsultationButton
                label="Book Consultation"
                className="w-full justify-center bg-blue-600 text-white px-3 py-2.5 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}