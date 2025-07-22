import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ppbtswwjdjvoargsfjlv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwYnRzd3dqZGp2b2FyZ3Nmamx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0OTY0NTgsImV4cCI6MjA2ODA3MjQ1OH0.Ju3RJAu7fkeYtk0sdogA65XrnxDHqYa6jzQxL14sB0c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);