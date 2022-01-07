/*global module*/
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ["prettier"],
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
  },
  rules: { "prettier/prettier": "error", "no-unused-vars": "off" },
};
