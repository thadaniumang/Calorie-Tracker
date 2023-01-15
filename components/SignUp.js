// React and NextJS
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Forms
import { signupFields } from "../forms/authForms";

// Supabase
import supabase from "../supabase";

// Components
import FormAction from "./FormAction";
import Input from "./Input";
import ToastAlert from "./ToastAlert";
import Error from "./Error";

// Form Fields
const fields = signupFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');


// Component
const SignUp = () => {
    const [submitted, setSubmitted] = useState(false);
    const [errorFound, setErrorFound] = useState(false);

    const [error, setError] = useState(null);
    const [signUpError, setSignUpError] = useState(null);

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

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
            console.log(error);
        });
    }, []);

    const [signupState, setSignupState] = useState(fieldsState);

    const handleChange = (e) => {
        setSignupState({ ...signupState, [e.target.id]: e.target.value })

        if (e.target.id === 'email-address') {
            if (!emailRegex.test(e.target.value)) {
                fields[0]['hasError'] = true;
            } else {
                fields[0]['hasError'] = false;
            }
        } else if (e.target.id === 'password') {
            if (!passwordRegex.test(e.target.value)) {
                fields[1]['hasError'] = true;
            } else {
                fields[1]['hasError'] = false;
            }
        } else if (e.target.id === 'confirm-password') {
            if (e.target.value !== signupState['password']) {
                fields[2]['hasError'] = true;
            } else {
                fields[2]['hasError'] = false;
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = signupState['email-address'];
        const password = signupState['password'];

        let localError = false;
        setErrorFound(false);
        fields.forEach(field => {
            if (field.hasError || signupState[field.id] === '') {
                field.hasError = true;
                localError = true;
                setErrorFound(true);
                return;
            }
        });
        
        if (!localError) {
            supabase.auth.signUp({ email, password }).then((res) => { 
                setSubmitted(true);
            }).catch((error) => {
                setSignUpError(error);
            });
        }
       
    }

    return(
        <form className="mt-8 space-y-6">
            { signUpError && <Error message="Error Signing Up" /> }
            <div>
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                            hasError={field.hasError}
                            error={field.error}
                        />
                    
                    )
                }
            </div>
            <FormAction handleSubmit={handleSubmit} text="Sign Up" />
            {
                errorFound && <ToastAlert message="Please fill out all fields correctly" />
            }
            {
                submitted && <ToastAlert message="Click on the link in an email you have received to complete your Signup" />
            }
            {
                submitted && <ToastAlert message="If you don't see the email in your inbox, check your spam folder" />
            }
        </form>
    )
}

export default SignUp;