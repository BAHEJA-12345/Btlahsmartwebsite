import { createClient as createSupabaseClient } from 'npm:@supabase/supabase-js@2';
import { projectId, publicAnonKey } from './info';

let supabaseClient: any = null;

export function createClient() {
  if (supabaseClient) {
    return supabaseClient;
  }

  const supabaseUrl = `https://${projectId}.supabase.co`;
  
  supabaseClient = createSupabaseClient(supabaseUrl, publicAnonKey);
  
  return supabaseClient;
}
