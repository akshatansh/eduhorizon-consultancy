import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, BookOpen, Trophy } from 'lucide-react';
import ConsultationButton from '../consultation/ConsultationButton';
import { Link } from 'react-router-dom';

const stats = [
  { icon: <Users className="h-6 w-6" aria-hidden="true" />, label: "1000+ Students Guided" },
  { icon: <Award className="h-6 w-6" aria-hidden="true" />, label: "95% Admission Success" },
  { icon: <BookOpen className="h-6 w-6" aria-hidden="true" />, label: "200+ College Options" },
  { icon: <Trophy className="h-6 w-6" aria-hidden="true" />, label: "7+ Years Expertise" }
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
              Best Admission Consultancy in Noida and Greater Noida
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl">
              EduHorizon provides expert college admission guidance for B.Tech, MBA, BCA, MCA, and other career-focused
              courses. Compare colleges, fees, placements, and eligibility in one place with personalized counselling.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <ConsultationButton className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2" />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/about"
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold w-full sm:w-auto inline-block text-center hover:bg-blue-50 transition-colors"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
            <div className="flex flex-wrap gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * (index + 1) }}
                  className="flex items-center gap-2"
                >
                  <div className="text-blue-600">{stat.icon}</div>
                  <span className="font-semibold">{stat.label}</span>
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
                className="rounded-2xl shadow-2xl object-cover w-full h-[600px]"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <div className="absolute inset-0 bg-blue-600 rounded-2xl transform translate-x-4 translate-y-4 -z-10" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}