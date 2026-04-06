import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import ConsultationButton from '../consultation/ConsultationButton';

const benefits = [
  "Personalized Counseling Sessions",
  "Expert College Selection Guidance",
  "Application Process Support",
  "Interview Preparation"
];

export default function CTASection() {
  return (
    <div className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Start Your Journey to Academic Success Today
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Book a free consultation with our expert counselors and take the first step towards your dream college.
            </p>
            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="h-6 w-6 text-blue-300" />
                  <span className="text-lg">{benefit}</span>
                </motion.li>
              ))}
            </ul>
            <ConsultationButton className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-blue-50 transition-colors" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80"
              alt="Students discussing"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-blue-900 rounded-2xl transform translate-x-4 translate-y-4 -z-10 opacity-50" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}