// React and NextJS
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Supabase
import supabase from '../supabase';

// RecoilJS
import { useRecoilState } from 'recoil';
import { userState } from '../atoms';


function withAuth(WrappedComponent) {

    function AuthWrapper(props) {
        const router = useRouter();
        const [userId, setUserId] = useRecoilState(userState);

        useEffect(() => {
            supabase.auth.getUser().then((res) => {
                if (!res.data.user) {
                    router.push('/auth/login');
                } else {
                    setUserId(res.data.user.id);
                }
            })
        }, []);

        return <WrappedComponent {...props} />;
    }

    AuthWrapper.getInitialProps = async (context) => {
        const props = WrappedComponent.getInitialProps && await WrappedComponent.getInitialProps(context);
        return { ...props }
    }

    return AuthWrapper;
}

export default withAuth;