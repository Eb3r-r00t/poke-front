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
            $formkit: 'select',
            label: 'Type',
            name: 'type',
            placeholder: "Choose the type ",
            options: [
                {label: 'Fire', value: 'fire'},
                {label: 'Water', value: 'water'},
                {label: 'Grass', value: 'grass'},
                {label: 'Electric', value: 'electric'},
                {label: 'Psychic', value: 'psychic'},
                {label: 'Ice', value: 'ice'},
                {label: 'Dragon', value: 'dragon'},
                {label: 'Dark', value: 'dark'},
                {label: 'Fairy', value: 'fairy'},
                {label: 'Normal', value: 'normal'},
                {label: 'Fighting', value: 'fighting'},
                {label: 'Flying', value: 'flying'},
                {label: 'Poison', value: 'poison'},
                {label: 'Ground', value: 'ground'},
                {label: 'Rock', value: 'rock'},
                {label: 'Bug', value: 'bug'},
                {label: 'Ghost', value: 'ghost'},
                {label: 'Steel', value: 'steel'},
            ],
            validation: "required",
        },
        {
            $formkit: 'url',
            label: 'Image',
            name: 'image',
            placeholder: "Type the image url",
            validation: "required|url",
        },
        {
            $formkit: 'number',
            label: 'HP',
            name: 'hp',
            placeholder: "Insert the hp",
            validation: "required|between:0,100",
        },
        {
            $formkit: 'number',
            label: 'Agility',
            name: 'agility',
            placeholder: "Insert the agility",
            validation: "required|between:0,100",
        },
        {
            $formkit: 'number',
            label: 'Attack',
            name: 'attack',
            step: 0.01,
            placeholder: "Insert the attack",
            validation: "required|between:0,100",
        },
        {
            $formkit: 'number',
            label: 'Defense',
            name: 'defense',
            step: 0.01,
            placeholder: "Insert the defense",
            validation: "required|between:0,100",
        },
    ]
}