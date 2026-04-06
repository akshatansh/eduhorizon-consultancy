import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import ConsultationModal from './ConsultationModal';

interface ConsultationButtonProps {
  className?: string;
  label?: string;
}

export default function ConsultationButton({ className, label = 'Book Free Consultation' }: ConsultationButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={className || "bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"}
      >
        <Calendar className="h-5 w-5" />
        {label}
      </button>

      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}