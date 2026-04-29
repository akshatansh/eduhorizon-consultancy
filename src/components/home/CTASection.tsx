import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import ConsultationButton from '../consultation/ConsultationButton';

const benefits = [
  "Personalized counselling based on marks, budget, and goals",
  "Top college shortlisting for B.Tech, MBA, BCA, MCA and more",
  "Application and counselling round support",
  "Scholarship and documentation guidance"
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Get Expert Admission Guidance Today
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-xl">
              Book a free consultation with EduHorizon to compare colleges, understand fees, and plan your admission
              strategy with confidence.
            </p>
            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="mt-1 h-6 w-6 text-blue-300" aria-hidden="true" />
                  <span className="text-lg sm:text-xl">{benefit}</span>
                </motion.li>
              ))}
            </ul>
            <ConsultationButton className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-blue-50 transition-colors w-full sm:w-auto" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="EduHorizon Expert Admission Counsellors guiding a student to a top engineering college"
              className="rounded-2xl shadow-2xl object-cover w-full h-full max-h-[500px]"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-blue-900 rounded-2xl transform translate-x-4 translate-y-4 -z-10 opacity-50" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}