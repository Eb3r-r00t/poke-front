export default function () {
    return [
        {
            $formkit: 'text',
            label: 'Name',
            name: 'name',
            placeholder: "Type the name",
            validation: "required",
        },
        {
            $formkit: 'text',
            label: 'Type',
            name: 'type',
            placeholder: "Select the type ",
            validation: "required",
        },
        {
            $formkit: 'number',
            label: 'HP',
            name: 'hp',
            placeholder: "Insert the hp",
            validation: "required",
        },
        {
            $formkit: 'number',
            label: 'Agility',
            name: 'agility',
            placeholder: "Insert the agility",
            validation: "required",
        },
        {
            $formkit: 'number',
            label: 'Attack',
            name: 'attack',
            step: 0.01,
            placeholder: "Insert the attack",
            validation: "required",
        },
        {
            $formkit: 'number',
            label: 'Defense',
            name: 'defense',
            step: 0.01,
            placeholder: "Insert the defense",
            validation: "required",
        },
    ]
}