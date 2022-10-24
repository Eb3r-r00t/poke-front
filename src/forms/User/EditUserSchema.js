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
            placeholder: "If keep empty, the email will not change",
            validation: "email",
            "validation-visibility":"blur"
        },
        {
            $formkit: 'password',
            name: 'password',
            label: 'Password',
            placeholder: "If keep empty, the password will not change",
            validation: "length:8",
            "validation-visibility":"blur"
        },
        {
            $formkit: 'password',
            name: 'password_confirm',
            label: 'Confirm Password',
            placeholder: "Type the password confirmation",
            validation: "length:8",
            "validation-visibility":"blur"
        }
    ]
}