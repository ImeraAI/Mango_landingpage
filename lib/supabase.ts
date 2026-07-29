import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://idncmriteqvrwxsxyqkx.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkbmNtcml0ZXF2cnd4c3h5cWt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1OTYzMDQsImV4cCI6MjA5NzE3MjMwNH0.3XzVS8xlMX_o9IOTuiF2Fl6kffldHnaNOBzaWbTjbNM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
