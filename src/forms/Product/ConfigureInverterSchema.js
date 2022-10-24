export default function () {
    return [
        {
            $formkit: 'number',
            name: "max_output_power",
            label: "Max Output Power",
            placeholder: "Type the output power",
            validation: "required",
        },
        {
            $formkit: 'number',
            name: "max_overload",
            label: "Max Overload",
            placeholder: "Type the overload",
            validation: "required",
        },
        {
            $formkit: 'number',
            name: "min_overload",
            label: "Min Overload",
            placeholder: "Type the overload",
            validation: "required",
        },
        {
            $formkit: 'number',
            name: "number_of_mppts",
            label: "Number Mppts",
            placeholder: "Type the number of Mppts",
            validation: "required",
        },
        {
            $formkit: 'number',
            name: "max_voltage_mppt",
            label: "Max Voltage Mppt",
            placeholder: "Type the max voltage per Mppt",
            validation: "required",
        },
        {
            $formkit: 'number',
            name: "min_voltage_mppt",
            label: "Min Voltage Mppt",
            placeholder: "Type the min voltage per Mppt",
            validation: "required",
        },
        {
            $formkit: 'text',
            name: "max_input_current_mppt",
            label: "Max Input Current Mppt",
            placeholder: "Type per Mppt like this 1/1/1",
            validation: "required",
        },
        {
            $formkit: 'text',
            name: "number_of_inputs_per_mppt",
            label: "Number Inputs Mppt",
            placeholder: "Type per Mppt like this 1/1/1",
            validation: "required",
        },
        {
            $formkit: 'number',
            name: "nominal_input_voltage",
            label: "Nominal Input Voltage",
            placeholder: "Type the nominal input voltage",
            validation: "required",
        },
        {
            $formkit: 'number',
            name: "feed_in_voltage",
            label: "Feed In Voltage",
            placeholder: "Type the feed in voltage",
            validation: "required",
        },
        {
            $formkit: 'number',
            name: "max_input_voltage",
            label: "Max Input Voltage",
            placeholder: "Type the max input voltage",
            validation: "required",
        },
        {
            $formkit: 'number',
            name: "min_input_voltage",
            label: "Min Input Voltage",
            placeholder: "Type the min input voltage",
            validation: "required",
        },
        {
            $formkit: 'select',
            name: "output_voltage",
            label: "Output Voltage",
            placeholder: "Choose the output voltage",
            options: [220, 380, 480, 600],
        },
        {
            $formkit: 'select',
            name: "phase",
            label: "Phase",
            placeholder: "Choose the phase",
            options: ['Single', 'Three'],
        }
    ]
}