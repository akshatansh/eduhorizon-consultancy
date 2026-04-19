import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { ReactNode } from 'react';
import { Building, Briefcase, DollarSign, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeaturedStory {
  name: string;
  batch: string;
  college: ReactNode;
  placedAt: string;
  packageValue: string;
  quote: ReactNode;
}

const featuredStories: FeaturedStory[] = [
  {
    name: 'Nikunj Gupta',
    batch: 'Batch 2025',
    college: (
      <>
        <strong>GL Bajaj Institute of Technology</strong>, Greater Noida
      </>
    ),
    placedAt: 'JusPay Technologies',
    packageValue: '27 LPA',
    quote: (
      <>
        Choosing <strong>GL Bajaj for B.Tech CSE</strong> was a turning point for my career. EduHorizon's counselling
        and preparation support helped me stay focused and placement-ready.
      </>
    )
  },
  {
    name: 'Priya Gupta',
    batch: 'Batch 2023',
    college: (
      <>
        <strong>GNIOT Greater Noida</strong>
      </>
    ),
    placedAt: 'Kanini Software Solutions',
    packageValue: '8.5 LPA',
    quote: (
      <>
        I got clarity while comparing <strong>B.Tech colleges in Delhi NCR</strong>. EduHorizon guided me with the
        right branch selection and complete admission support.
      </>
    )
  },
  {
    name: 'Amit Kumar',
    batch: 'Batch 2022',
    college: (
      <>
        <strong>IIMT College of Engineering</strong>, Greater Noida
      </>
    ),
    placedAt: 'HCL Technologies',
    packageValue: '8.2 LPA',
    quote: (
      <>
        Their team explained <strong>B.Tech college options in Greater Noida</strong> in a practical way. The result
        was focused preparation and a placement at HCL Technologies.
      </>
    )
  }
];

export default function SuccessStoriesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 to-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Student Success Stories</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Real student outcomes after expert admission guidance in Noida and Greater Noida.
            </p>
          </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredStories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">{story.name}</h3>
                <span className="text-xs sm:text-sm font-semibold px-2.5 py-1 rounded bg-emerald-100 text-emerald-700">
                  {story.packageValue}
                </span>
              </div>

              <p className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-slate-500 mb-3">{story.batch}</p>

              <div className="space-y-3 mb-4 text-sm sm:text-base text-slate-700">
                <div className="flex gap-2">
                  <Building className="h-4 w-4 mt-0.5 text-blue-600 shrink-0" aria-hidden="true" />
                  <p>{story.college}</p>
                </div>
                <div className="flex gap-2">
                  <Briefcase className="h-4 w-4 mt-0.5 text-blue-600 shrink-0" aria-hidden="true" />
                  <p>{story.placedAt}</p>
                </div>
                <div className="flex gap-2">
                  <DollarSign className="h-4 w-4 mt-0.5 text-blue-600 shrink-0" aria-hidden="true" />
                  <p>{story.packageValue}</p>
                </div>
              </div>

              <blockquote className="border-l-4 border-blue-500 bg-blue-50 text-slate-700 italic text-sm leading-7 px-4 py-3 rounded-r-md">
                {story.quote}
              </blockquote>

              <div className="mt-4 flex items-center gap-1 text-amber-500">
                <Star className="h-4 w-4 fill-current" aria-hidden="true" />
                <Star className="h-4 w-4 fill-current" aria-hidden="true" />
                <Star className="h-4 w-4 fill-current" aria-hidden="true" />
                <Star className="h-4 w-4 fill-current" aria-hidden="true" />
                <Star className="h-4 w-4 fill-current" aria-hidden="true" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Link
            to="/success-stories"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Success Stories
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}