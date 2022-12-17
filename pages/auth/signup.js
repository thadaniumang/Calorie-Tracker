// Components
import AuthHeader from "../../components/AuthHeader";
import SignUp from "../../components/SignUp";


const SignupPage = () => {
    return(
        <>
            <AuthHeader heading="Create a new account" paragraph="Already have an account?" linkName="Login" linkUrl="/auth/login" />
            <SignUp/>
        </>
    )
}

export default SignupPage;