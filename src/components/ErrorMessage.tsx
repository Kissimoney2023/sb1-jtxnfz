import React from 'react';
import { XCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-red-50 text-red-800 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 max-w-md animate-slide-up">
      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
      <p className="text-sm flex-grow">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-2 text-red-600 hover:text-red-800"
          aria-label="Close error message"
        >
          <XCircle className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};