module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],

  parserOptions: {
    parser: '@babel/eslint-parser',
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
  },

  'extends': [
    'plugin:vue/strongly-recommended',
    'eslint:recommended',
    'plugin:prettier/recommended'
  ]
};
