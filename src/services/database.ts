import { prisma } from '../lib/prisma';
import { Prisma } from '@prisma/client';
import { supabase } from '../config/supabase';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  userId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

class DatabaseService {
  async createContactMessage(message: Omit<ContactMessage, 'id' | 'createdAt' | 'updatedAt' | 'status'>) {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: message.name,
            email: message.email,
            subject: message.subject,
            message: message.message,
            status: 'new',
            user_id: message.userId
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Database error:', error);
      throw new Error('Failed to send message. Please try again later.');
    }
  }

  async getContactMessages() {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Database error:', error);
      throw new Error('Failed to fetch messages');
    }
  }

  async updateMessageStatus(id: string, status: string) {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Database error:', error);
      throw new Error('Failed to update message status');
    }
  }
}