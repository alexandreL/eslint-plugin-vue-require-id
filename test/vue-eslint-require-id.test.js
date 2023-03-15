const { RuleTester } = require('eslint')
const requireId = require('../require-id.js')
const ruleTester = new RuleTester()
ruleTester.run('require-id', requireId, {
    valid: [
        {
            code: '<template><button id="myButton">Click me!</button></template>',
        },
        {
            code: '<template><input type="text" id="myInput" /></template>',
        },
        {
            code: '<template><div>Some content</div></template>',
        },
        {
            code: '<template><button :id="buttonId">Click me!</button></template>',
        },
        {
            code: '<template><input :id="inputId" type="text" /></template>',
        },
        {
            code: '<template><button :key="buttonKey">Click me!</button></template>',
        },
    ],
    invalid: [
        {
            code: '<template><button>Click me!</button></template>',
            errors: [
                {
                    message: 'The button element must have an id attribute.',
                    type: 'Identifier',
                },
            ],
        },
        {
            code: '<template><input type="text" /></template>',
            errors: [
                {
                    message: 'The input element must have an id attribute.',
                    type: 'Identifier',
                },
            ],
        },
        {
            code: '<template><button :key="buttonKey">Click me!</button></template>',
            errors: [
                {
                    message: 'The button element must have an id attribute.',
                    type: 'Identifier',
                },
            ],
        },
    ],
})
