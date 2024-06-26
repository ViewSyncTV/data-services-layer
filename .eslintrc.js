module.exports = {
    env: {
        browser: false,
        node: true,
        commonjs: true,
        es2021: true,
    },
    extends: ["eslint:recommended", "plugin:jsdoc/recommended"],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {
        indent: ["error", 4],
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
        semi: ["error", "never"],
    },
}
