import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, BookOpen, Trophy } from 'lucide-react';
import ConsultationButton from '../consultation/ConsultationButton';

const stats = [
  { icon: <Users className="h-6 w-6" />, label: "1000+ Students" },
  { icon: <Award className="h-6 w-6" />, label: "95% Success Rate" },
  { icon: <BookOpen className="h-6 w-6" />, label: "50+ Colleges" },
  { icon: <Trophy className="h-6 w-6" />, label: "10+ Years Experience" }
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
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">EduHorizon</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
              Shape Your Future with Expert Education Guidance
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Navigate your path to success with personalized college admission consulting. 
              We help you make informed decisions about your academic future.
            </p>
            <div className="flex gap-4 mb-12">
              <ConsultationButton />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold"
              >
                Learn More
              </motion.button>
            </div>
            <div className="flex gap-8">
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
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80"
                alt="Students studying"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute inset-0 bg-blue-600 rounded-2xl transform translate-x-4 translate-y-4 -z-10" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}