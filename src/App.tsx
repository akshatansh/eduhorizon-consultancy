import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { testSupabaseConnection } from './utils/supabaseTest';
import { supabase } from './utils/supabase';
import { sendEmail } from './utils/email';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PopupForm from './components/PopupForm';
import WhatsAppButton from './components/WhatsAppButton';
import { blogPosts } from './data/blogPosts';
import { citiesData } from './data/citiesData';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Colleges = lazy(() => import('./pages/Colleges'));
const Faq = lazy(() => import('./pages/Faq'));
const SuccessStories = lazy(() => import('./pages/SuccessStories'));
const TestimonialsPage = lazy(() => import('./pages/Testimonials'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./components/blog/BlogPost'));
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminBlogs = lazy(() => import('./pages/admin/Blogs'));
const AdminCollegesManager = lazy(() => import('./pages/admin/CollegesManager'));
const AdminFaqs = lazy(() => import('./pages/admin/Faqs'));
const AdminAccess = lazy(() => import('./pages/admin/AdminAccess'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const CitiesWeServe = lazy(() => import('./pages/CitiesWeServe'));
const CityPage = lazy(() => import('./pages/CityPage'));

function BlogRouteShell() {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="mx-auto mb-4 h-10 w-48 rounded-full bg-gray-200 animate-pulse" />
          <div className="mx-auto h-4 w-96 rounded-full bg-gray-200 animate-pulse" />
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8 animate-pulse">
          <div className="h-4 w-72 bg-gray-200 rounded mb-3" />
          <div className="h-4 w-48 bg-gray-200 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-200" />
              <div className="p-6 space-y-4">
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                <div className="h-3 w-full bg-gray-200 rounded" />
                <div className="h-3 w-5/6 bg-gray-200 rounded" />
                <div className="h-3 w-1/2 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface PopupInquiryData {
  name: string;
  email: string;
  phone: string;
  course: string;
}

function AppContent() {
  const location = useLocation();
  const isPrerender = typeof navigator !== 'undefined' && navigator.userAgent === 'ReactSnap';
  const POPUP_SUBMITTED_KEY = 'eduhorizon_popup_submitted';
  const reopenTimerRef = useRef<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [hasSubmittedForm, setHasSubmittedForm] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(POPUP_SUBMITTED_KEY) === 'true';
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [dbConnectionStatus, setDbConnectionStatus] = useState<{
    success: boolean;
    message: string;
    error?: string;
  } | null>(null);

  useEffect(() => {
    if (isPrerender) return;

    const checkConnection = async () => {
      const status = await testSupabaseConnection();
      setDbConnectionStatus(status);
      if (!status.success) {
        console.error('Database connection error:', status.error);
      }
    };

    checkConnection();
    checkAdminStatus();
  }, [isPrerender]);

  const checkAdminStatus = async () => {
    if (isPrerender) return;

    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { data: adminData } = await supabase
        .from('admin_users')
        .select('email')
        .eq('email', session.user.email)
        .single();
      
      setIsAdmin(!!adminData);
    }
  };

  useEffect(() => {
    if (hasSubmittedForm || isAdmin) return;

    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, [hasSubmittedForm, isAdmin]);

  useEffect(() => {
    const siteName = 'Edu Horizon';
    const siteUrl = 'https://www.eduhorizon.online';
    const defaultImage = `${siteUrl}/images/logo.jpg`;
    const normalizePath = (path: string) => {
      if (!path) return '/';
      const clean = path.startsWith('/') ? path : `/${path}`;
      if (clean !== '/' && clean.endsWith('/')) return clean.slice(0, -1);
      return clean;
    };

    const isKnownStaticPath = (path: string) =>
      ['/', '/about', '/colleges', '/success-stories', '/testimonials', '/blog', '/privacy-policy', '/terms', '/cities-we-serve'].includes(path);

    const normalizedPathname = normalizePath(location.pathname);
    const pathname = normalizedPathname;
    const fullUrl = `${siteUrl}${pathname}`;
    const dynamicBlogMatch = pathname.match(/^\/blog\/([^/]+)$/);
    const blogSlug = dynamicBlogMatch?.[1] || '';
    const hasKnownSeedBlog = blogPosts.some((item) => item.id === blogSlug);
    
    // Check if it's a dynamic city route
    const dynamicCityMatch = pathname.match(/^\/best-admission-consultation-in-([^/]+)$/);
    
    const isKnownRoute =
      isKnownStaticPath(pathname) ||
      pathname.startsWith('/admin') ||
      (Boolean(dynamicBlogMatch) && hasKnownSeedBlog) ||
      Boolean(dynamicCityMatch);

    const setMetaByName = (name: string, content: string) => {
      let tag = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    const setMetaByProperty = (property: string, content: string) => {
      let tag = document.head.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    const setCanonical = (url: string) => {
      let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', url);
    };

    const setStructuredData = (data: object | null) => {
      const scriptId = 'seo-structured-data';
      const existing = document.getElementById(scriptId);
      if (existing) {
        existing.remove();
      }

      if (!data) return;

      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
    };

    const getSeoForPath = () => {
      if (pathname.startsWith('/admin')) {
        return {
          title: `Admin Panel | ${siteName}`,
          description: 'Secure admin dashboard for Edu Horizon content and access management.',
          robots: 'noindex, nofollow',
          image: defaultImage,
          keywords: '',
          ogType: 'website' as const
        };
      }

      if (pathname === '/') {
        return {
          title: 'Best Admission Consultancy in India | B.Tech, MBA & Medical Guidance | EduHorizon',
          description:
            'Get expert admission guidance for B.Tech, MBA, BCA, MBBS, and other courses across India. Compare top colleges in Delhi NCR, UP, Bihar, Pune, Bangalore. Direct admission support.',
          robots: 'index, follow',
          image: defaultImage,
          keywords:
            'admission consultancy india, direct admission noida, top engineering admission, mba admission consultants, best education consultant, direct admission in b.tech, bca admission, college counselling ncr, mbbs admission guidance, direct admission in greater noida, best admission consultancy in patna',
          ogType: 'website' as const,
          structuredData: [
            {
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              '@id': `${siteUrl}/#organization`,
              name: 'EduHorizon Admission Consultancy',
              alternateName: 'EduHorizon',
              url: siteUrl,
              logo: defaultImage,
              image: defaultImage,
              description: 'EduHorizon is India\'s trusted admission consultancy helping students secure direct admissions in top B.Tech, MBA, BCA, MBBS colleges across Noida, Greater Noida, Delhi NCR, Patna and 12+ cities.',
              foundingDate: '2018',
              founder: {
                '@type': 'Person',
                name: 'Akshat Ansh',
                jobTitle: 'Founder & Lead Education Counsellor'
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Greater Noida',
                addressRegion: 'Uttar Pradesh',
                addressCountry: 'IN'
              },
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Admission Counselling',
                availableLanguage: ['Hindi', 'English']
              },
              areaServed: [
                'Noida', 'Greater Noida', 'Delhi', 'Patna', 'Ghaziabad',
                'Lucknow', 'Agra', 'Meerut', 'Kanpur', 'Varanasi',
                'Prayagraj', 'Faridabad'
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Admission Consultancy Services',
                itemListElement: [
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'B.Tech Admission Guidance', description: 'Expert guidance for B.Tech admissions in top AKTU, IPU and private engineering colleges.' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'MBA Admission Counselling', description: 'MBA admission support for top business schools in Delhi NCR and across India.' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'BCA/MCA Admission Support', description: 'Direct admission assistance in BCA and MCA programs at top universities.' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Medical College Guidance', description: 'NEET counselling and admission guidance for MBBS, BDS and medical courses.' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Career Counselling', description: 'Personalized career mapping, aptitude analysis and course selection guidance.' } }
                ]
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '500',
                bestRating: '5'
              },
              sameAs: [siteUrl]
            },
            {
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'EduHorizon Admission Consultancy',
              image: defaultImage,
              url: siteUrl,
              telephone: '+918877434088',
              priceRange: 'Free Consultation',
              openingHours: 'Mo-Sa 09:00-19:00',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Urbtech NPX, Sector-153',
                addressLocality: 'Noida',
                addressRegion: 'Uttar Pradesh',
                postalCode: '201310',
                addressCountry: 'IN'
              },
              areaServed: [
                'Noida', 'Greater Noida', 'Delhi', 'Patna', 'Lucknow',
                'Ghaziabad', 'Agra', 'Meerut', 'Kanpur', 'Varanasi',
                'Prayagraj', 'Faridabad'
              ]
            },
            {
              '@context': 'https://schema.org',
              '@type': 'HowTo',
              name: 'How to Get Admission in Top Colleges through EduHorizon',
              description: 'Step-by-step process to get college admission guidance from EduHorizon consultancy.',
              step: [
                { '@type': 'HowToStep', position: 1, name: 'Book Free Counselling', text: 'Call or WhatsApp EduHorizon at +91 88774 34088. Our counsellor will schedule a free session to understand your academic background, budget and career goals.' },
                { '@type': 'HowToStep', position: 2, name: 'College Shortlisting', text: 'Our expert prepares a personalised college list comparing fees, placement records, NIRF rankings and course options for your profile.' },
                { '@type': 'HowToStep', position: 3, name: 'Application & Documentation', text: 'EduHorizon helps complete application forms, prepare documents and submit them to the college admission office on time.' },
                { '@type': 'HowToStep', position: 4, name: 'Admission Confirmation', text: 'Our team coordinates with the college to confirm your seat, guide on fee payment, and support you until admission is fully secured.' }
              ]
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': `${siteUrl}/#website`,
              url: siteUrl,
              name: 'EduHorizon',
              description: 'India\'s trusted admission consultancy for B.Tech, MBA, BCA, MBBS colleges.',
              publisher: { '@id': `${siteUrl}/#organization` },
              potentialAction: {
                '@type': 'SearchAction',
                target: `${siteUrl}/colleges?search={search_term_string}`,
                'query-input': 'required name=search_term_string'
              }
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What is EduHorizon?',
                  acceptedAnswer: { '@type': 'Answer', text: 'EduHorizon is a leading admission consultancy in India, headquartered in Greater Noida. We help students secure direct admissions in top B.Tech, MBA, BCA, and MBBS colleges across Delhi NCR, Bihar, UP and 12+ cities since 2018.' }
                },
                {
                  '@type': 'Question',
                  name: 'How does EduHorizon help with college admissions?',
                  acceptedAnswer: { '@type': 'Answer', text: 'EduHorizon provides free counselling, college comparison, campus visits, fee negotiation, and end-to-end admission support. Our expert counsellors analyse your profile, budget and career goals to recommend the best-fit colleges.' }
                },
                {
                  '@type': 'Question',
                  name: 'Which cities does EduHorizon operate in?',
                  acceptedAnswer: { '@type': 'Answer', text: 'EduHorizon serves students from Noida, Greater Noida, Delhi, Patna, Ghaziabad, Lucknow, Agra, Meerut, Kanpur, Varanasi, Prayagraj, and Faridabad — covering 12+ major cities across India.' }
                },
                {
                  '@type': 'Question',
                  name: 'Is EduHorizon free to use?',
                  acceptedAnswer: { '@type': 'Answer', text: 'Yes, EduHorizon provides free initial counselling and college comparison. Our counsellors help you understand fee structures, placement records and course options at no charge before you decide.' }
                },
                {
                  '@type': 'Question',
                  name: 'What courses does EduHorizon help with?',
                  acceptedAnswer: { '@type': 'Answer', text: 'EduHorizon provides admission guidance for B.Tech (Computer Science, Mechanical, Civil, etc.), MBA, BCA, MCA, MBBS, BDS, B.Pharm, Law (LLB), BBA, and Polytechnic courses across top colleges in India.' }
                },
                {
                  '@type': 'Question',
                  name: 'What is the success rate of EduHorizon?',
                  acceptedAnswer: { '@type': 'Answer', text: 'EduHorizon has a 95% admission success rate, having guided 1000+ students to top colleges in Greater Noida, Delhi NCR and across India. Our students have secured placements at HCL, JusPay, TCS and other top companies with packages up to 27 LPA.' }
                }
              ]
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              speakable: {
                '@type': 'SpeakableSpecification',
                cssSelector: ['h1', '.hero-description', '.stats-section']
              },
              name: 'EduHorizon - Best Admission Consultancy in India',
              url: siteUrl
            }
          ]
        };
      }

      if (pathname === '/about') {
        return {
          title: `About ${siteName} | Trusted Education Consultants in India`,
          description:
            'Learn about Edu Horizon, our mission, and how our expert counselors help students choose the right college and career path for engineering, management, and medical fields.',
          robots: 'index, follow',
          image: defaultImage,
          keywords:
            'about eduhorizon, education consultants india, admission guidance experts, career counselling, top noida consultancy, patna admission consultant, engineering admission guide',
          ogType: 'website' as const
        };
      }

      if (pathname === '/colleges') {
        return {
          title: 'Top Colleges in Greater Noida 2026 | B.Tech, MBA, BCA Admissions | EduHorizon',
          description:
            'Explore top engineering, MBA and BCA colleges in Greater Noida — GNIOT, IIMT, Mangalmay, GL Bajaj, NIET, KCC and more. Compare fees, courses, NIRF ranks and get free admission guidance from EduHorizon.',
          robots: 'index, follow',
          image: defaultImage,
          keywords:
            'top colleges in Greater Noida, engineering colleges Greater Noida, MBA colleges Greater Noida, B.Tech admission 2026 Greater Noida, GNIOT admission, IIMT college fees, Mangalmay institute, GL Bajaj B.Tech, NIET Greater Noida, college admission consultancy Greater Noida',
          ogType: 'website' as const,
          structuredData: [
            {
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'Top Colleges in Greater Noida 2026',
              description:
                'List of top engineering, MBA and BCA colleges in Greater Noida with admission guidance by EduHorizon consultancy.',
              numberOfItems: 6,
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  item: {
                    '@type': 'CollegeOrUniversity',
                    name: 'Greater Noida Institute of Technology (GNIOT)',
                    description:
                      'GNIOT is an AICTE-approved, AKTU-affiliated engineering college in Greater Noida offering B.Tech, M.Tech, MBA and MCA programs with strong placement records.',
                    url: 'https://www.gniot.edu.in',
                    address: {
                      '@type': 'PostalAddress',
                      addressLocality: 'Greater Noida',
                      addressRegion: 'Uttar Pradesh',
                      addressCountry: 'IN'
                    },
                    foundingDate: '1999'
                  }
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  item: {
                    '@type': 'CollegeOrUniversity',
                    name: 'IIMT College of Engineering',
                    description:
                      'IIMT College of Engineering Greater Noida is known for its innovative teaching methods, strong industry connections and excellent placement in top MNCs.',
                    url: 'https://www.iimtindia.net',
                    address: {
                      '@type': 'PostalAddress',
                      addressLocality: 'Greater Noida',
                      addressRegion: 'Uttar Pradesh',
                      addressCountry: 'IN'
                    },
                    foundingDate: '1994'
                  }
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  item: {
                    '@type': 'CollegeOrUniversity',
                    name: 'Mangalmay Institute of Engineering & Technology',
                    description:
                      'Mangalmay Institute Greater Noida focuses on holistic student development with emphasis on practical learning, personality development and placement training.',
                    url: 'https://www.mangalmay.org',
                    address: {
                      '@type': 'PostalAddress',
                      addressLocality: 'Greater Noida',
                      addressRegion: 'Uttar Pradesh',
                      addressCountry: 'IN'
                    },
                    foundingDate: '1996'
                  }
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  item: {
                    '@type': 'CollegeOrUniversity',
                    name: 'GL Bajaj Institute of Technology & Management',
                    description:
                      'GL Bajaj is a top-ranked engineering and management institute in Greater Noida known for strong placements and industry-aligned curriculum.',
                    url: 'https://www.glbajaj.org',
                    address: {
                      '@type': 'PostalAddress',
                      addressLocality: 'Greater Noida',
                      addressRegion: 'Uttar Pradesh',
                      addressCountry: 'IN'
                    }
                  }
                },
                {
                  '@type': 'ListItem',
                  position: 5,
                  item: {
                    '@type': 'CollegeOrUniversity',
                    name: 'NIET — Noida Institute of Engineering & Technology',
                    description:
                      'NIET is a prominent AKTU-affiliated institute in Greater Noida offering B.Tech, M.Tech and MBA with modern infrastructure and placement support.',
                    url: 'https://www.niet.co.in',
                    address: {
                      '@type': 'PostalAddress',
                      addressLocality: 'Greater Noida',
                      addressRegion: 'Uttar Pradesh',
                      addressCountry: 'IN'
                    },
                    foundingDate: '2001'
                  }
                },
                {
                  '@type': 'ListItem',
                  position: 6,
                  item: {
                    '@type': 'CollegeOrUniversity',
                    name: 'KCC Institute of Technology & Management',
                    description:
                      'KCC is a popular choice for BCA, B.Tech and MBA admission in Greater Noida with affordable fees and career guidance support.',
                    url: 'https://www.kccitm.edu.in',
                    address: {
                      '@type': 'PostalAddress',
                      addressLocality: 'Greater Noida',
                      addressRegion: 'Uttar Pradesh',
                      addressCountry: 'IN'
                    }
                  }
                }
              ]
            },
            {
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'EduHorizon Admission Consultancy',
              url: siteUrl,
              description: 'EduHorizon helps students find and secure admissions in top colleges in Greater Noida, Delhi NCR and India.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Greater Noida',
                addressRegion: 'Uttar Pradesh',
                addressCountry: 'IN'
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '500',
                bestRating: '5'
              }
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
                { '@type': 'ListItem', position: 2, name: 'Colleges in Greater Noida', item: `${siteUrl}/colleges` }
              ]
            }
          ]
        };
      }

      if (pathname === '/success-stories') {
        return {
          title: 'Student Success Stories & Placements | EduHorizon',
          description:
            'Read real placement success stories of students admitted to top colleges through EduHorizon. Excellent placements in HCL, JusPay, TCS, and more with high packages.',
          robots: 'index, follow',
          image: defaultImage,
          keywords: 'eduhorizon success stories, student placements, b.tech placements ncr, highest package greater noida colleges, mba placement stories, direct admission success',
          structuredData: [
            {
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'EduHorizon Student Success Stories',
              description:
                'Real placement success stories of students who secured top college admissions in Greater Noida through EduHorizon admission consultancy.',
              numberOfItems: 6,
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  item: {
                    '@type': 'Person',
                    name: 'Nikunj Gupta',
                    description:
                      'B.Tech CSE student admitted to GL Bajaj Institute of Technology, Greater Noida through EduHorizon. Placed at JusPay with 27 LPA package.',
                    alumniOf: {
                      '@type': 'CollegeOrUniversity',
                      name: 'GL Bajaj Institute of Technology',
                      address: { '@type': 'PostalAddress', addressLocality: 'Greater Noida' }
                    }
                  }
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  item: {
                    '@type': 'Person',
                    name: 'Priya Gupta',
                    description:
                      'Admitted to GNIOT Greater Noida top branch through EduHorizon. Placed at Kanini Software with 8.5 LPA package.',
                    alumniOf: { '@type': 'CollegeOrUniversity', name: 'GNIOT Greater Noida' }
                  }
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  item: {
                    '@type': 'Person',
                    name: 'Amit Kumar',
                    description:
                      'Secured B.Tech admission at IIMT College of Engineering through EduHorizon counselling. Placed at HCL Technologies with 8.2 LPA.',
                    alumniOf: {
                      '@type': 'CollegeOrUniversity',
                      name: 'IIMT College of Engineering',
                      address: { '@type': 'PostalAddress', addressLocality: 'Greater Noida' }
                    }
                  }
                }
              ]
            },
            {
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'EduHorizon Admission Consultancy',
              url: siteUrl,
              description:
                'EduHorizon is Greater Noida’s leading admission consultancy helping students secure B.Tech, MBA, and BCA admissions in top colleges with placement support.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Greater Noida',
                addressRegion: 'Uttar Pradesh',
                addressCountry: 'IN'
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '500',
                bestRating: '5'
              }
            }
          ]
        };
      }

      if (pathname === '/testimonials') {
        return {
          title: 'Student Testimonials & Reviews | EduHorizon Admission Consultancy',
          description:
            'Read authentic student reviews for B.Tech, MBA, and BCA admissions with EduHorizon. See why thousands of students trust our expert career counselling.',
          robots: 'index, follow',
          image: defaultImage,
          keywords: 'eduhorizon reviews, eduhorizon student testimonials, admission consultancy reviews, best education consultant feedback, greater noida college reviews',
          structuredData: {
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'EduHorizon Admission Consultancy',
            url: siteUrl,
            description:
              'EduHorizon is a trusted admission consultancy in Greater Noida helping students secure admissions in top B.Tech, MBA, BCA, and other professional colleges across India.',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Greater Noida',
              addressRegion: 'Uttar Pradesh',
              addressCountry: 'IN'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '200',
              bestRating: '5'
            },
            review: [
              {
                '@type': 'Review',
                author: { '@type': 'Person', name: 'Neha Singh' },
                reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
                reviewBody:
                  "EduHorizon's deep knowledge of Greater Noida engineering colleges helped me secure admission in GL Bajaj Institute for B.Tech CSE. Their step-by-step admission guidance and counselling was truly exceptional.",
                datePublished: '2025-09-10'
              },
              {
                '@type': 'Review',
                author: { '@type': 'Person', name: 'Arjun Reddy' },
                reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
                reviewBody:
                  "The team's expertise in Greater Noida's top MBA colleges made my admission process smooth. EduHorizon's placement preparation and career counselling helped me get into GNIOT with confidence.",
                datePublished: '2025-09-18'
              },
              {
                '@type': 'Review',
                author: { '@type': 'Person', name: 'Priya Sharma' },
                reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
                reviewBody:
                  "I'm grateful for EduHorizon's guidance in choosing IIMT College for B.Tech ECE. Their counselling sessions helped me understand my career path and choose the right branch.",
                datePublished: '2025-10-02'
              },
              {
                '@type': 'Review',
                author: { '@type': 'Person', name: 'Rohit Kumar' },
                reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
                reviewBody:
                  "The personalized attention and career mapping at EduHorizon made my BCA college selection much easier. I got admitted to KCC Institute with a scholarship and full guidance support.",
                datePublished: '2025-10-15'
              },
              {
                '@type': 'Review',
                author: { '@type': 'Person', name: 'Ananya Verma' },
                reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
                reviewBody:
                  "Thanks to EduHorizon's counselling, I found the perfect B.Tech IT course at ITS Engineering College. Their document guidance and admission support was incredible.",
                datePublished: '2025-11-05'
              },
              {
                '@type': 'Review',
                author: { '@type': 'Person', name: 'Karan Singh' },
                reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
                reviewBody:
                  'The mock interviews and personality development sessions at EduHorizon boosted my confidence. I got into NIET for MBA and felt fully prepared throughout the process.',
                datePublished: '2025-11-20'
              }
            ]
          }
        };
      }

      if (pathname === '/faq') {
        return {
          title: 'Frequently Asked Questions | College Admissions | EduHorizon',
          description: 'Get answers to common queries regarding college admissions, management quota, fee structures, and counselling processes across India.',
          robots: 'index, follow',
          image: defaultImage,
          keywords: 'admission faqs, college admission questions, direct admission faq, management quota queries, eduhorizon faqs',
          ogType: 'website' as const,
          structuredData: [
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What is direct admission in engineering colleges?',
                  acceptedAnswer: { '@type': 'Answer', text: 'Direct admission means getting a seat in an engineering college without going through the standard counselling process. Many private colleges in Noida and Greater Noida offer management quota seats where students can get direct admission based on 12th marks or entrance exam scores. EduHorizon helps students secure these seats at the best possible fee structure.' }
                },
                {
                  '@type': 'Question',
                  name: 'How much does B.Tech admission cost in Greater Noida?',
                  acceptedAnswer: { '@type': 'Answer', text: 'B.Tech fees in Greater Noida colleges typically range from ₹60,000 to ₹2,50,000 per year depending on the college and branch. Top colleges like GL Bajaj, GNIOT, and IIMT offer competitive fees. EduHorizon provides free fee comparison and helps negotiate the best fee structure for students.' }
                },
                {
                  '@type': 'Question',
                  name: 'Which are the best engineering colleges in Noida and Greater Noida?',
                  acceptedAnswer: { '@type': 'Answer', text: 'The top engineering colleges in the Noida-Greater Noida region include JIIT Noida, Amity University, GL Bajaj Institute, GNIOT, IIMT College of Engineering, NIET, and Galgotias University. These colleges are AKTU/AICTE approved and offer excellent placements with packages ranging from 4-27 LPA.' }
                },
                {
                  '@type': 'Question',
                  name: 'Can I get admission without entrance exam?',
                  acceptedAnswer: { '@type': 'Answer', text: 'Yes, many private colleges in Greater Noida and Delhi NCR accept students based on 12th marks without requiring JEE or other entrance exams. Management quota and direct admission seats are available. Contact EduHorizon for personalized guidance on colleges offering such admissions.' }
                },
                {
                  '@type': 'Question',
                  name: 'Does EduHorizon charge any fee for counselling?',
                  acceptedAnswer: { '@type': 'Answer', text: 'EduHorizon provides free initial counselling, college comparison, and career guidance. Students can visit our office or connect online to get expert advice on college selection, fee comparison, and admission processes without any charges.' }
                },
                {
                  '@type': 'Question',
                  name: 'What is management quota admission?',
                  acceptedAnswer: { '@type': 'Answer', text: 'Management quota is a percentage of seats reserved by private colleges for direct admission. These seats are filled without the regular counselling process. Students need to meet minimum eligibility criteria and pay the prescribed fee. EduHorizon helps students understand and avail management quota seats at genuine fees without any donation.' }
                }
              ]
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              speakable: {
                '@type': 'SpeakableSpecification',
                cssSelector: ['h1', '.faq-question', '.faq-answer']
              },
              name: 'EduHorizon FAQ - College Admission Questions Answered',
              url: `${siteUrl}/faq`
            }
          ]
        };
      }

      if (pathname === '/blog') {
        const postsForSchema = blogPosts
          .slice()
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 20);

        return {
          title: `Education Blog: Admissions, Colleges & Career Guidance | ${siteName}`,
          description:
            'Read expert blog articles on college admissions, B.Tech and MBA choices, fees, counselling and career planning for Noida, Greater Noida and across India.',
          robots: 'index, follow',
          image: defaultImage,
          keywords: 'education blog, admission guidance, college counselling, career guidance',
          ogType: 'website' as const,
          structuredData: [
            {
              '@context': 'https://schema.org',
              '@type': 'Blog',
              name: `EduHorizon Blog`,
              url: `${siteUrl}/blog`,
              description:
                'Expert articles on admissions, college selection, career guidance, and student life from EduHorizon.',
              publisher: {
                '@type': 'Organization',
                name: 'EduHorizon',
                url: siteUrl
              }
            },
            {
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'EduHorizon Blog Posts',
              numberOfItems: postsForSchema.length,
              itemListElement: postsForSchema.map((p, idx) => ({
                '@type': 'ListItem',
                position: idx + 1,
                item: {
                  '@type': 'BlogPosting',
                  headline: p.title,
                  description: p.excerpt,
                  url: `${siteUrl}/blog/${p.id}`,
                  image: p.image || defaultImage,
                  datePublished: p.date,
                  author: {
                    '@type': 'Person',
                    name: p.author?.name || 'EduHorizon Team'
                  }
                }
              }))
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
                { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` }
              ]
            }
          ]
        };
      }

      if (pathname.startsWith('/blog/')) {
        const slug = pathname.split('/blog/')[1] || '';
        const post = blogPosts.find((item) => item.id === slug);

        const keywordsFromTags =
          post?.tags && post.tags.length > 0 ? Array.from(new Set(post.tags)).join(', ') : '';

        return {
          title: post ? `${post.title} | ${siteName}` : `Blog Article | ${siteName}`,
          description:
            post?.excerpt ||
            'Read detailed guidance from Edu Horizon on admissions, career planning, and choosing the right college.',
          robots: 'index, follow',
          image: post?.image || defaultImage,
          keywords: keywordsFromTags
            ? `${keywordsFromTags}, admission guidance, college selection, career guidance`
            : 'admission guidance, college selection, career guidance',
          ogType: 'article' as const,
          structuredData: post
            ? [
                {
                  '@context': 'https://schema.org',
                  '@type': 'BlogPosting',
                  mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': `${siteUrl}/blog/${post.id}`
                  },
                  headline: post.title,
                  description: post.excerpt,
                  image: [post.image || defaultImage],
                  author: {
                    '@type': 'Person',
                    name: post.author?.name || 'EduHorizon Team'
                  },
                  publisher: {
                    '@type': 'Organization',
                    name: 'EduHorizon',
                    url: siteUrl,
                    logo: {
                      '@type': 'ImageObject',
                      url: defaultImage
                    }
                  },
                  datePublished: post.date,
                  dateModified: post.date
                },
                {
                  '@context': 'https://schema.org',
                  '@type': 'BreadcrumbList',
                  itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
                    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
                    {
                      '@type': 'ListItem',
                      position: 3,
                      name: post.title,
                      item: `${siteUrl}/blog/${post.id}`
                    }
                  ]
                }
              ]
            : null
        };
      }

      if (pathname === '/cities-we-serve') {
        return {
          title: 'Cities We Serve | EduHorizon - Admission Consultancy Across India',
          description:
            'EduHorizon provides expert admission guidance in Noida, Greater Noida, Patna, Delhi, Lucknow, Kanpur, Varanasi, Agra, Meerut, Ghaziabad and more cities across India.',
          robots: 'index, follow',
          image: defaultImage,
          keywords:
            'admission consultancy cities india, eduhorizon noida, eduhorizon patna, eduhorizon delhi, cities we serve, admission guidance india',
          ogType: 'website' as const,
          structuredData: [
            {
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'EduHorizon Admission Consultancy',
              url: siteUrl,
              description:
                'EduHorizon provides admission counselling across 12+ cities including Noida, Greater Noida, Patna, Delhi, Lucknow and more.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Greater Noida',
                addressRegion: 'Uttar Pradesh',
                addressCountry: 'IN'
              },
              areaServed: [
                'Noida', 'Greater Noida', 'Patna', 'Delhi', 'Ghaziabad',
                'Lucknow', 'Agra', 'Meerut', 'Kanpur', 'Varanasi',
                'Prayagraj', 'Faridabad'
              ]
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
                { '@type': 'ListItem', position: 2, name: 'Cities We Serve', item: `${siteUrl}/cities-we-serve` }
              ]
            }
          ]
        };
      }

      if (pathname === '/privacy-policy') {
        return {
          title: `Privacy Policy | ${siteName}`,
          description: `Read the privacy policy of ${siteName} and understand how we collect and use your information.`,
          robots: 'index, follow',
          image: defaultImage,
          keywords: 'privacy policy, eduhorizon privacy',
          ogType: 'website' as const
        };
      }

      if (pathname === '/terms') {
        return {
          title: `Terms & Conditions | ${siteName}`,
          description: `Review the terms and conditions for using ${siteName} services and website.`,
          robots: 'index, follow',
          image: defaultImage,
          keywords: 'terms and conditions, eduhorizon terms',
          ogType: 'website' as const
        };
      }

      if (pathname.startsWith('/best-admission-consultation-in-')) {
        const slug = pathname.split('/best-admission-consultation-in-')[1] || '';
        const city = citiesData.find(c => c.slug === slug);

        if (city) {
          return {
            title: city.seo.title,
            description: city.seo.description,
            robots: 'index, follow',
            image: defaultImage,
            keywords: city.seo.keywords,
            ogType: 'website' as const,
            structuredData: [
              {
                '@context': 'https://schema.org',
                '@type': 'EducationalOrganization',
                name: `EduHorizon Admission Consultancy ${city.name}`,
                description: city.seo.description,
                url: `${siteUrl}/best-admission-consultation-in-${city.slug}`,
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
              },
              {
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
              }
            ]
          };
        }
      }

      return {
        title: `Page Not Found | ${siteName}`,
        description:
          'The page you are looking for could not be found. Explore EduHorizon services and admission guidance from the main pages.',
        robots: 'noindex, follow',
        image: defaultImage,
        keywords: '',
        structuredData: null,
        ogType: 'website' as const
      };
    };

    const seo = getSeoForPath();
    document.title = seo.title;
    setCanonical(isKnownRoute ? fullUrl : `${siteUrl}/`);
    setMetaByName('description', seo.description);
    setMetaByName('keywords', seo.keywords || '');
    setMetaByName('robots', seo.robots);
    setMetaByName('twitter:card', 'summary_large_image');
    setMetaByName('twitter:title', seo.title);
    setMetaByName('twitter:description', seo.description);
    setMetaByName('twitter:image', seo.image);

    setMetaByProperty('og:type', seo.ogType || 'website');
    setMetaByProperty('og:site_name', siteName);
    setMetaByProperty('og:title', seo.title);
    setMetaByProperty('og:description', seo.description);
    setMetaByProperty('og:url', isKnownRoute ? fullUrl : `${siteUrl}/`);
    setMetaByProperty('og:image', seo.image);
    setStructuredData(seo.structuredData || null);
  }, [location.pathname]);

  const handleFormSubmit = async (formData: PopupInquiryData) => {
    try {
      const { error } = await supabase
        .from('popup_inquiries')
        .insert([formData]);

      if (error) throw error;

      // Send confirmation email
      await sendEmail({
        to: formData.email,
        name: formData.name,
        type: 'inquiry',
        details: formData
      });

      setHasSubmittedForm(true);
      setShowPopup(false);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(POPUP_SUBMITTED_KEY, 'true');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    if (hasSubmittedForm || isAdmin) return;

    if (reopenTimerRef.current) {
      window.clearTimeout(reopenTimerRef.current);
    }

    reopenTimerRef.current = window.setTimeout(() => {
      setShowPopup((current) => {
        if (current || hasSubmittedForm || isAdmin) return current;
        return true;
      });
      reopenTimerRef.current = null;
    }, 10000);
  };

  useEffect(() => {
    return () => {
      if (reopenTimerRef.current) {
        window.clearTimeout(reopenTimerRef.current);
      }
    };
  }, []);

  if (dbConnectionStatus && !dbConnectionStatus.success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Connection Error</h1>
          <p className="text-gray-600 mb-4">
            Unable to connect to the database. Please make sure you have:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Clicked the "Connect to Supabase" button</li>
            <li>Completed the Supabase project setup</li>
            <li>Valid environment variables in your .env file</li>
          </ul>
          <p className="text-gray-600">
            Error details: {dbConnectionStatus.error || 'Unknown error'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/** Hide user-side shell on admin routes */}
      {location.pathname.startsWith('/admin') ? null : <Navbar />}
      <main className="flex-grow">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/colleges" element={<Colleges />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route
            path="/blog"
            element={
              <Suspense fallback={<BlogRouteShell />}>
                <Blog />
              </Suspense>
            }
          />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/blogs" element={<AdminBlogs />} />
            <Route path="/admin/colleges" element={<AdminCollegesManager />} />
            <Route path="/admin/faqs" element={<AdminFaqs />} />
            <Route path="/admin/access" element={<AdminAccess />} />
            <Route path="/cities-we-serve" element={<CitiesWeServe />} />
            {/* React Router v6 does not support partial params like /prefix-:id. We explicitly map them. */}
            {citiesData.map((city) => (
              <Route 
                key={city.slug} 
                path={`/best-admission-consultation-in-${city.slug}`} 
                element={<CityPage />} 
              />
            ))}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route
              path="*"
              element={
                <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-4 py-16">
                  <div className="max-w-2xl w-full bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Page Not Found</h1>
                    <p className="mt-3 text-gray-600">
                      This page does not exist. Explore our admission guidance pages and continue your college search.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <a
                        href="/"
                        className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-white font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Go to Home
                      </a>
                      <a
                        href="/colleges"
                        className="inline-flex items-center rounded-lg border border-gray-300 px-5 py-2.5 text-gray-700 font-semibold hover:border-blue-500 hover:text-blue-700 transition-colors"
                      >
                        Browse Colleges
                      </a>
                    </div>
                  </div>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </main>
      {location.pathname.startsWith('/admin') ? null : <Footer />}
      {location.pathname.startsWith('/admin') ? null : (
        <>
          <PopupForm
            isOpen={showPopup && !hasSubmittedForm && !isAdmin}
            onSubmit={handleFormSubmit}
            onClose={handlePopupClose}
          />
          <WhatsAppButton phoneNumber="+918877434088" />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContent />
    </Router>
  );
}