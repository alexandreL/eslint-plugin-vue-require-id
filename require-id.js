'use strict'

const utils = require('eslint-plugin-vue/lib/utils')

function vIdentifierIsId(attribute) {
    const { name, argument } = attribute.key
    if (typeof name === 'undefined') return false
    return name.rawName === ':' && argument.rawName === 'id'

}

function hasIdAttribute(node) {
    return node.startTag.attributes.some(attribute => attribute.key.name === 'id' || vIdentifierIsId(attribute))
}

function create(context) {
    // print file
    const options = context.options[0] || {}
    const elementsToCheck = options.elements || [ 'input', 'button' ]
    return utils.defineTemplateBodyVisitor(context, {
        [`VElement`](node) {
            if (!elementsToCheck.includes(node.rawName)) return
            if (!hasIdAttribute(node)) {
                context.report({
                    node,
                    message: `Missing "id" attribute in <${ node.rawName }>`,
                    // fix(fixer) {
                    //     return fixer.insertTextBefore(node.endTag, ` id="${ node.name }"`)
                    // }
                })
            }
        }
    })
}

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Enforce the presence of `id` attribute on specified elements.',
            category: 'Possible Errors',
            recommended: true,
        },
        schema: [ {
            type: 'object',
            properties: {
                elements: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                    uniqueItems: true,
                    default: [ 'button', 'input', 'b-input', 'b-button', 'b-form-input', 'b-form-textarea', 'b-form-checkbox', 'b-form-radio', 'b-form-file', 'v-select' ],
                },
            },
            additionalProperties: false,
            // fixable: 'code',
        } ],
    },
    create
}
