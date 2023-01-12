// React and NextJS
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Supabase
import supabase from '../supabase';

// RecoilJS
import { useRecoilState } from 'recoil';
import { userState } from '../atoms';


function withAuth(WrappedComponent) {

    return function AuthWrapper(props) {
        const router = useRouter();
        const [userId, setUserId] = useRecoilState(userState);

        useEffect(() => {
            supabase.auth.getUser().then((res) => {
                if (!res.data.user) {
                    router.push('/auth/login');
                }
                setUserId(res.data.user.id);
            })
        }, []);

        return <WrappedComponent {...props} />;
    }
}

export default withAuth;