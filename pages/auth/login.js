// React and NextJS
import Link from "next/link";
import Head from "next/head";

// Components
import AuthHeader from "../../components/AuthHeader";
import Login from "../../components/Login";


// Login Page
const LoginPage = () => {
    return(
        <>
            <Head>
                <title>Dietto - Login</title>
            </Head>
            <AuthHeader heading="Login to your account" paragraph="Don't have an account yet?" linkName="Signup" linkUrl="/auth/signup" />
            <Login/>
            <p className="text-center text-sm mt-5">
                <Link href='/auth/forgot' className="font-medium text-purple-600 hover:text-purple-500">
                    Forgot your password?
                </Link>
            </p>
        </>
    )
}
 
export default LoginPage;