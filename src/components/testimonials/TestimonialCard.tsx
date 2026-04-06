import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Testimonial } from '../../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

export default function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-start gap-4">
        <img
          src={testimonial.image}
          alt={testimonial.author}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <Quote className="h-8 w-8 text-blue-600 mb-2" />
          <p className="text-gray-600 italic mb-4">{testimonial.text}</p>
          <div>
            <p className="font-semibold text-gray-900">{testimonial.author}</p>
            <p className="text-sm text-gray-600">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}