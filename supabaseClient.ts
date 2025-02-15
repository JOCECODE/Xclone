import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vtgiawfxcnkcmbcqydrg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0Z2lhd2Z4Y25rY21iY3F5ZHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1Nzk2MzIsImV4cCI6MjA1NTE1NTYzMn0.yKv_MkFHtkZAsLHgBAHpURp8G73PtVjdwq29RmE8VoE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);