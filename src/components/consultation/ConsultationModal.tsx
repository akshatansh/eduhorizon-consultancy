import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { supabase } from '../../utils/supabase';
import ConsultationForm from './ConsultationForm';
import { sendEmail } from '../../utils/email';
import { sendNotifications } from '../../utils/notifications';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: any) => {
    try {
      setError(null);

      // First, insert into consultation_bookings
      const { error: bookingError } = await supabase
        .from('consultation_bookings')
        .insert([{
          ...formData,
          status: 'pending'
        }]);

      if (bookingError) {
        console.error('Booking error:', bookingError);
        throw new Error('Failed to book consultation');
      }

      // Send confirmation email
      await sendEmail({
        to: formData.email,
        name: formData.name,
        type: 'consultation',
        details: formData
      });

      // Then, send notifications
      const notificationResult = await sendNotifications({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.preferred_date,
        time: formData.preferred_time
      });

      if (!notificationResult.success) {
        console.warn('Notification warning:', notificationResult.message);
      }

      setIsSubmitted(true);
      setTimeout(onClose, 2000);
    } catch (error) {
      console.error('Error booking consultation:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 relative"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Book Your Free Consultation
              </h2>
              <p className="text-gray-600 mb-6">
                Fill in your details and we'll get back to you within 24 hours.
              </p>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              )}

              <ConsultationForm
                onSubmit={handleSubmit}
                isSubmitted={isSubmitted}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}