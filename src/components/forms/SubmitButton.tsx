import React from 'react';
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  isLoading: boolean;
  text: string;
  loadingText?: string;
}

export default function SubmitButton({
  isLoading,
  text,
  loadingText = 'Submitting...'
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 inline" />
          {loadingText}
        </>
      ) : (
        text
      )}
    </button>
  );
}