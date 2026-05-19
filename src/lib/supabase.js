import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export let supabase;

const isConfigured = supabaseUrl && supabaseAnonKey && 
                     supabaseUrl !== 'YOUR_SUPABASE_URL' && 
                     !supabaseUrl.includes('YOUR_');

if (isConfigured) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('Supabase is not configured. Falling back to mock client. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
  
  // Return a mock supabase client with the minimal API needed for PromptPilot
  supabase = {
    auth: {
      signUp: async ({ email, password, options }) => {
        console.warn('Using mock signUp because Supabase is not configured.');
        return new Promise(resolve => {
          setTimeout(() => {
            const name = options?.data?.name || email.split('@')[0];
            const user = { id: 'mock-uid-' + Date.now(), email, user_metadata: { name } };
            resolve({ data: { user }, error: null });
          }, 1000);
        });
      },
      signInWithPassword: async ({ email, password }) => {
        console.warn('Using mock signInWithPassword because Supabase is not configured.');
        return new Promise(resolve => {
          setTimeout(() => {
            const name = email.split('@')[0];
            const user = { id: 'mock-uid-' + Date.now(), email, user_metadata: { name } };
            resolve({ data: { user, session: { user } }, error: null });
          }, 1000);
        });
      },
      signOut: async () => {
        console.warn('Using mock signOut because Supabase is not configured.');
        return { error: null };
      },
      onAuthStateChange: (callback) => {
        console.warn('Using mock onAuthStateChange because Supabase is not configured.');
        // Call it immediately with null if no user is in local storage, or with the local storage user
        const storedUser = localStorage.getItem('pp_user');
        if (storedUser) {
          try {
            const parsed = JSON.parse(storedUser);
            callback('SIGNED_IN', { user: { email: parsed.email, user_metadata: { name: parsed.name } } });
          } catch(e) {
            callback('SIGNED_OUT', null);
          }
        } else {
          callback('SIGNED_OUT', null);
        }
        return { data: { subscription: { unsubscribe: () => {} } } };
      },
      getSession: async () => {
        const storedUser = localStorage.getItem('pp_user');
        if (storedUser) {
          try {
            const parsed = JSON.parse(storedUser);
            const user = { email: parsed.email, user_metadata: { name: parsed.name } };
            return { data: { session: { user } } };
          } catch(e) {}
        }
        return { data: { session: null } };
      }
    },
    from: (table) => {
      console.warn(`Using mock from('${table}') because Supabase is not configured.`);
      return {
        select: () => ({
          order: () => ({
            limit: () => Promise.resolve({ data: JSON.parse(localStorage.getItem('pp_history') || '[]'), error: null })
          }),
          eq: () => Promise.resolve({ data: JSON.parse(localStorage.getItem('pp_history') || '[]'), error: null })
        }),
        insert: (data) => {
          const history = JSON.parse(localStorage.getItem('pp_history') || '[]');
          history.unshift(data);
          localStorage.setItem('pp_history', JSON.stringify(history));
          return Promise.resolve({ data, error: null });
        },
        delete: () => {
          localStorage.removeItem('pp_history');
          return Promise.resolve({ error: null });
        }
      };
    }
  };
}
