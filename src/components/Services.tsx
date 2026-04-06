import React from 'react';
import { BookOpen, Users, Target, Calendar } from 'lucide-react';

const services = [
  {
    icon: <BookOpen className="h-8 w-8 text-blue-600" />,
    title: "Application Strategy",
    description: "Personalized guidance on college selection and application strategy tailored to your profile."
  },
  {
    icon: <Users className="h-8 w-8 text-blue-600" />,
    title: "Essay Review",
    description: "Expert feedback and editing to help you craft compelling personal statements and essays."
  },
  {
    icon: <Target className="h-8 w-8 text-blue-600" />,
    title: "Interview Preparation",
    description: "Mock interviews and coaching to help you present yourself confidently."
  },
  {
    icon: <Calendar className="h-8 w-8 text-blue-600" />,
    title: "Timeline Planning",
    description: "Structured planning to keep you on track throughout the application process."
  }
];

export default function Services() {
  return (
    <div id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
          <p className="mt-4 text-xl text-gray-600">
            Comprehensive support for your college application journey
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}