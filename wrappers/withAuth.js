import { useRouter } from 'next/router';
import { useEffect } from 'react';
import supabase from '../supabase';


function withAuth(WrappedComponent) {
    return function AuthWrapper(props) {
        const router = useRouter();

        useEffect(() => {
            supabase.auth.getUser().then((res) => {
                if (!res.data.user) {
                    router.push('/auth/login');
                }
            })
        }, []);

        return <WrappedComponent {...props} />;
    }
}

export default withAuth;