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
  const [showPopup, setShowPopup] = useState(false);
  const [hasSubmittedForm, setHasSubmittedForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [dbConnectionStatus, setDbConnectionStatus] = useState<{
    success: boolean;
    message: string;
    error?: string;
  } | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      const status = await testSupabaseConnection();
      setDbConnectionStatus(status);
      if (!status.success) {
        console.error('Database connection error:', status.error);
      }
    };

    checkConnection();
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
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
          title: `Student Success Stories | ${siteName}`,
          description:
            'Read real success stories of students guided by Edu Horizon for admissions, study abroad plans, and career outcomes.',
          robots: 'index, follow',
          image: defaultImage
        };
      }

      if (pathname === '/testimonials') {
        return {
          title: `Testimonials | ${siteName}`,
          description:
            'See what students and parents say about Edu Horizon consultation, counselling quality, and admission support.',
          robots: 'index, follow',
          image: defaultImage
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
        image: defaultImage
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