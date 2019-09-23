
module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    // "eslint:recommended",
    // "plugin:react/recommended"
  ],
  "plugins": ["@typescript-eslint"],
  parserOptions: {
    "useJSXTextNode": true,
    "sourceType": "module",
    "ecmaVersion": 6,
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    // es6: true,
    // browser: true,
    // node: true
  },
  root: true
}