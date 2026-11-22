import{createBrowserClient as e}from"@supabase/ssr";export function supabaseBrowser(){return e(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)}
