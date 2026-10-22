import { createClient, SupabaseClient } from '@supabase/supabase-js';

function resolveSupabaseUrl(rawUrl?: string): string {
  if (!rawUrl) return '';
  const trimmed = rawUrl.trim().replace(/^["']|["']$/g, '');

  // If user pasted a postgres connection URI by mistake, extract the project ref
  // e.g. postgresql://postgres.ftipdxkbjalhrfoqcgah:pass@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres
  if (trimmed.startsWith('postgresql://') || trimmed.startsWith('postgres://')) {
    const match = trimmed.match(/postgres\.([a-z0-9]+):/i);
    if (match && match[1]) {
      return `https://${match[1]}.supabase.co`;
    }
  }

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  // If user only pasted the project reference ID
  if (/^[a-z0-9]{15,30}$/i.test(trimmed)) {
    return `https://${trimmed}.supabase.co`;
  }

  return trimmed;
}

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = resolveSupabaseUrl(rawUrl);
const supabaseAnonKey = rawAnonKey?.trim().replace(/^["']|["']$/g, '');

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('https://')
);

if (!isSupabaseConfigured) {
  console.info(
    'Supabase credentials not yet provided in .env — running with offline seed dataset.'
  );
}

let clientInstance: SupabaseClient | null = null;

if (isSupabaseConfigured) {
  try {
    clientInstance = createClient(supabaseUrl, supabaseAnonKey!);
  } catch (err) {
    console.warn('Failed to initialize Supabase client:', err);
    clientInstance = null;
  }
}

export const supabase = clientInstance;
