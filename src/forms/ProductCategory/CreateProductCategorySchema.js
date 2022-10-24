export default function () {
    return [
        {
            $formkit: 'text',
            label: 'Name',
            name: 'name',
            placeholder: "Type the name",
            validation: "required",
            "validation-visibility":"blur"
        },
        {
            $formkit: 'textarea',
            label: 'Description',
            name: 'description',
            placeholder: "Type the description",
            "validation-visibility":"blur"
        }
    ]
}