import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qzxctuhoygnygbltuwnl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6eGN0dWhveWdueWdibHR1d25sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAwNzczNzUsImV4cCI6MjA0NTY1MzM3NX0.qr56OZnWl-u6qKItdkMzinkjHtRBkNk-rJqe5Iv4PPo';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});