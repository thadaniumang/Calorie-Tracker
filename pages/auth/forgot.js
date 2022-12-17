// Components
import AuthHeader from "../../components/AuthHeader";
import ForgotPassword from "../../components/ForgotPassword";


const Forgot = () => {
    return (
        <>
            <AuthHeader heading="Reset your password" paragraph="Already have an account?" linkName="Login" linkUrl="/auth/login" />
            <ForgotPassword />
        </>
    )
}
 
export default Forgot;