const loginFields = [
    {
        labelText: "Email address",
        labelFor: "email-address",
        id: "email-address",
        name: "email",
        type: "email",
        autoComplete: "email",
        isRequired: true,
        placeholder: "Email address",
    },
    {
        labelText: "Password",
        labelFor: "password",
        id: "password",
        name: "password",
        type: "password",
        autoComplete: "current-password",
        isRequired: true,
        placeholder: "Password",
    }
]

const signupFields = [
    {
        labelText: "Email address",
        labelFor: "email-address",
        id: "email-address",
        name: "email",
        type: "email",
        autoComplete: "email",
        isRequired: true,
        placeholder: "Email address",
        error: "Invalid email address",
        hasError: false
    },
    {
        labelText: "Password",
        labelFor: "password",
        id: "password",
        name: "password",
        type: "password",
        autoComplete: "current-password",
        isRequired: true,
        placeholder: "Password",
        error: "Password must contain atleast 8 characters, with 1 uppercase, 1 lowercase, 1 number and 1 special character",
        hasError: false
    },
    {
        labelText: "Confirm Password",
        labelFor: "confirm-password",
        id: "confirm-password",
        name: "confirm-password",
        type: "password",
        autoComplete: "confirm-password",
        isRequired: true,
        placeholder: "Confirm Password",
        error: "Passwords do not match",
        hasError: false
    }
]

const forgotFields=[
    {
        labelText: "Email address",
        labelFor: "email-address",
        id: "email-address",
        name: "email",
        type: "email",
        autoComplete: "email",
        isRequired: true,
        placeholder: "Email address"   
    }
]

export {loginFields, signupFields, forgotFields}