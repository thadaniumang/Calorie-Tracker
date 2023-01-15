// React and NextJS
import { useState } from 'react';

// Forms
import { forgotFields } from '../forms/authForms';

// Components
import Input from './Input';
import FormAction from './FormAction';
import Error from './Error';

// Supabase
import supabase from "../supabase";


// Form Fields
const fields = forgotFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');


// Component
const ForgotPassword = () => {
    const [forgotState, setForgotState] = useState(fieldsState);
    const [emailSent, setEmailSent] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForgotState({ ...forgotState, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = forgotState['email-address'];
        
        supabase.auth.resetPasswordForEmail(email).then((data) => {
            setEmailSent(true);
        }).catch((error) => {
            setError(error);
        });
    }

    return (
        <form className="mt-8 space-y-6">
            {error && <Error message="Error sending E-Mail. Make sure it is correct and registered" />}
            <div className="-space-y-px">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={forgotState[field.id]}
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
            <FormAction handleSubmit={handleSubmit} text="Reset Password" />
            {emailSent && <p className="text-purple-500 text-center font-semibold">Email sent!</p>}
        </form>
    );
}
 
export default ForgotPassword;