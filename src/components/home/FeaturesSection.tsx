import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Users, Target, Calendar, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="h-8 w-8" aria-hidden="true" />,
    title: "Expert College Selection",
    description: "Get personalized guidance on choosing the right college based on your academic profile and career goals.",
    points: ["Profile Analysis", "College Shortlisting", "Course Selection"]
  },
  {
    icon: <Users className="h-8 w-8" aria-hidden="true" />,
    title: "Application Support",
    description: "Comprehensive assistance throughout your college application process.",
    points: ["Document Preparation", "Form Filling", "Interview Preparation"]
  },
  {
    icon: <Target className="h-8 w-8" aria-hidden="true" />,
    title: "Career Counseling",
    description: "Make informed decisions about your career path with expert guidance.",
    points: ["Career Assessment", "Industry Insights", "Future Planning"]
  },
  {
    icon: <Calendar className="h-8 w-8" aria-hidden="true" />,
    title: "Admission Timeline",
    description: "Stay on track with a customized admission timeline and regular updates.",
    points: ["Deadline Tracking", "Regular Updates", "Process Management"]
  }
];

export default function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Comprehensive Admission Support
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide end-to-end support for your college admission journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.points.map((point, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="h-4 w-4 text-blue-600" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}