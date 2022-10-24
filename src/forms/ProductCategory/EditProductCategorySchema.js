export default function (is_immutable) {
    let form = [
        {
            $formkit: 'textarea',
            label: 'Description',
            name: 'description',
            placeholder: "Type the description",
            "validation-visibility":"blur"
        }
    ]

    if (!is_immutable) {
        form.splice(0, 0, {
            $formkit: 'text',
            label: 'Name',
            name: 'name',
            placeholder: "Type the name",
            validation: "required",
            "validation-visibility": "blur"
        },)
    }

    return form;
}