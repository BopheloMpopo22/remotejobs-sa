/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  // add any other VITE_ variables you use
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
