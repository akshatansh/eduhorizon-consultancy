import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, BookOpen, Trophy } from 'lucide-react';
import ConsultationButton from '../consultation/ConsultationButton';
import { Link } from 'react-router-dom';

const stats = [
  { icon: <Users className="h-6 w-6" aria-hidden="true" />, label: "1000+ Students Guided" },
  { icon: <Award className="h-6 w-6" aria-hidden="true" />, label: "95% Admission Success" },
  { icon: <BookOpen className="h-6 w-6" aria-hidden="true" />, label: "200+ College Options" },
  { icon: <Trophy className="h-6 w-6" aria-hidden="true" />, label: "8+ Years Expertise" }
];

export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="h-8 w-8 text-blue-600" aria-hidden="true" />
              <span className="text-2xl font-bold text-blue-600">EduHorizon</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Best Admission Consultancy in India | Expert Guidance for B.Tech, MBA & Medical
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl">
              EduHorizon provides expert college admission guidance and direct admission support for top colleges. Compare fees, placements, and eligibility in one place.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <ConsultationButton className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg w-full sm:w-auto shadow-xl shadow-blue-600/20 hover:shadow-2xl hover:shadow-blue-600/40 transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-1" />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/colleges"
                  className="bg-white border-2 border-gray-100 text-gray-800 px-8 py-4 rounded-xl font-bold w-full sm:w-auto inline-block text-center hover:border-blue-200 hover:bg-blue-50/50 hover:text-blue-700 shadow-sm transition-all duration-300"
                >
                  Browse Top Colleges
                </Link>
              </motion.div>
            </div>
            
            {/* SEO Internal Links for immediate crawlability */}
            <div className="mb-12">
              <p className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Top Locations We Serve:</p>
              <div className="flex flex-wrap gap-2">
                <Link to="/best-admission-consultation-in-noida" className="text-sm px-4 py-1.5 bg-white border border-gray-100 rounded-full text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:shadow-sm transition-all font-medium">Noida</Link>
                <Link to="/best-admission-consultation-in-greater-noida" className="text-sm px-4 py-1.5 bg-white border border-gray-100 rounded-full text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:shadow-sm transition-all font-medium">Greater Noida</Link>
                <Link to="/best-admission-consultation-in-delhi" className="text-sm px-4 py-1.5 bg-white border border-gray-100 rounded-full text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:shadow-sm transition-all font-medium">Delhi</Link>
                <Link to="/best-admission-consultation-in-patna" className="text-sm px-4 py-1.5 bg-white border border-gray-100 rounded-full text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:shadow-sm transition-all font-medium">Patna</Link>
                <Link to="/cities-we-serve" className="text-sm px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-all font-semibold">View All 20+ Cities →</Link>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * (index + 1) }}
                  className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-100"
                >
                  <div className="text-blue-600">{stat.icon}</div>
                  <span className="font-semibold text-gray-800">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="EduHorizon Admission Consultants counselling students for top B.Tech and MBA colleges"
                className="rounded-3xl shadow-2xl object-cover w-full h-[600px] border-[6px] border-white"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            {/* Premium Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-[2.5rem] blur-2xl opacity-40 -z-10 animate-pulse" style={{ animationDuration: '4s' }} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}