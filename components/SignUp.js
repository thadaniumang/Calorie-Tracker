// React and NextJS
import { useState } from "react";
import { useRouter } from "next/router";

// Forms
import { signupFields } from "../forms/authForms";

// Recoil
import { useRecoilState } from "recoil";
import { loggedInState, userState } from "../atoms";

// Supabase
import supabase from "../supabase";

// Components
import FormAction from "./FormAction";
import Input from "./Input";


// Form Fields
const fields = signupFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');


const SignUp = () => {
    const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);
    const [user, setUser] = useRecoilState(userState);

    const router = useRouter();

    if (loggedIn && user) {
        router.push('/');
    }

    const [signupState, setSignupState] = useState(fieldsState);

    const handleChange = (e) => {
        setSignupState({ ...signupState, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = signupState['email-address'];
        const password = signupState['password'];
        
        supabase.auth.signUp({ email, password }).then((res) => { 
            console.log(res);
        }).catch((error) => {
            console.log(error);
        });
    }

    return(
        <form className="mt-8 space-y-6">
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
                        />
                    
                    )
                }
            </div>
            <FormAction handleSubmit={handleSubmit} text="Sign Up"/>
        </form>
    )
}

export default SignUp;