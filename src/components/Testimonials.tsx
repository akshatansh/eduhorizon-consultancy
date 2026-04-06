import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    text: "The counseling sessions were eye-opening. They helped me understand my strengths and choose the right course.",
    author: "Ananya Sharma",
    role: "B.Tech Student, GNIOT",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80"
  },
  {
    text: "The mock interviews and personality development sessions boosted my confidence tremendously.",
    author: "Rajat Verma",
    role: "MBA Student, GL Bajaj",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80"
  },
  {
    text: "Their knowledge about college admissions and entrance exams is exceptional. Highly recommended!",
    author: "Priya Gupta",
    role: "MCA Student, Galgotias",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80"
  },
  {
    text: "The career mapping session helped me align my interests with the right course. Now I'm excelling in my field!",
    author: "Aditya Singh",
    role: "B.Tech Student, IILM",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80"
  }
];

export default function Testimonials() {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Our Students Say</h2>
          <p className="mt-4 text-xl text-gray-600">
            Real experiences from our students who achieved their dreams
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-start gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-blue-600 mb-2" />
                  <p className="text-gray-600 italic mb-4">{testimonial.text}</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}