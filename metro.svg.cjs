module.exports = {
  withSVG(config) {
    return {
      ...config,
      transformer: {
        ...config.transformer,
        babelTransformerPath: require.resolve('./svg-transformer.cjs'),
      },
      resolver: {
        ...config.resolver,
        assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'),
        sourceExts: [...config.resolver.sourceExts, 'svg'],
      },
    };
  },
};
