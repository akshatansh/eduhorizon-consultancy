import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Mail, Phone, BookOpen, Check } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';
import FormInput from '../forms/FormInput';
import FormSelect from '../forms/FormSelect';

interface ConsultationFormProps {
  onSubmit: (formData: any) => Promise<void>;
  isSubmitted?: boolean;
}

const courseOptions = [
  { value: 'btech', label: 'B.Tech' },
  { value: 'mtech', label: 'M.Tech' },
  { value: 'mba', label: 'MBA' },
  { value: 'mca', label: 'MCA' },
  { value: 'bca', label: 'BCA' }
];

const timeSlots = [
  { value: 'morning', label: 'Morning (9 AM - 12 PM)' },
  { value: 'afternoon', label: 'Afternoon (12 PM - 3 PM)' },
  { value: 'evening', label: 'Evening (3 PM - 6 PM)' }
];

export default function ConsultationForm({ onSubmit, isSubmitted = false }: ConsultationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    preferred_date: '',
    preferred_time: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
    } catch (err) {
      setError('Failed to submit form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-center py-8"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Consultation Booked!</h3>
        <p className="text-gray-600">
          We'll send you a confirmation email with all the details.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        icon={<User className="h-5 w-5" />}
      />

      <FormInput
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        icon={<Mail className="h-5 w-5" />}
      />

      <FormInput
        label="Phone"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        required
        icon={<Phone className="h-5 w-5" />}
      />

      <FormSelect
        label="Interested Course"
        name="course"
        value={formData.course}
        onChange={handleChange}
        options={courseOptions}
        required
        icon={<BookOpen className="h-5 w-5" />}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label="Preferred Date"
          name="preferred_date"
          type="date"
          value={formData.preferred_date}
          onChange={handleChange}
          required
          icon={<Calendar className="h-5 w-5" />}
        />

        <FormSelect
          label="Preferred Time"
          name="preferred_time"
          value={formData.preferred_time}
          onChange={handleChange}
          options={timeSlots}
          required
          icon={<Clock className="h-5 w-5" />}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Message (Optional)
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={3}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Any specific questions or requirements?"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <LoadingSpinner className="mr-2" />
            Booking...
          </>
        ) : (
          'Book Consultation'
        )}
      </button>
    </form>
  );
}