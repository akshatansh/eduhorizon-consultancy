import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building, GraduationCap, Calendar, Award, ExternalLink } from 'lucide-react';
import { College } from '../../types/college';

interface CollegeCardProps {
  college: College;
  index: number;
}

export default function CollegeCard({ college, index }: CollegeCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === college.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [college.images.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      <div className="relative h-48 overflow-hidden">
        {college.images.map((image, idx) => (
          <motion.img
            key={idx}
            src={image}
            alt={`${college.name} - Image ${idx + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: idx === currentImageIndex ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
        ))}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center p-2">
          {college.images.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full mx-1 ${
                idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{college.name}</h2>
        <div className="flex items-center text-blue-600 mb-4">
          <Building className="h-4 w-4 mr-2" />
          <span>{college.location}</span>
        </div>
        <p className="text-gray-600 mb-4">{college.description}</p>
        
        <div className="space-y-4 mb-4">
          <div className="flex items-center">
            <GraduationCap className="h-4 w-4 mr-2 text-blue-600" />
            <div className="flex flex-wrap gap-2">
              {college.courses.map((course) => (
                <span key={course} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                  {course}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-blue-600" />
            <span className="text-gray-600">Established: {college.established}</span>
          </div>
          
          {college.ranking && (
            <div className="flex items-center">
              <Award className="h-4 w-4 mr-2 text-blue-600" />
              <span className="text-gray-600">{college.ranking}</span>
            </div>
          )}
        </div>

        <div className="border-t pt-4">
          <p className="text-gray-700 mb-4">Fees: {college.fees}</p>
          <a
            href={college.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            Visit College Website
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}