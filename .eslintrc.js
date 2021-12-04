module.exports = {
    env: {
        es6: true,
        node: true,
        es2021: true,
        jest: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 13,
        sourceType: 'module',
    },
    plugins: ['react', 'react-native', 'prettier'],
    rules: {
        'prettier/prettier': ['error', { endOfLine: 'auto' }, { usePrettierrc: true }],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        'no-unreachable': 2,
        'no-loop-func': 2,
        'no-return-assign': 2,
        'no-unused-expressions': 2,
        'max-len': [2, 100],
        'react/prop-types': 0,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
}
