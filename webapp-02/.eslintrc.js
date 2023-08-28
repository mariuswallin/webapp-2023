module.exports = {
  root: true,
  env: {
    browser: true,
    es2024: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", "simple-import-sort", "unused-imports"],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "simple-import-sort/imports": "warn",
    // "import/prefer-default-export": "off",
    // "@typescript-eslint/no-unused-vars": "off",
    // "unused-imports/no-unused-imports": "error",
    // "unused-imports/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      }, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
}
