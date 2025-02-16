/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ANTHROPIC_API_KEY: string
  readonly VITE_ELEVENLABS_API_KEY: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_KEY: string
  readonly VITE_SUPABASE_DB_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}