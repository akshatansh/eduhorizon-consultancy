import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { X } from 'lucide-react';
import FormInput from './forms/FormInput';
import FormSelect from './forms/FormSelect';
import SubmitButton from './forms/SubmitButton';
import SuccessMessage from './forms/SuccessMessage';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const courseOptions = [
  { value: 'btech-cse', label: 'B.Tech - Computer Science Engineering' },
  { value: 'btech-it', label: 'B.Tech - Information Technology' },
  { value: 'btech-ece', label: 'B.Tech - Electronics & Communication' },
  { value: 'btech-me', label: 'B.Tech - Mechanical Engineering' },
  { value: 'btech-ce', label: 'B.Tech - Civil Engineering' },
  { value: 'btech-ee', label: 'B.Tech - Electrical Engineering' },
  { value: 'mtech-cse', label: 'M.Tech - Computer Science Engineering' },
  { value: 'mtech-it', label: 'M.Tech - Information Technology' },
  { value: 'mtech-ece', label: 'M.Tech - Electronics & Communication' },
  { value: 'mba', label: 'MBA' },
  { value: 'mba-hr', label: 'MBA - Human Resources' },
  { value: 'mba-finance', label: 'MBA - Finance' },
  { value: 'mba-marketing', label: 'MBA - Marketing' },
  { value: 'mca', label: 'MCA' },
  { value: 'bca', label: 'BCA' },
  { value: 'bba', label: 'BBA' },
  { value: 'bcom', label: 'B.Com' },
  { value: 'mcom', label: 'M.Com' },
  { value: 'bsc-cs', label: 'B.Sc - Computer Science' },
  { value: 'bsc-it', label: 'B.Sc - Information Technology' },
  { value: 'msc-cs', label: 'M.Sc - Computer Science' },
  { value: 'msc-it', label: 'M.Sc - Information Technology' }
];

interface PopupFormProps {
  isOpen: boolean;
  onSubmit: (formData: any) => Promise<void>;
  onClose: () => void;
}

export default function PopupForm({ isOpen, onSubmit, onClose }: PopupFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
      await onSubmit(formData);
      setIsSubmitted(true);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative"
      >
        {!isSubmitted && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close popup form"
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
        {isSubmitted ? (
          <SuccessMessage
            title="Thank You!"
            message="Your form has been submitted successfully. We'll contact you soon!"
          />
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Welcome to EduHorizon!</h2>
            <p className="text-gray-600 mb-6">
              Fill this form to unlock exclusive educational guidance and counseling services.
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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
              <FormSelect
                label="Interested Course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                options={courseOptions}
                required
              />
              <SubmitButton
                isLoading={isLoading}
                text="Get Started"
                loadingText="Submitting..."
              />
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}