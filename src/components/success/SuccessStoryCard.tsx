import React from 'react';
import { motion } from 'framer-motion';
import { Building, Calendar, Briefcase, DollarSign } from 'lucide-react';
import { SuccessStory } from '../../types';

interface SuccessStoryCardProps {
  story: SuccessStory;
  index: number;
}

export default function SuccessStoryCard({ story, index }: SuccessStoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="relative">
        <img
          src={story.image}
          alt={story.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{story.name}</h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Batch {story.batch}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Building className="h-4 w-4 mr-2" />
            <span>{story.college}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Briefcase className="h-4 w-4 mr-2" />
            <span>Placed at {story.placed}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <DollarSign className="h-4 w-4 mr-2" />
            <span>Package: {story.package}</span>
          </div>
        </div>
        <p className="text-gray-600 italic">&ldquo;{story.quote}&rdquo;</p>
      </div>
    </motion.div>
  );
}