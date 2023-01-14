import Head from "next/head";

// Components
import AuthHeader from "../../components/AuthHeader";
import SignUp from "../../components/SignUp";


const SignupPage = () => {
    return(
        <>
            <Head>
                <title>Dietto - Signup</title>
            </Head>
            <AuthHeader heading="Create a new account" paragraph="Already have an account?" linkName="Login" linkUrl="/auth/login" />
            <SignUp/>
        </>
    )
}

export default SignupPage;