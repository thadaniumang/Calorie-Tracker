// React and NextJS
import { useState } from "react";
import { useRouter } from "next/router";

// Forms
import { loginFields } from "../forms/authForms";

// Recoil
import { useRecoilState } from "recoil";
import { loggedInState, userState } from "../atoms";

// Components
import Input from "./Input";
import FormAction from "./FormAction";

// Supabase
import supabase from "../supabase";

// Form Fields
const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');


const Login = () => {
    const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);
    const [user, setUser] = useRecoilState(userState);

    const [loginState, setLoginState] = useState(fieldsState);

    const router = useRouter();

    if (loggedIn && user) {
        router.push('/');
    }

    const handleChange = (e) => {
        setLoginState({...loginState, [e.target.id]: e.target.value})
    }

    const handleSubmit = (e) => { 
        e.preventDefault();
        
        const email = loginState['email-address'];
        const password = loginState['password'];
        
        supabase.auth.signInWithPassword({ email, password }).then((res) => { 
            const session = res['data']['session'];
            const userData = res['data']['user']

            setLoggedIn(true);
            setUser({
                'access_token': session.access_token,
                'refresh_token': session.refresh_token,
                'user': userData
            })

            localStorage.setItem('loggedIn', loggedIn);
            localStorage.setItem('user', JSON.stringify(user));
        }).catch((error) => {
            console.log(error);
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
            <FormAction handleSubmit={handleSubmit} text="Login"/>
        </form>
    )
}
 
export default Login;