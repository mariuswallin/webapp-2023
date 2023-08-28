/** @type {import('prettier').Config} */
module.exports = {
  printWidth: 80,
  plugins: [
    require.resolve("prettier-plugin-tailwindcss"),
    // "@ianvs/prettier-plugin-sort-imports",
  ],
  arrowParens: "always",
  endOfLine: "lf",
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  // importOrderSeparation: false,
  // importOrderSortSpecifiers: true,
  // importOrderBuiltinModulesToTop: true,
  // importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  // importOrderMergeDuplicateImports: true,
  // importOrderCombineTypeAndValueImports: true,
}
