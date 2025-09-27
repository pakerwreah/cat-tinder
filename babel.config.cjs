module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: [
      ['react-native-reanimated/plugin', { processNestedWorklets: true }], // must be the last one
    ],
  };
};
