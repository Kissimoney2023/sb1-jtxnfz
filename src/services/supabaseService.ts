import { supabase } from '../config/supabase';
import { handleError } from '../utils/errorHandler';
import { retry } from '../utils/networkUtils';

class SupabaseService {
  private static instance: SupabaseService;
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): SupabaseService {
    if (!SupabaseService.instance) {
      SupabaseService.instance = new SupabaseService();
    }
    return SupabaseService.instance;
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      const { error } = await retry(
        async () => await supabase.auth.getSession(),
        3,
        1000
      );

      if (error) throw error;
      this.isInitialized = true;
    } catch (error) {
      throw handleError(error);
    }
  }

  public async submitContactForm(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    try {
      await this.initialize();

      const { error } = await retry(
        async () => 
          await supabase
            .from('contact_messages')
            .insert([
              {
                name: data.name.trim(),
                email: data.email.trim(),
                subject: data.subject.trim(),
                message: data.message.trim(),
                status: 'new'
              }
            ])
            .select()
            .single(),
        3,
        1000
      );

      if (error) throw error;
    } catch (error) {
      throw handleError(error);
    }
  }
}

export const supabaseService = SupabaseService.getInstance();