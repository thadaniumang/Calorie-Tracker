import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'

const Home = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className="">
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      ) : (
          <Account session={session} />
      )}
    </div>
  )
}

export default Home