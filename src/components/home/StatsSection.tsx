import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Award, BookOpen, Trophy } from 'lucide-react';

const stats = [
  {
    icon: <Users className="h-12 w-12" aria-hidden="true" />,
    value: "1000+",
    label: "Students Guided",
    description: "Successfully helped students achieve their academic goals"
  },
  {
    icon: <Award className="h-12 w-12" aria-hidden="true" />,
    value: "95%",
    label: "Success Rate",
    description: "Of our students get into their preferred colleges"
  },
  {
    icon: <BookOpen className="h-12 w-12" aria-hidden="true" />,
    value: "200+",
    label: "Partner Colleges",
    description: "Strong network of top colleges in Greater Noida"
  },
  {
    icon: <Trophy className="h-12 w-12" aria-hidden="true" />,
    value: "7+",
    label: "Years Experience",
    description: "Decade of expertise in education consulting"
  }
];

export default function StatsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="py-20 bg-blue-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-blue-600 flex justify-center mb-4">
                {stat.icon}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
              >
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  {stat.label}
                </div>
                <p className="text-gray-600">{stat.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}