import { useState } from 'react';
import { ContactFormData } from '../types/contact';
import { supabaseService } from '../services/supabaseService';
import { isOnline } from '../utils/networkUtils';

interface FormStatus {
  type: 'success' | 'error' | null;
  message: string;
}

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isOnline()) {
      setStatus({
        type: 'error',
        message: 'You appear to be offline. Please check your internet connection.'
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      await supabaseService.submitContactForm(formData);
      
      setStatus({
        type: 'success',
        message: 'Message sent successfully! We\'ll get back to you soon.'
      });
      resetForm();
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
    status
  };
}