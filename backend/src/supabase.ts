import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lpjdplavtuwehpincxsm.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;

export const supabase: SupabaseClient | undefined =
  supabaseKey ? createClient(supabaseUrl, supabaseKey) : undefined;
