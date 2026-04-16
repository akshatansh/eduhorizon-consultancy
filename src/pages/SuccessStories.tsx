import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import {
  Briefcase,
  Building,
  CheckCircle,
  DollarSign,
  GraduationCap,
  MessageCircle,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ConsultationButton from '../components/consultation/ConsultationButton';

interface SuccessStory {
  name: string;
  batch: string;
  packageValue: string;
  college: ReactNode;
  course: string;
  placedAt: string;
  quote: ReactNode;
  tags: string[];
  featured?: boolean;
}

const successStories: SuccessStory[] = [
  {
    name: 'Nikunj Gupta',
    batch: 'Batch 2025',
    packageValue: '27 LPA',
    college: (
      <>
        <strong>GL Bajaj Institute of Technology</strong>, Greater Noida
      </>
    ),
    course: 'B.Tech Computer Science Engineering (CSE)',
    placedAt: 'JusPay Technologies',
    quote: (
      <>
        EduHorizon&apos;s counselling helped me choose <strong>GL Bajaj for B.Tech CSE</strong>, one of the best{' '}
        <strong>engineering colleges in Greater Noida</strong> for placements. Their placement preparation sessions,
        mock interviews, and career guidance were invaluable.
      </>
    ),
    tags: ['B.Tech CSE', 'Greater Noida', '27 LPA', 'Top Placement 2025'],
    featured: true
  },
  {
    name: 'Priya Gupta',
    batch: 'Batch 2023',
    packageValue: '8.5 LPA',
    college: (
      <>
        <strong>GNIOT</strong>, Greater Noida
      </>
    ),
    course: 'B.Tech - Top Branch, AKTU Affiliated',
    placedAt: 'Kanini Software Solutions',
    quote: (
      <>
        Thanks to EduHorizon, I got into <strong>GNIOT Greater Noida</strong>, one of the top{' '}
        <strong>B.Tech colleges in Delhi NCR</strong>. Their industry connections and training helped me secure a
        great placement.
      </>
    ),
    tags: ['GNIOT', 'B.Tech', '8.5 LPA', 'Kanini Software']
  },
  {
    name: 'Amit Kumar',
    batch: 'Batch 2022',
    packageValue: '8.2 LPA',
    college: (
      <>
        <strong>IIMT College of Engineering</strong>, Greater Noida
      </>
    ),
    course: 'B.Tech Engineering - AKTU',
    placedAt: 'HCL Technologies',
    quote: (
      <>
        EduHorizon compared <strong>B.Tech college options in Greater Noida</strong> for me and explained placement
        records clearly. That direction helped me plan better and get placed at <strong>HCL Technologies</strong>.
      </>
    ),
    tags: ['IIMT', 'HCL Technologies', '8.2 LPA', 'Engineering']
  },
  {
    name: 'Riya Sharma',
    batch: 'Batch 2024',
    packageValue: '6.5 LPA',
    college: (
      <>
        <strong>KCC Institute of Technology</strong>, Greater Noida
      </>
    ),
    course: 'BCA - Bachelor of Computer Applications',
    placedAt: 'TCS iON',
    quote: (
      <>
        I was confused between BCA and B.Tech. EduHorizon counselling helped me choose{' '}
        <strong>BCA at KCC Institute</strong> based on my interests and budget. That clarity improved my career path
        planning from day one.
      </>
    ),
    tags: ['BCA', 'KCC Institute', 'TCS iON', '6.5 LPA']
  },
  {
    name: 'Rahul Verma',
    batch: 'Batch 2024',
    packageValue: '9.8 LPA',
    college: (
      <>
        <strong>NIET</strong> - Noida Institute of Engineering and Technology
      </>
    ),
    course: 'MBA - Marketing and Finance',
    placedAt: 'Deloitte India',
    quote: (
      <>
        EduHorizon helped me shortlist the best <strong>MBA colleges in Greater Noida</strong> based on my score and
        goals. Their GD-PI preparation made a huge difference, and I got into <strong>NIET for MBA</strong>.
      </>
    ),
    tags: ['MBA', 'NIET Greater Noida', 'Deloitte India', '9.8 LPA']
  },
  {
    name: 'Simran Kaur',
    batch: 'Batch 2025',
    packageValue: '7.2 LPA',
    college: (
      <>
        <strong>ITS Engineering College</strong>, Greater Noida
      </>
    ),
    course: 'B.Tech Information Technology (IT)',
    placedAt: 'Wipro Technologies',
    quote: (
      <>
        I wanted a strong <strong>B.Tech IT college in Greater Noida</strong> with good placements and practical
        support. EduHorizon guided me to the right fit and made the complete <strong>college admission process</strong>{' '}
        stress-free.
      </>
    ),
    tags: ['B.Tech IT', 'ITS Engineering', 'Wipro', '7.2 LPA']
  }
];

const companies = [
  'HCL Technologies',
  'Wipro Technologies',
  'TCS iON',
  'Deloitte India',
  'JusPay',
  'Kanini Software',
  'Infosys',
  'Cognizant',
  'Tech Mahindra',
  'IBM India'
];

export default function SuccessStories() {
  return (
    <div className="pt-20 pb-16 bg-slate-50">
      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-white/80 text-xs font-semibold tracking-wide uppercase mb-6">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Live Placements 2025
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Student Success Stories for EduHorizon Placements in Greater Noida
          </h1>
          <p className="mt-5 text-blue-100 text-lg max-w-3xl mx-auto">
            Real students, real careers, real outcomes. See how expert admission counselling from EduHorizon led to
            top placements after college admissions in Greater Noida.
          </p>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/5 border border-white/10 rounded-xl p-5 max-w-4xl mx-auto">
            <div>
              <p className="text-3xl font-bold">500+</p>
              <p className="text-xs text-blue-100 mt-1">Admissions Secured</p>
            </div>
            <div>
              <p className="text-3xl font-bold">98%</p>
              <p className="text-xs text-blue-100 mt-1">Placement Rate</p>
            </div>
            <div>
              <p className="text-3xl font-bold">27 LPA</p>
              <p className="text-xs text-blue-100 mt-1">Highest Package</p>
            </div>
            <div>
              <p className="text-3xl font-bold">25+</p>
              <p className="text-xs text-blue-100 mt-1">Partner Colleges</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h2 className="text-3xl font-bold text-slate-900">Student Success Stories - EduHorizon Placement Results</h2>
          <p className="mt-4 text-slate-600 text-lg">
            Students who secured top college admissions in Greater Noida through EduHorizon are now working at leading
            companies across India. Here are real outcomes from recent batches.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {['All Stories', 'B.Tech', 'MBA', 'BCA', 'GL Bajaj', 'GNIOT', 'IIMT', '2025 Batch'].map((label, index) => (
            <button
              key={label}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${index === 0 ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {successStories.map((story, index) => (
            <motion.article
              key={story.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className={`rounded-2xl border bg-white p-6 ${story.featured ? 'border-blue-500 shadow-lg shadow-blue-100' : 'border-slate-200 shadow-sm'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{story.batch}</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-100 text-emerald-700">
                  {story.packageValue}
                </span>
              </div>

              <h3 className="text-2xl font-semibold text-slate-900 mb-4">{story.name}</h3>

              <div className="space-y-3 text-sm text-slate-700">
                <div className="flex gap-2">
                  <Building className="h-4 w-4 mt-0.5 text-blue-600 shrink-0" aria-hidden="true" />
                  <p>{story.college}</p>
                </div>
                <div className="flex gap-2">
                  <GraduationCap className="h-4 w-4 mt-0.5 text-blue-600 shrink-0" aria-hidden="true" />
                  <p>{story.course}</p>
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

              <blockquote className="mt-5 border-l-4 border-blue-500 bg-blue-50 text-slate-700 italic text-sm leading-7 px-4 py-3 rounded-r-md">
                {story.quote}
              </blockquote>

              <div className="mt-4 flex flex-wrap gap-2">
                {story.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-600 border border-slate-200">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <section className="mt-14 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Top Companies Where Our Students Are Placed</h2>
          <p className="mt-3 text-slate-600">
            Students admitted through EduHorizon are working at top MNCs and high-growth technology companies.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {companies.map((company) => (
              <span
                key={company}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm font-semibold text-slate-700"
              >
                <Star className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                {company}
              </span>
            ))}
          </div>
        </section>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="bg-white border border-slate-200 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-slate-900">Why EduHorizon Students Get Better Placement Outcomes</h2>
            <p className="text-slate-600 mt-4 leading-7">
              EduHorizon works as a complete career partner from admission counselling to final placement guidance. We
              map student goals with colleges that have stronger placement records and practical training support.
            </p>
            <h3 className="text-lg font-semibold text-slate-900 mt-6">What makes our admission guidance different</h3>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              {[
                'We match students to colleges based on placement records and career fit',
                'Pre-admission counselling for branch, budget, and long-term goals',
                'Direct support network for GL Bajaj, GNIOT, IIMT, NIET, KCC, and ITS',
                'Mock interview and GD-PI preparation for better confidence',
                'Complete document help from verification to final submission',
                'Post-admission follow-up for internship and placement readiness'
              ].map((point) => (
                <p key={point} className="flex gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600 shrink-0" aria-hidden="true" />
                  <span>{point}</span>
                </p>
              ))}
            </div>
          </section>

          <section className="bg-slate-900 text-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold">Our Placement Track Record</h2>
            <p className="text-slate-300 mt-3">
              Numbers that show why EduHorizon is trusted for college admissions and career outcomes in Greater Noida.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                ['27 LPA', 'Highest Package 2025'],
                ['500+', 'Students Placed'],
                ['98%', 'Placement Rate'],
                ['50+', 'Hiring Companies'],
                ['7.2 LPA', 'Average Package'],
                ['25+', 'Partner Colleges']
              ].map(([value, label]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="text-xs text-slate-300 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-10 rounded-2xl bg-gradient-to-r from-slate-900 to-blue-900 text-white p-8 md:p-10 text-center">
          <h2 className="text-3xl font-bold">Your Success Story Starts Here</h2>
          <p className="mt-3 text-blue-100 max-w-3xl mx-auto">
            Join students who trusted EduHorizon for expert <strong>college admission guidance in Greater Noida</strong>
            . First consultation is free.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <ConsultationButton className="bg-white text-blue-700 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold" />
            <a
              href="https://wa.me/918877434088"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/60 text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-colors font-semibold"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              WhatsApp Us Now
            </a>
          </div>
        </section>

        <section className="mt-8 bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-slate-900">Plan Your Next Step</h2>
          <p className="mt-2 text-slate-600 text-sm">
            Use these resources to shortlist colleges and understand admission pathways before counselling.
          </p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm font-medium">
            <Link to="/colleges" className="text-blue-700 hover:text-blue-800 hover:underline">
              Compare Colleges
            </Link>
            <Link to="/testimonials" className="text-blue-700 hover:text-blue-800 hover:underline">
              Read Testimonials
            </Link>
            <Link to="/blog" className="text-blue-700 hover:text-blue-800 hover:underline">
              Read Admission Blog
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}