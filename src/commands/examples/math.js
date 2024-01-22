const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'math',
    description: 'Execute math operations with two numbers',
    options: [
        {
            name: 'first-number',
            description: 'The first number',
            type: ApplicationCommandOptionType.Number,
            required: true
        },
        {
            name: 'operator',
            description: 'The math operator',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: 'sum',
                    value: '+'
                },
                {
                    name: 'subtraction',
                    value: '-'
                },
                {
                    name: 'multiplication',
                    value: '*'
                },
                {
                    name: 'division',
                    value: '/'
                },
            ]
        },
        {
            name: 'second-number',
            description: 'The second number',
            type: ApplicationCommandOptionType.Number,
            required: true
        }
    ],
    callback: (client, interaction) => {
        const num1 = interaction.options.get('first-number').value;
        const operator = interaction.options.get('operator').value;
        const num2 = interaction.options.get('second-number').value;

        let result;

        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
        }

        interaction.reply(`${num1} ${operator} ${num2} = ${result}`)
    }
}