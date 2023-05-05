module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'no-only-tests',

  ],
  rules: {
    'class-methods-use-this': ['off'],
    'default-case-last': ['off'],
    'import/prefer-default-export': ['off'],
    'no-await-in-loop': ['off'],
    'no-continue': ['off'],
    'no-console': [
      'error',
      {
        allow: [
          'error',
          'info',
          'warn',
        ],
      },
    ],
    'no-only-tests/no-only-tests': [
      'error',
      {
        fix: false,
      },
    ],
    'no-restricted-syntax': ['off'],
    radix: 'off',
    semi: ['error', 'always'],
  },
};
