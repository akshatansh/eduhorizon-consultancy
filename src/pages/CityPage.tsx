import React, { useEffect } from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { MapPin, CheckCircle, ArrowRight, Building2, BookOpen, GraduationCap } from 'lucide-react';
import { citiesData } from '../data/citiesData';
import ConsultationButton from '../components/consultation/ConsultationButton';

export default function CityPage() {
  const location = useLocation();
  const pathParts = location.pathname.split('/best-admission-consultation-in-');
  const citySlug = pathParts.length > 1 ? pathParts[1] : '';
  const city = citiesData.find(c => c.slug === citySlug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [citySlug]);

  if (!city) {
    return <Navigate to="/cities-we-serve" replace />;
  }

  // Schema markup for LocalBusiness / EducationalOrganization
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: `EduHorizon Admission Consultancy ${city.name}`,
    description: city.seo.description,
    url: `https://www.eduhorizon.online/city/${city.slug}`,
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: {
        '@type': 'State',
        name: city.state
      }
    },
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Admission Counselling',
        description: `Expert career guidance and admission support for top colleges in ${city.name}.`
      }
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: city.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <section className={`bg-gradient-to-br ${city.theme.color} text-white py-20 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-7xl mx-auto">
          <Link to="/cities-we-serve" className="inline-flex items-center text-white/80 hover:text-white mb-8 text-sm font-medium transition-colors">
            <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
            Back to All Cities
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <MapPin className="h-4 w-4" />
                <span>Admission Guidance in {city.name}, {city.state}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Best Education Consultant in <span className="text-yellow-300">{city.name}</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-xl">
                {city.shortDescription} Secure direct admission in top {city.popularCourses.join(', ')} colleges with 100% placement support.
              </p>
              <div className="flex flex-wrap gap-4">
                <ConsultationButton 
                  label="Book Free Counselling" 
                  className="bg-white text-gray-900 px-8 py-3.5 rounded-xl font-bold hover:bg-gray-100 transition shadow-lg"
                />
              </div>
            </div>
            
            {/* Quick Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                <Building2 className="h-8 w-8 text-yellow-300 mb-3" />
                <div className="text-3xl font-bold mb-1">{city.collegesCount}+</div>
                <div className="text-white/80 text-sm">Top Colleges</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                <GraduationCap className="h-8 w-8 text-yellow-300 mb-3" />
                <div className="text-3xl font-bold mb-1">{city.studentsCount}</div>
                <div className="text-white/80 text-sm">Students Guided</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl col-span-2">
                <BookOpen className="h-8 w-8 text-yellow-300 mb-3" />
                <div className="text-lg font-bold mb-2">Popular Courses</div>
                <div className="flex flex-wrap gap-2">
                  {city.popularCourses.map(course => (
                    <span key={course} className="bg-white/20 px-3 py-1 rounded-full text-sm">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About & Top Colleges Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Education in {city.name}</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{city.content.about}</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Top Colleges in {city.name}</h2>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <ul className="space-y-4">
                  {city.content.topColleges.map((college, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className={`h-6 w-6 mr-3 shrink-0 ${city.theme.textColor}`} />
                      <span className="text-gray-800 font-medium text-lg">{college}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <ConsultationButton 
                    label={`Check Fee Structure for ${city.name} Colleges`}
                    className={`w-full justify-center bg-gradient-to-r ${city.theme.color} text-white py-3 rounded-xl font-semibold`}
                  />
                </div>
              </div>
            </div>
            
            {/* FAQs */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {city.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className={`bg-gradient-to-b ${city.theme.color} p-8 rounded-2xl text-white shadow-xl sticky top-24`}>
              <h3 className="text-2xl font-bold mb-6">Why Choose EduHorizon in {city.name}?</h3>
              <ul className="space-y-5">
                {city.content.whyChooseUs.map((reason, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="bg-white/20 p-1 rounded-full mr-3 shrink-0 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-white/90 leading-snug">{reason}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <p className="text-sm text-white/80 mb-3">Talk to our {city.name} expert directly:</p>
                <a href="tel:+918877434088" className="flex items-center justify-center w-full bg-white text-gray-900 font-bold py-3 rounded-xl hover:bg-gray-50 transition">
                  Call Now: +91 88774 34088
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
