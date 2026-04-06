import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function App() {
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
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
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
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>
        <Footer />
        <PopupForm
          isOpen={showPopup && !hasSubmittedForm && !isAdmin}
          onSubmit={handleFormSubmit}
        />
        <WhatsAppButton phoneNumber="+917004221975" />
      </div>
    </Router>
  );
}