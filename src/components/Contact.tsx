import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import FormInput from './forms/FormInput';
import SubmitButton from './forms/SubmitButton';
import SuccessMessage from './forms/SuccessMessage';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error: submitError } = await supabase
        .from('contact_messages')
        .insert([formData]);

      if (submitError) throw submitError;

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Contact EduHorizon Admission Experts</h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl">
              Have questions about college admission in Noida or Greater Noida? Share your details and our counselling
              team will contact you with a personalized admission plan.
            </p>
            
            <div className="mt-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <Mail className="h-6 w-6 text-blue-600" />
                <span className="text-gray-600 break-words">info@eduhorizon.online</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <Phone className="h-6 w-6 text-blue-600" />
                <span className="text-gray-600">+91 8877434088</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <MapPin className="h-6 w-6 text-blue-600" />
                <span className="text-gray-600 break-words">Urbtech NPX, Sector-153, NOIDA, Gautam Buddha Nagar, Uttar Pradesh, India - 201310</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg">
            {isSubmitted ? (
              <SuccessMessage
                title="Message Sent!"
                message="Thank you for contacting us. We'll get back to you soon!"
              />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                  </div>
                )}

                <FormInput
                  label="Name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <FormInput
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full min-h-[120px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  ></textarea>
                </div>

                <SubmitButton
                  isLoading={isLoading}
                  text="Send Message"
                  loadingText="Sending..."
                  className="w-full"
                />
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}