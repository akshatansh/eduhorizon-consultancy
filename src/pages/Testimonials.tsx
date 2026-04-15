import { motion } from 'framer-motion';
import { CheckCircle, MessageCircle, Star } from 'lucide-react';
import ConsultationButton from '../components/consultation/ConsultationButton';

const testimonialReviews = [
  {
    college: 'GL Bajaj Institute, Greater Noida',
    author: 'Neha Singh',
    initials: 'N',
    course: 'B.Tech CSE',
    year: 'Admitted 2025 - Batch 2025-29',
    featured: true,
    text: (
      <>
        EduHorizon&apos;s in-depth knowledge of <strong>Greater Noida engineering colleges</strong> helped me make the
        right choice for my B.Tech CSE admission. Their counsellors explained everything from GL Bajaj Institute&apos;s
        fee structure to placement statistics so I could decide with confidence and complete the process with proper{' '}
        <strong>admission guidance</strong>.
      </>
    )
  },
  {
    college: 'GNIOT, Greater Noida',
    author: 'Arjun Reddy',
    initials: 'A',
    course: 'MBA',
    year: 'Admitted 2025 - Batch 2025-27',
    featured: false,
    text: (
      <>
        I was confused about which <strong>MBA college in Greater Noida</strong> to choose. EduHorizon compared
        multiple options and helped me shortlist GNIOT based on my budget and career goals. Their{' '}
        <strong>placement preparation sessions</strong> boosted my confidence before the GD-PI round.
      </>
    )
  },
  {
    college: 'IIMT College, Greater Noida',
    author: 'Priya Sharma',
    initials: 'P',
    course: 'B.Tech ECE',
    year: 'Admitted 2025 - Batch 2025-29',
    featured: false,
    text: (
      <>
        EduHorizon helped me choose between <strong>B.Tech ECE colleges near Greater Noida</strong> and guided me
        through complete admission planning. I secured admission at IIMT College and they supported my full
        documentation process.
      </>
    )
  },
  {
    college: 'KCC Institute, Greater Noida',
    author: 'Rohit Kumar',
    initials: 'R',
    course: 'BCA',
    year: 'Admitted 2025 - Scholarship Holder',
    featured: false,
    text: (
      <>
        Personalized career mapping sessions at EduHorizon made my BCA college selection easier. I received admission
        to KCC Institute with scholarship support. If you want trusted{' '}
        <strong>college admission help in Greater Noida</strong>, this team is highly recommended.
      </>
    )
  },
  {
    college: 'ITS Engineering College, Greater Noida',
    author: 'Ananya Verma',
    initials: 'A',
    course: 'B.Tech IT',
    year: 'Admitted 2025 - Batch 2025-29',
    featured: false,
    text: (
      <>
        Thanks to EduHorizon, I found the right <strong>B.Tech IT course in Greater Noida</strong>. Their counsellors
        supported every step from shortlisting to final paperwork. The complete college admission process felt smooth
        and stress-free.
      </>
    )
  },
  {
    college: 'NIET, Greater Noida',
    author: 'Karan Singh',
    initials: 'K',
    course: 'MBA',
    year: 'Admitted 2025 - Batch 2025-27',
    featured: false,
    text: (
      <>
        The mock interview and personality development sessions at EduHorizon were a game changer for my MBA
        admission. I entered NIET GD-PI rounds with full confidence. It is one of the best{' '}
        <strong>MBA admission consultant in Greater Noida</strong> experiences I have seen.
      </>
    )
  }
];

const trustItems = [
  {
    title: '100% Personalized Guidance',
    description: 'Advice tailored to career goals, scores, and budget for every student.'
  },
  {
    title: '200+ Partner Colleges',
    description: 'Strong admission support network across Greater Noida and Delhi NCR.'
  },
  {
    title: 'End-to-End Admission Support',
    description: 'From shortlist and forms to counselling rounds and final confirmation.'
  },
  {
    title: 'Free Expert Consultation',
    description: 'Book your first counselling call and get clear admission direction.'
  }
];

