export default function () {
    return [
        {
            $formkit: 'text',
            name: 'name',
            label: 'Name',
            placeholder: "Type the name",
            validation: "required",
            "validation-visibility":"blur"
        },
        {
            $formkit: 'text',
            name: 'email',
            label: 'Email',
            placeholder: "Type the email",
            validation: "required|email",
            "validation-visibility":"blur"
        },
        {
            $formkit: 'password',
            name: 'password',
            label: 'Password',
            placeholder: "Type the password",
            validation: "required|length:8",
            "validation-visibility":"blur"
        },
        {
            $formkit: 'password',
            name: 'password_confirm',
            label: 'Confirm Password',
            placeholder: "Type the password confirmation",
            validation: "required|length:8",
            "validation-visibility":"blur"
        }
    ]
}