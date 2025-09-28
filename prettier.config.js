module.exports = {
  plugins: [
    'prettier-plugin-tailwindcss',
    '@trivago/prettier-plugin-sort-imports'
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
