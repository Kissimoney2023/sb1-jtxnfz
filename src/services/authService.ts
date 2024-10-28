import { AuthError, User } from '@supabase/supabase-js';
import { supabase } from '../config/supabase';

class AuthService {
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw this.handleError(error);
    return data;
  }

  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
    
    if (error) throw this.handleError(error);
    return data;
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw this.handleError(error);
  }

  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }

  private handleError(error: AuthError): Error {
    console.error('Auth error:', error);
    
    switch (error.message) {
      case 'Invalid login credentials':
        return new Error('Invalid email or password');
      case 'Email not confirmed':
        return new Error('Please verify your email address');
      case 'Rate limit exceeded':
        return new Error('Too many attempts. Please try again later');
      default:
        return new Error('An error occurred. Please try again');
    }
  }
}

export const authService = new AuthService();