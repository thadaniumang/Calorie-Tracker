import { useRecoilValue } from 'recoil';
import { loggedInState } from '../atoms';
import { useRouter } from 'next/router';
import { useEffect } from 'react';


function withAuth(WrappedComponent) {
    return function AuthWrapper(props) {
        const router = useRouter();
        const loggedIn = useRecoilValue(loggedInState);

        useEffect(() => {
            if (!loggedIn) {
                router.push('/auth/login');
            }
        }, []);

        return <WrappedComponent {...props} />;
    }
}

export default withAuth;