import { ContactFormData } from '../types/contact';
import { supabase } from './supabaseClient';

class ContactError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ContactError';
  }
}

export class ContactService {
  private readonly tableName = 'contact_messages';

  async submitMessage(formData: ContactFormData): Promise<void> {
    try {
      const { error } = await supabase
        .from(this.tableName)
        .insert([{
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          status: 'new'
        }]);

      if (error) {
        console.error('Supabase error:', error);
        throw new ContactError(error.message || 'Failed to send message');
      }
    } catch (error) {
      if (error instanceof ContactError) {
        throw error;
      }
      console.error('Contact service error:', error);
      throw new ContactError('Failed to send message. Please try again later.');
    }
  }
}

export const contactService = new ContactService();