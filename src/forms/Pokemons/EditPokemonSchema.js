export default function () {
    return [
        {
            $formkit: 'text',
            label: 'Name',
            name: 'name',
            placeholder: "Type the name",
        },
        {
            $formkit: 'text',
            label: 'Type',
            name: 'type',
            placeholder: "Select the type ",
        },
        {
            $formkit: 'number',
            label: 'HP',
            name: 'hp',
            placeholder: "Insert the hp",
        },
        {
            $formkit: 'number',
            label: 'Agility',
            name: 'agility',
            placeholder: "Insert the agility",
        },
        {
            $formkit: 'number',
            label: 'Attack',
            name: 'attack',
            step: 0.01,
            placeholder: "Insert the attack",
        },
        {
            $formkit: 'number',
            label: 'Defense',
            name: 'defense',
            step: 0.01,
            placeholder: "Insert the defense",
        },
    ]
}