const { RuleTester } = require('eslint')
const requireId = require('../require-id.js')
const ruleTester = new RuleTester({
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: { ecmaVersion: 2015 }
})
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
        }
    ],
    invalid: [
        {
            code: '<template><button>Click me!</button></template>',
            errors: [
                {
                    message: 'Missing "id" attribute in <button>',
                    type: 'VElement',
                },
            ],
        },
        {
            code: '<template><input type="text" /></template>',
            errors: [
                {
                    message: 'Missing "id" attribute in <input>',
                    type: 'VElement',
                },
            ],
        },
        {
            code: '<template><button :key="buttonKey">Click me!</button></template>',
            errors: [
                {
                    message: 'Missing "id" attribute in <button>',
                    type: 'VElement',
                },
            ],
        },
    ],
})
