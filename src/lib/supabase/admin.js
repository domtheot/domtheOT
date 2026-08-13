import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const isConfigured = !!(supabaseUrl && supabaseServiceKey);

export const supabaseAdmin = isConfigured
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : {
      from: (table) => ({
        select: () => Promise.resolve({ data: [], error: new Error('Supabase admin not configured') }),
        insert: () => Promise.resolve({ data: null, error: new Error('Supabase admin not configured') }),
        update: () => Promise.resolve({ data: null, error: new Error('Supabase admin not configured') }),
        delete: () => Promise.resolve({ data: null, error: new Error('Supabase admin not configured') }),
      }),
    };
