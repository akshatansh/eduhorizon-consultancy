import React, { useState } from 'react';
import { MapPin, Search, Users, GraduationCap, Building2, Phone, ArrowRight, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import ConsultationButton from '../components/consultation/ConsultationButton';
import { citiesData } from '../data/citiesData';

const stats = [
  { label: 'Cities Covered', value: '12+', icon: MapPin, color: 'text-blue-600', bg: 'bg-blue-100' },
  { label: 'Partner Colleges', value: '200+', icon: Building2, color: 'text-purple-600', bg: 'bg-purple-100' },
  { label: 'Students Guided', value: '1000+', icon: Users, color: 'text-green-600', bg: 'bg-green-100' },
  { label: 'Success Rate', value: '98%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-100' },
];

export default function CitiesWeServe() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'featured'>('all');

  const filtered = citiesData.filter(city => {
    const matchSearch =
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.state.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = activeFilter === 'all' || city.featured;
    return matchSearch && matchFilter;
  });

  const featuredCities = citiesData.filter(c => c.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Hero Section ── */}
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 opacity-20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-400 opacity-20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <MapPin className="h-4 w-4 text-blue-300" />
            <span className="text-blue-200">Pan India Presence</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Cities We{' '}
            <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              Serve
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-10">
            EduHorizon is expanding rapidly across India. We guide students from{' '}
            <strong className="text-white">12+ cities</strong> to secure admissions in their
            dream college — with expert counselling, zero stress.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="city-search"
              type="text"
              placeholder="Search your city or state..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 text-base font-medium bg-white shadow-xl outline-none focus:ring-4 focus:ring-blue-300 transition"
            />
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(stat => (
            <div key={stat.label} className="flex items-center gap-4">
              <div className={`${stat.bg} rounded-xl p-3`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filter Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {filtered.length} {filtered.length === 1 ? 'City' : 'Cities'} Found
            </h2>
            <p className="text-gray-500 text-sm mt-1">Tap any city card to get free guidance</p>
          </div>
          <div className="flex gap-2">
            {(['all', 'featured'] as const).map(tab => (
              <button
                key={tab}
                id={`filter-${tab}`}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeFilter === tab
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
                }`}
              >
                {tab === 'all' ? 'All Cities' : '⭐ Top Cities'}
              </button>
            ))}
          </div>
        </div>

        {/* City Cards Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500">No cities found for "{searchQuery}"</h3>
            <p className="text-gray-400 mt-2">Try a different city name or state.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
              className="mt-6 inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Clear Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(city => (
              <Link
                to={`/best-admission-consultation-in-${city.slug}`}
                key={city.name}
                id={`city-${city.slug}`}
                className={`group bg-white rounded-2xl shadow-sm hover:shadow-xl border ${city.theme.borderColor} transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer block`}
              >
                {/* Card Top Gradient Bar */}
                <div className={`bg-gradient-to-r ${city.theme.color} p-5 flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{city.emoji}</span>
                    <div>
                      <h3 className="text-lg font-bold text-white">{city.name}</h3>
                      <p className="text-white/75 text-xs">{city.state}</p>
                    </div>
                  </div>
                  {city.featured && (
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-300 fill-yellow-300" />
                      <span className="text-white text-xs font-semibold">Top City</span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{city.shortDescription}</p>

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className={`${city.theme.lightColor} rounded-xl p-3 text-center`}>
                      <Building2 className={`h-4 w-4 ${city.theme.textColor} mx-auto mb-1`} />
                      <p className={`text-lg font-bold ${city.theme.textColor}`}>{city.collegesCount}+</p>
                      <p className="text-xs text-gray-500">Colleges</p>
                    </div>
                    <div className={`${city.theme.lightColor} rounded-xl p-3 text-center`}>
                      <GraduationCap className={`h-4 w-4 ${city.theme.textColor} mx-auto mb-1`} />
                      <p className={`text-lg font-bold ${city.theme.textColor}`}>{city.studentsCount}</p>
                      <p className="text-xs text-gray-500">Students</p>
                    </div>
                  </div>

                  {/* Popular Courses */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Popular Courses</p>
                    <div className="flex flex-wrap gap-1.5">
                      {city.popularCourses.map(course => (
                        <span
                          key={course}
                          className={`text-xs font-medium ${city.theme.textColor} ${city.theme.lightColor} border ${city.theme.borderColor} px-2 py-0.5 rounded-full`}
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div
                    className={`w-full justify-center bg-gradient-to-r ${city.theme.color} text-white py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 group-hover:opacity-90 transition`}
                  >
                    View Top Colleges <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── Coming Soon Cities Banner ── */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-5">
            <TrendingUp className="h-4 w-4 text-green-400" />
            <span className="text-green-300 font-medium">Rapidly Growing</span>
          </div>
          <h2 className="text-3xl font-bold mb-3">Coming Soon to More Cities</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            We are expanding to <strong className="text-white">Mumbai, Pune, Bengaluru, Hyderabad, Jaipur</strong> and
            many more cities. Be the first to benefit from EduHorizon's expert guidance near you!
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['Mumbai', 'Pune', 'Bengaluru', 'Hyderabad', 'Jaipur', 'Bhopal', 'Ranchi', 'Chandigarh'].map(c => (
              <span
                key={c}
                className="bg-white/10 border border-white/20 text-gray-300 px-4 py-1.5 rounded-full text-sm font-medium"
              >
                📍 {c} — Coming Soon
              </span>
            ))}
          </div>
          <ConsultationButton
            label="Notify Me When Available"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          />
        </div>
      </section>

      {/* ── Why Choose EduHorizon ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Why Students Trust EduHorizon?
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Whichever city you're from, our counsellors are with you every step of the way.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Users,
              title: 'Personalised Guidance',
              desc: 'One-on-one counselling sessions tailored to your profile, budget, and career goals.',
              color: 'text-blue-600', bg: 'bg-blue-100'
            },
            {
              icon: Building2,
              title: '200+ Partner Colleges',
              desc: 'We have tie-ups with the best colleges across all 12+ cities for direct admission support.',
              color: 'text-purple-600', bg: 'bg-purple-100'
            },
            {
              icon: Phone,
              title: '24/7 Support',
              desc: 'Our team is available on WhatsApp and call to answer your admission queries anytime.',
              color: 'text-green-600', bg: 'bg-green-100'
            },
          ].map(item => (
            <div key={item.title} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition text-center">
              <div className={`${item.bg} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5`}>
                <item.icon className={`h-7 w-7 ${item.color}`} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-16 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <GraduationCap className="h-12 w-12 mx-auto mb-5 text-blue-200" />
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Admission Journey?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            No matter which city you're in — our experts will guide you to the <strong>right college</strong> at the{' '}
            <strong>right fee</strong>.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <ConsultationButton
              label="Book Free Consultation"
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition shadow-lg"
            />
            <a
              href="tel:+918877434088"
              className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/10 transition"
            >
              <Phone className="h-5 w-5" />
              Call Now: +91 88774 34088
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
