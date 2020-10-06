module.exports = {
  ignorePatterns: ['dist/**'],
  env: {
    es6: true,
    'jest/globals': true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/typescript',
    'plugin:jest/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    noWatch: true,
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'import', 'jest', 'prettier'],
  rules: {
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
  },
  settings: {
    'import/ignore': ['node_modules'],
    'import/parser': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      node: {},
      typescript: {},
    },
  },
};
