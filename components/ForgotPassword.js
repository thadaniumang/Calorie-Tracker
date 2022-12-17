import { useState } from 'react';
import { forgotFields } from '../forms/authForms';
import Input from './Input';
import FormAction from './FormAction';

const fields = forgotFields;

let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

const ForgotPassword = () => {
    const [forgotState, setForgotState] = useState(fieldsState);

    const handleChange = (e) => {
        setForgotState({ ...forgotState, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(forgotState);
    }

    return (
        <form className="mt-8 space-y-6">
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
        </form>
    );
}
 
export default ForgotPassword;