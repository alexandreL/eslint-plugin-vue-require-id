module.exports = {
    create: function (context) {
        const elementNames = context.options[0] || [ 'input', 'button' ]

        return {
            'VAttribute[name.name="id"]': function (node) {
                if (node.parent && elementNames.includes(node.parent.name)) {
                    // Ignore elements with v-bind:id or :id
                    if (
                      node.parent.attributes.some(attr => attr.directive) &&
                      node.parent.attributes.some(attr => attr.key.name === ':id' || attr.key.name === 'v-bind:id')
                    ) {
                        return
                    }

                    if (!node.value) {
                        context.report({
                            node,
                            message: `All <${ node.parent.name }> elements must have an "id" attribute`
                        })
                    }
                }
            }
        }
    },
    schema: [
        {
            type: 'array',
            items: {
                type: 'string'
            }
        }
    ],
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Enforce the presence of `id` attribute on specified elements.',
            category: 'Possible Errors',
            recommended: true,
        },
        schema: [{
            type: 'object',
            properties: {
                elements: {
                    type: 'array',
                    items: {
                        type: 'string',
                        enum: ['button', 'input'],
                    },
                    uniqueItems: true,
                    default: ['button', 'input'],
                },
            },
            additionalProperties: false,
        }],
    },
}
