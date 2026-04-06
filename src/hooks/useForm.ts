import { useState } from 'react';
import { FormData } from '../types/form';

export function useForm(initialState: FormData) {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialState);
    setError(null);
    setIsLoading(false);
  };

  return {
    formData,
    isLoading,
    error,
    isSubmitted,
    setIsLoading,
    setError,
    setIsSubmitted,
    handleChange,
    resetForm
  };
}