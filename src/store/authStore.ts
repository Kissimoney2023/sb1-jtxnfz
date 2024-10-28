import { create } from 'zustand';
import { supabase } from '../config/supabase';
import { handleError } from '../utils/errorHandler';

interface User {
  id: string;
  email: string;
  isAdmin: boolean;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  initialized: false,

  setUser: (user) => set({ user, initialized: true, loading: false }),

  signIn: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        set({
          user: {
            id: data.user.id,
            email: data.user.email!,
            isAdmin: email === 'admin@example.com',
          },
          loading: false,
          error: null,
        });
      }
    } catch (error) {
      const errorMessage = handleError(error, 'auth.signIn').message;
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  signUp: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        set({
          user: {
            id: data.user.id,
            email: data.user.email!,
            isAdmin: false,
          },
          loading: false,
          error: null,
        });
      }
    } catch (error) {
      const errorMessage = handleError(error, 'auth.signUp').message;
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  signOut: async () => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null, loading: false, error: null });
    } catch (error) {
      const errorMessage = handleError(error, 'auth.signOut').message;
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));