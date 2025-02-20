import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl = "https://tfjtopwgqjhrmcalrcar.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmanRvcHdncWpocm1jYWxyY2FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMzM0NDcsImV4cCI6MjA1NTYwOTQ0N30.lQAU59l8Low7PghSjyJU8h30-RJyMy4-wANyJDnXoJg"

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey);

