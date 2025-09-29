module.exports = {
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss', // must be the last one
  ],
  importOrder: ["^react(-native)?$", "^expo-", "<THIRD_PARTY_MODULES>", "^@/", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderSideEffects: false,
  singleQuote: true,
  printWidth: 100,
  tailwindAttributes: ['className'],
  tailwindFunctions: ['twMerge'],
};
