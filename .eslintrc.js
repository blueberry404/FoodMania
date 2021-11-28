module.exports = {
    env: {
        es6: true,
        node: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 13,
        sourceType: 'module',
    },
    plugins: ['react', 'react-native'],
    rules: {
        indent: ['error', 'tab'],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'double'],
        semi: ['error', 'always'],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
}
