// React and NextJS
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Forms
import { loginFields } from "../forms/authForms";

// Components
import Input from "./Input";
import FormAction from "./FormAction";
import ToastAlert from "./ToastAlert";

// Supabase
import supabase from "../supabase";

// Form Fields
const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');


const Login = () => {
    const [loginState, setLoginState] = useState(fieldsState);
    const [loginError, setLoginError] = useState(false);
    const [error, setError] = useState(null);

    const router = useRouter();

    useEffect(() => {
        supabase.auth.getUser().then((res) => {
            if (res.data.user) {
                router.push('/');
            } else {
                return res.error;
            }
        }).catch((error) => {
            setError(error);
        });
    }, []);

    const handleChange = (e) => {
        setLoginState({...loginState, [e.target.id]: e.target.value})
    }

    const handleSubmit = (e) => { 
        e.preventDefault();
        
        const email = loginState['email-address'];
        const password = loginState['password'];
        
        supabase.auth.signInWithPassword({ email, password }).then((res) => {
            if (res.data.user == null) {
                setLoginError(true);
                return res.error;
            } else {
                router.push('/')
            }
        }).catch((error) => {
            setLoginError(error);
        });
    }

    return(
        <form className="mt-8 space-y-6">
            <div className="-space-y-px">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />
                    
                    )
                }
            </div>
            <FormAction handleSubmit={handleSubmit} text="Login" />
            {
                loginError && <ToastAlert message="Incorrect Credentials" />
            }
        </form>
    )
}
 
export default Login;