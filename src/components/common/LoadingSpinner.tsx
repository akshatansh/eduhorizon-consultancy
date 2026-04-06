import React from 'react';
import { Loader } from 'lucide-react';

interface LoadingSpinnerProps {
  className?: string;
}

export default function LoadingSpinner({ className = "h-5 w-5" }: LoadingSpinnerProps) {
  return (
    <Loader className={`animate-spin ${className}`} />
  );
}