module.exports = {
  parser: 'babel-eslint',
  extends: ['@rtivital/eslint-config', 'plugin:jest/recommended'],
  plugins: ['jest'],

  env: {
    browser: true,
    node: true,
    'jest/globals': true,
  },

  settings: {
    'import/resolver': {
      node: {},
      webpack: {},
    },
  },
};
