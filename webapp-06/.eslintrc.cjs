const path = require("path")

module.exports = {
  root: true,
  env: {
    browser: true,
    es2024: true,
    node: true,
  },
  ignorePatterns: [
    "node_modules",
    "dist",
    ".next",
    "coverage",
    "storybook-static",
    "tmp",
    "pnpm-lock.yaml",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:eslint-comments/recommended",
    "prettier",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@next/next/recommended",
  ],
  globals: {
    React: "writable",
  },
  overrides: [
    {
      files: ["**/*.cjs"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
    {
      files: [
        "**/src/**/*.test.ts",
        "**/src/**/*.test.tsx",
        "**/src/**/*.spec.ts",
        "**/src/**/*.spec.tsx",
      ],
      extends: [
        "plugin:testing-library/react",
        "plugin:jest-dom/recommended",
        "plugin:vitest/recommended",
      ],
      plugins: ["no-only-tests"],
      rules: {
        "no-only-tests/no-only-tests": "error",
      },
    },
    {
      files: ["**/e2e/**/*.test.ts", "**/e2e/**/*.spec.ts"],
      extends: ["plugin:playwright/playwright-test"],
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@next/next/no-html-link-for-pages": [
      "error",
      path.join(__dirname, "src", "app"),
    ],
    "react/react-in-jsx-scope": "off",
    "react/display-name": ["error", { ignoreTranspilerName: false }],
    "no-console": "warn",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "eslint-comments/no-unused-disable": "error",
    "react/no-unescaped-entities": "off",
    "react-hooks/rules-of-hooks": "error",
    "react/prop-types": "off",
    "react-hooks/exhaustive-deps": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "import/prefer-default-export": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "react/require-default-props": "off", // Allow non-defined react props as undefined
    "react/no-unknown-property": [
      2,
      {
        ignore: ["jsx", "global"],
      },
    ],
    "@typescript-eslint/no-misused-promises": [
      2,
      {
        checksVoidReturn: {
          attributes: false,
          properties: false,
        },
      },
    ],
    "eslint-comments/disable-enable-pair": ["error", { allowWholeFile: true }],
    "@typescript-eslint/no-unsafe-assignment": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}
