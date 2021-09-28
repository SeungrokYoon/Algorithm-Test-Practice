// eslint + prettier 설정 참고 : https://pravusid.kr/javascript/2019/03/10/eslint-prettier.html

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['google', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'require-jsdoc': 'off',
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        tabWidth: 2,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        semi: false,
        useTabs: false,
        endOfLine: 'auto',
      },
    ],
  },
}