export default function TestimonialsPage() {
  return (
    <div className="pt-20 pb-16 bg-slate-50">
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-300/40 bg-amber-300/10 text-amber-300 text-xs font-semibold tracking-wide uppercase mb-6">
            <Star className="h-4 w-4" aria-hidden="true" />
            4.9/5 Rating - 1000+ Students
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Student Testimonials for EduHorizon Admission Consultancy
          </h1>
          <p className="mt-5 text-blue-100 text-lg max-w-3xl mx-auto">
            Read real success stories from students who secured admissions in top colleges of Greater Noida through
            EduHorizon&apos;s expert counselling for B.Tech, MBA, BCA, and career-focused programs.
          </p>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/5 border border-white/10 rounded-xl p-5 max-w-4xl mx-auto">
            <div>
              <p className="text-3xl font-bold">1000+</p>
              <p className="text-xs text-blue-100 mt-1">Admissions Secured</p>
            </div>
            <div>
              <p className="text-3xl font-bold">98%</p>
              <p className="text-xs text-blue-100 mt-1">Success Rate</p>
            </div>
            <div>
              <p className="text-3xl font-bold">4.9</p>
              <p className="text-xs text-blue-100 mt-1">Average Rating</p>
            </div>
            <div>
              <p className="text-3xl font-bold">200+</p>
              <p className="text-xs text-blue-100 mt-1">Partner Colleges</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h2 className="text-3xl font-bold text-slate-900">Real Admission Success Stories from Greater Noida</h2>
          <p className="mt-4 text-slate-600 text-lg">
            Hundreds of students trusted EduHorizon for college selection, documentation, interview preparation, and
            final admission support. These testimonials highlight how focused counselling leads to better academic and
            career outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialReviews.map((review, index) => (
            <motion.article
              key={review.author}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`rounded-2xl border p-6 bg-white ${review.featured ? 'border-blue-500 shadow-lg shadow-blue-100' : 'border-slate-200 shadow-sm'}`}
            >
              <div className="inline-flex text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-md bg-blue-50 text-blue-700 mb-4">
                {review.college}
              </div>
              <div className="text-amber-500 text-sm mb-3" aria-label="5 out of 5 stars">
                ★★★★★
              </div>
              <p className="text-slate-700 leading-7 text-sm">{review.text}</p>
              <div className="border-t border-slate-100 mt-5 pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  {review.initials}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{review.author}</p>
                  <p className="text-xs text-slate-600">{review.course}</p>
                  <p className="text-xs text-blue-700">{review.year}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <section className="mt-14 bg-slate-900 rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold text-center">Why Students Trust EduHorizon in Greater Noida</h2>
          <p className="text-center text-slate-300 mt-3 max-w-2xl mx-auto">
            A practical, transparent and student-first admission consultancy process for engineering, management, and
            career-focused degree programs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {trustItems.map((item) => (
              <div key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <CheckCircle className="h-6 w-6 text-blue-300 mb-3" aria-hidden="true" />
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-slate-300 mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 bg-white border border-slate-200 rounded-2xl p-8 md:p-10">
          <h2 className="text-2xl font-bold text-slate-900">Trusted Admission Consultancy in Greater Noida</h2>
          <p className="text-slate-600 mt-4 leading-7">
            EduHorizon helps students secure admissions in top colleges for B.Tech, MBA, BCA, and other
            career-oriented courses. With a student-first strategy, our counsellors support everything from shortlist
            creation and course comparisons to documentation and final admission closure. We are known as a reliable{' '}
            <strong>college admission consultancy in Greater Noida</strong> for transparent counselling and better
            decision-making.
          </p>
          <h3 className="text-lg font-semibold text-slate-900 mt-6">Top Colleges We Commonly Support</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-slate-600 text-sm">
            <p>- GL Bajaj Institute of Technology</p>
            <p>- GNIOT Greater Noida</p>
            <p>- IIMT College of Engineering</p>
            <p>- KCC Institute of Technology</p>
            <p>- ITS Engineering College</p>
            <p>- NIET Greater Noida</p>
            <p>- Sharda University</p>
            <p>- Galgotias University</p>
          </div>
        </section>

        <section className="mt-10 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-600 text-white p-8 md:p-10 text-center">
          <h2 className="text-3xl font-bold">Ready to Secure Your Dream College Admission?</h2>
          <p className="mt-3 text-blue-100 max-w-3xl mx-auto">
            Join 1000+ students who trusted EduHorizon for admission counselling in Greater Noida and Delhi NCR.
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
              Chat on WhatsApp
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}