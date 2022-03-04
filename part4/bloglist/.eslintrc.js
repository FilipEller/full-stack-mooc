module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'linebreak-style': 0,
    'no-console': 0,
    'no-unused-vars': 0,
    'arrow-parens': 0,
    'no-plusplus': 0,
  },
  ignorePatterns: [
  ],
};
