import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { testSupabaseConnection } from './utils/supabaseTest';
import { sendEmail } from './utils/email';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Colleges from './pages/Colleges';
import SuccessStories from './pages/SuccessStories';
import TestimonialsPage from './pages/Testimonials';
import Blog from './pages/Blog';
import BlogPost from './components/blog/BlogPost';
import PopupForm from './components/PopupForm';
import WhatsAppButton from './components/WhatsAppButton';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminBlogs from './pages/admin/Blogs';
import AdminCollegesManager from './pages/admin/CollegesManager';
import AdminAccess from './pages/admin/AdminAccess';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import { blogPosts } from './data/blogPosts';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function AppContent() {
  const location = useLocation();
  const isPrerender = typeof navigator !== 'undefined' && navigator.userAgent === 'ReactSnap';
  const [showPopup, setShowPopup] = useState(false);
  const [hasSubmittedForm, setHasSubmittedForm] = useState(false);
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
    const timer = setTimeout(() => {
      if (!hasSubmittedForm && !isAdmin) {
        setShowPopup(true);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [hasSubmittedForm, isAdmin]);

  useEffect(() => {
    const siteName = 'Edu Horizon';
    const siteUrl = 'https://www.eduhorizon.online';
    const defaultImage = `${siteUrl}/EDUHORIZON%20(1).jpg`;
    const pathname = location.pathname;
    const fullUrl = `${siteUrl}${pathname}`;

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
          image: defaultImage
        };
      }

      if (pathname === '/') {
        return {
          title: 'Best Admission Consultancy in Noida | EduHorizon',
          description: 'Direct Admission in Noida Colleges Without Donation',
          robots: 'index, follow',
          image: defaultImage
        };
      }

      if (pathname === '/about') {
        return {
          title: `About ${siteName} | Trusted Education Consultants`,
          description:
            'Learn about Edu Horizon, our mission, and how our expert counselors help students choose the right college and career path.',
          robots: 'index, follow',
          image: defaultImage
        };
      }

      if (pathname === '/colleges') {
        return {
          title: `Top Colleges & Universities | ${siteName}`,
          description:
            'Explore top colleges, courses, fees, and admission guidance with Edu Horizon to find the best-fit institution for your future.',
          robots: 'index, follow',
          image: defaultImage
        };
      }

      if (pathname === '/success-stories') {
        return {
          title: 'Student Success Stories | EduHorizon - Placements from GL Bajaj, GNIOT, IIMT and More',
          description:
            'Read real placement success stories of students admitted to top Greater Noida colleges through EduHorizon. Placements include HCL, JusPay, and Kanini Software with packages up to 27 LPA.',
          robots: 'index, follow',
          image: defaultImage,
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
          title: 'Student Testimonials | EduHorizon Admission Consultancy Reviews - Greater Noida',
          description:
            'Read real student success stories for B.Tech, MBA, and BCA admissions in Greater Noida with EduHorizon expert counselling and end-to-end admission support.',
          robots: 'index, follow',
          image: defaultImage,
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

      if (pathname === '/blog') {
        return {
          title: `Education Blog | ${siteName}`,
          description:
            'Get expert articles on admissions, college selection, career guidance, and student life from Edu Horizon.',
          robots: 'index, follow',
          image: defaultImage
        };
      }

      if (pathname.startsWith('/blog/')) {
        const slug = pathname.split('/blog/')[1] || '';
        const post = blogPosts.find((item) => item.id === slug);
        return {
          title: post ? `${post.title} | ${siteName}` : `Blog Article | ${siteName}`,
          description:
            post?.excerpt ||
            'Read detailed guidance from Edu Horizon on admissions, career planning, and choosing the right college.',
          robots: 'index, follow',
          image: post?.image || defaultImage
        };
      }

      if (pathname === '/privacy-policy') {
        return {
          title: `Privacy Policy | ${siteName}`,
          description: `Read the privacy policy of ${siteName} and understand how we collect and use your information.`,
          robots: 'index, follow',
          image: defaultImage
        };
      }

      if (pathname === '/terms') {
        return {
          title: `Terms & Conditions | ${siteName}`,
          description: `Review the terms and conditions for using ${siteName} services and website.`,
          robots: 'index, follow',
          image: defaultImage
        };
      }

      return {
        title: `${siteName} | Education Consultancy`,
        description:
          'Edu Horizon offers trusted support for admissions, career counselling, and study abroad planning.',
        robots: 'index, follow',
        image: defaultImage,
        structuredData: null
      };
    };

    const seo = getSeoForPath();
    document.title = seo.title;
    setCanonical(fullUrl);
    setMetaByName('description', seo.description);
    setMetaByName('robots', seo.robots);
    setMetaByName('twitter:card', 'summary_large_image');
    setMetaByName('twitter:title', seo.title);
    setMetaByName('twitter:description', seo.description);
    setMetaByName('twitter:image', seo.image);

    setMetaByProperty('og:type', 'website');
    setMetaByProperty('og:site_name', siteName);
    setMetaByProperty('og:title', seo.title);
    setMetaByProperty('og:description', seo.description);
    setMetaByProperty('og:url', fullUrl);
    setMetaByProperty('og:image', seo.image);
    setStructuredData(seo.structuredData || null);
  }, [location.pathname]);

  const handleFormSubmit = async (formData: any) => {
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
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  };

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/colleges" element={<Colleges />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/blogs" element={<AdminBlogs />} />
          <Route path="/admin/colleges" element={<AdminCollegesManager />} />
          <Route path="/admin/access" element={<AdminAccess />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </main>
      {location.pathname.startsWith('/admin') ? null : <Footer />}
      {location.pathname.startsWith('/admin') ? null : (
        <>
          <PopupForm
            isOpen={showPopup && !hasSubmittedForm && !isAdmin}
            onSubmit={handleFormSubmit}
          />
          <WhatsAppButton phoneNumber="+918877434088" />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}