import React from 'react';
import { motion } from 'framer-motion';
import SuccessStoryCard from '../components/success/SuccessStoryCard';
import { successStories } from '../data/successStories';

export default function SuccessStories() {
  return (
    <div className="pt-24 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900">Success Stories</h1>
          <p className="mt-4 text-xl text-gray-600">
            Meet our students who achieved their dreams with our guidance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <SuccessStoryCard key={story.name} story={story} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}