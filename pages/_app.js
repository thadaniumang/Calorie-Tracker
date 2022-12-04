import '../styles/globals.css'
import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

function MyApp({ Component, pageProps }) {
  const supabase_project_url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabase_project_anon_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const [supabase] = useState(() => createBrowserSupabaseClient(supabase_project_url, supabase_project_anon_key))

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <div className='sm:w-2/3 md:w-3/5 lg:w-1/2 mx-auto px-8 py-16'>
        <Component {...pageProps} />
      </div>
    </SessionContextProvider>
  )
}
export default MyApp