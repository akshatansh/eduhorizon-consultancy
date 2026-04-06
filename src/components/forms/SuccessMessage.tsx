import React from 'react';
import { Check } from 'lucide-react';

interface SuccessMessageProps {
  title: string;
  message: string;
}

export default function SuccessMessage({ title, message }: SuccessMessageProps) {
  return (
    <div className="text-center py-8">
      <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
        <Check className="h-6 w-6 text-green-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{message}</p>
    </div>
  );
}