import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Users, Target, Calendar, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="h-8 w-8" aria-hidden="true" />,
    title: "College Selection Guidance",
    description: "Choose the right college in Noida and Greater Noida based on your score, budget, location preference, and career goals.",
    points: ["Profile Analysis", "College Comparison", "Branch Selection"]
  },
  {
    icon: <Users className="h-8 w-8" aria-hidden="true" />,
    title: "Admission Application Support",
    description: "Get end-to-end support during application, counselling rounds, and final seat confirmation.",
    points: ["Document Checklist", "Form Filling Support", "Admission Follow-up"]
  },
  {
    icon: <Target className="h-8 w-8" aria-hidden="true" />,
    title: "Career Counseling",
    description: "Make better career decisions with clear guidance on future scope, placements, and skill roadmap.",
    points: ["Career Assessment", "Placement Insights", "Future Planning"]
  },
  {
    icon: <Calendar className="h-8 w-8" aria-hidden="true" />,
    title: "Admission Timeline Management",
    description: "Never miss deadlines for counselling, applications, scholarship forms, and reporting dates.",
    points: ["Deadline Tracking", "Regular Updates", "Round-wise Planning"]
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
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Complete College Admission Support
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
            From shortlisting to final admission, we support every step of your higher education journey.
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
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-base sm:text-lg text-gray-600 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="h-4 w-4 mt-1 text-blue-600" aria-hidden="true" />
                    <span className="text-sm sm:text-base">{point}</span>
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