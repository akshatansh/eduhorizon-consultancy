import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Building2, Award, Wallet, TrendingUp } from 'lucide-react';
import { colleges as seedColleges } from '../data/colleges';
import CollegeCard from '../components/colleges/CollegeCard';
import { createClient } from '@supabase/supabase-js';
import { mapDbCollegeToUi, type DbCollegeRow } from '../utils/cmsMappers';
import type { College } from '../types/college';
import { Link } from 'react-router-dom';
import ConsultationButton from '../components/consultation/ConsultationButton';

export default function Colleges() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [quickFilter, setQuickFilter] = useState<
    'all' | 'engineering' | 'management' | 'bca-mca' | 'nirf' | 'under-1-5' | 'placements'
  >('all');
  const [colleges, setColleges] = useState<College[]>(seedColleges);

  useEffect(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) return;

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const run = async () => {
      const { data, error } = await supabase
        .from('colleges')
        .select('slug,name,location,courses,images,description,fees,website,established,ranking,facilities,highlights')
        .order('name', { ascending: true });

      if (error || !data) return;
      if (data.length === 0) return;
      setColleges((data as DbCollegeRow[]).map(mapDbCollegeToUi));
    };
    run();
  }, []);

  const getMinFeeLakh = (fees: string) => {
    const match = fees.match(/₹\s*([0-9]+(?:\.[0-9]+)?)\s*L/i);
    if (!match) return null;
    const n = Number(match[1]);
    return Number.isFinite(n) ? n : null;
  };

  const matchesQuickFilter = (college: College) => {
    switch (quickFilter) {
      case 'engineering':
        return college.courses.some((c) => c.toLowerCase().includes('b.tech') || c.toLowerCase().includes('m.tech'));
      case 'management':
        return college.courses.some((c) => ['mba', 'pgdm', 'bba'].includes(c.toLowerCase()));
      case 'bca-mca':
        return college.courses.some((c) => ['bca', 'mca'].includes(c.toLowerCase()));
      case 'nirf':
        return (college.ranking || '').toLowerCase().includes('nirf');
      case 'under-1-5': {
        const min = getMinFeeLakh(college.fees);
        return min !== null ? min < 1.5 : false;
      }
      case 'placements':
        return (college.highlights || []).some((h) => h.toLowerCase().includes('placement'));
      case 'all':
      default:
        return true;
    }
  };

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse ? college.courses.includes(selectedCourse) : true;
    return matchesSearch && matchesCourse && matchesQuickFilter(college);
  });

  const allCourses = Array.from(new Set(colleges.flatMap(college => college.courses)));

  return (
    <div className="pt-16 bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 flex items-center gap-2">
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Home
          </Link>
          <span className="opacity-50">/</span>
          <span className="text-gray-600">Colleges in Greater Noida</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-5">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Greater Noida · Delhi NCR · AKTU Affiliated
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                Top Colleges in <span className="text-blue-600">Greater Noida</span> 2026
              </h1>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl">
                Compare fees, placements, NIRF ranks and courses of top engineering and management colleges in Greater Noida.
                Get free expert admission guidance from EduHorizon.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ConsultationButton />
                <a
                  href="#college-list"
                  className="inline-flex items-center justify-center border-2 border-blue-600 text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Explore Colleges
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="bg-white/80 backdrop-blur rounded-2xl border border-blue-100 shadow-sm p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-blue-50 p-4">
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-blue-600" aria-hidden="true" />
                      Partner Colleges
                    </div>
                    <div className="mt-1 text-2xl font-bold text-gray-900">25+</div>
                  </div>
                  <div className="rounded-xl bg-blue-50 p-4">
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      <Award className="h-4 w-4 text-blue-600" aria-hidden="true" />
                      Admissions Done
                    </div>
                    <div className="mt-1 text-2xl font-bold text-gray-900">500+</div>
                  </div>
                  <div className="rounded-xl bg-blue-50 p-4">
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" aria-hidden="true" />
                      Placement Support
                    </div>
                    <div className="mt-1 text-2xl font-bold text-gray-900">98%</div>
                  </div>
                  <div className="rounded-xl bg-blue-50 p-4">
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-blue-600" aria-hidden="true" />
                      Fees From
                    </div>
                    <div className="mt-1 text-2xl font-bold text-gray-900">₹0.9L</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  Shortlist colleges by course, budget and ranking—then book a free counselling call for a personalised plan.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section id="college-list" className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search colleges — e.g. GNIOT, GL Bajaj, B.Tech, MBA..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                aria-label="Search colleges"
              />
            </div>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              aria-label="Filter by course"
            >
              <option value="">All Courses</option>
              {allCourses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          {/* Quick filter pills */}
          <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Quick filters">
            {[
              { id: 'all', label: 'All Colleges' },
              { id: 'engineering', label: 'Engineering' },
              { id: 'management', label: 'MBA / Management' },
              { id: 'bca-mca', label: 'BCA / MCA' },
              { id: 'nirf', label: 'NIRF Ranked' },
              { id: 'under-1-5', label: 'Under ₹1.5L Fees' },
              { id: 'placements', label: 'Top Placement' }
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setQuickFilter(p.id as typeof quickFilter)}
                className={[
                  'px-4 py-2 rounded-full text-sm font-medium border transition-colors',
                  quickFilter === p.id
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:text-blue-700'
                ].join(' ')}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="flex items-baseline justify-between gap-4 flex-wrap mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Top Colleges in Greater Noida — Admission 2026</h2>
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredColleges.length}</span> colleges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredColleges.map((college, index) => (
              <CollegeCard key={college.id} college={college} index={index} />
            ))}
          </div>

          {/* SEO content */}
          <div className="mt-14 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-10">
            <h3 className="text-2xl font-bold text-gray-900">
              Best Colleges in Greater Noida for B.Tech, MBA &amp; BCA Admission 2026
            </h3>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Greater Noida has emerged as one of the top education hubs in Delhi NCR, home to AICTE-approved, AKTU-affiliated
              colleges offering B.Tech, MBA, BCA, MCA, PGDM and other professional programs. EduHorizon helps you compare
              colleges and secure admission with complete guidance—fees, placements, rankings and the right course fit.
            </p>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Top B.Tech Colleges in Greater Noida — 2026</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><span className="font-semibold text-gray-800">GL Bajaj Institute</span> — Best for CSE, highest packages up to 27 LPA</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><span className="font-semibold text-gray-800">GNIOT</span> — NIRF ranked, strong placements, AICTE approved</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><span className="font-semibold text-gray-800">IIMT College</span> — Since 1994, strong industry connections</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><span className="font-semibold text-gray-800">NIET</span> — Large campus, strong B.Tech + MBA programs</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><span className="font-semibold text-gray-800">Mangalmay</span> — Affordable fees, holistic development focus</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><span className="font-semibold text-gray-800">KCC Institute</span> — Best for BCA, low fees, scholarship options</span>
                  </li>
                </ul>

                <h4 className="mt-7 text-lg font-semibold text-gray-900 mb-3">Why Choose Greater Noida for Admissions</h4>
                <ul className="space-y-2 text-gray-600">
                  {[
                    'Multiple AKTU-affiliated colleges in one location',
                    'Fees starting from ₹90,000 per year',
                    'Excellent connectivity to Delhi and Noida',
                    'Strong IT and manufacturing industry presence nearby',
                    'Scholarship and fee-waiver options available'
                  ].map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">How EduHorizon Helps</h4>
                <p className="text-gray-600 leading-relaxed">
                  EduHorizon is a trusted admission consultancy in Greater Noida with direct partnerships with colleges.
                  Our counsellors help you shortlist the right college, understand the process and prepare documents end-to-end.
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  {[
                    'Compare colleges by fees, placements and rankings',
                    'Understand AKTU counselling steps',
                    'Direct admission guidance (where available)',
                    'Scholarship and fee-waiver assistance',
                    'Document checklist: marksheets, TC, migration, etc.',
                    'Branch guidance: CSE vs IT vs ECE and more'
                  ].map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="mt-7 text-lg font-semibold text-gray-900 mb-3">Admission 2026 — Important Dates</h4>
                <ul className="space-y-2 text-gray-600">
                  {[
                    'AKTU Counselling Round 1 — July 2026',
                    'Direct Admission Window — May–August 2026',
                    'Scholarship Applications — June–July 2026',
                    'Classes Begin — August / September 2026'
                  ].map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-10 rounded-2xl bg-gray-900 text-white p-6 sm:p-10">
            <h3 className="text-2xl font-bold">Frequently Asked Questions — Colleges in Greater Noida</h3>
            <p className="mt-2 text-white/70">
              Common questions students ask before securing college admissions in Greater Noida.
            </p>
            <div className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[
                {
                  q: 'Which is the best B.Tech college in Greater Noida?',
                  a: 'Top choices include GL Bajaj (high packages), GNIOT (NIRF ranked) and IIMT (strong industry connections). We help you shortlist based on rank, budget and goals.'
                },
                {
                  q: 'What are the fees for B.Tech in Greater Noida colleges?',
                  a: 'B.Tech fees generally range from ₹90,000 to ₹2.8 lakh per year depending on college and branch. Use the quick filter “Under ₹1.5L Fees” to shortlist budget-friendly options.'
                },
                {
                  q: 'Can I get direct admission without JEE?',
                  a: 'Many AKTU-affiliated colleges offer admission routes based on seat availability and eligibility. Book a free counselling session and we’ll guide you step-by-step.'
                },
                {
                  q: 'Which is the best MBA college in Greater Noida?',
                  a: 'Popular MBA options include NIET, GNIOT and Mangalmay depending on fees, specialisation and placement support. We can help you compare and pick the best fit.'
                }
              ].map((item) => (
                <div key={item.q} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <p className="font-semibold">{item.q}</p>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 sm:p-10 overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold">Not Sure Which College to Choose?</h3>
              <p className="mt-3 text-white/80 max-w-2xl">
                Get a free 30-minute counselling session. We’ll compare colleges, fees and placements for you—completely free.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ConsultationButton
                  label="Book Free Consultation"
                  className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
                />
                <a
                  href="https://wa.me/918877434088?text=Hi%21%20I%20want%20admission%20guidance%20for%20Greater%20Noida%20colleges."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border-2 border-white/60 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          </div>
        </div>
      </section>
    </div>
  );
}