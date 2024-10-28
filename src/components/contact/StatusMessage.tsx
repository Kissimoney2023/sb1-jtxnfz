import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface StatusMessageProps {
  type: 'success' | 'error' | null;
  message: string;
}

export function StatusMessage({ type, message }: StatusMessageProps) {
  if (!type || !message) return null;

  const styles = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200'
  };

  const icons = {
    success: CheckCircle,
    error: AlertCircle
  };

  const Icon = icons[type];

  return (
    <div className={`p-4 mb-4 rounded-lg border ${styles[type]} flex items-start gap-3`}>
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <p className="text-sm">{message}</p>
    </div>
  );
}