export default function (brands) {
    return [
        {
            $formkit: 'text',
            name: 'name',
            label: 'Name',
            placeholder: "Type the name",
            validation: "required",
        },
        {
            $formkit: 'textarea',
            name: "description",
            label: "Description",
            placeholder: "Type the description",
            type: "textarea"
        },
        {
            $formkit: 'select',
            name: "brand_id",
            label: "Brand",
            placeholder: "Choose the brand",
            options: brands,
        }
    ]
}