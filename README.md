# @vue-require-id/eslint-plugin

A custom ESLint plugin that enforces adding an id attribute to all specified elements in Vue.js templates using the vue-eslint-parser. This plugin can be used to catch missing id attributes during development and ensure accessibility best practices are being followed.

Usage
To use this plugin, add it to your ESLint configuration file and enable the `@vue-require-id/require-id` rule with an options object that lists the elements to check for the presence of the id attribute. 

For example:

```json
{
    "plugins": [
        "vue-require-id"
    ],
    "rules": {
        "@vue-require-id/require-id": [
            "error",
            {
                "elements": [
                    "input",
                    "button"
                ]
            }
        ]
    }
}
```

If the id attribute is missing from any input or button element in your templates, ESLint will report an error.

License
This project is licensed under the MIT License.
