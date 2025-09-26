const { getDefaultConfig } = require('expo/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');
const { withNativeWind } = require('nativewind/metro');
const { withSVG } = require('./metro.svg.cjs');

// eslint-disable-next-line no-undef
let config = getDefaultConfig(__dirname);

config = withSVG(config);
config = withNativeWind(config, {
  input: './src/theme/global.css',
  inlineRem: 16,
});
config = wrapWithReanimatedMetroConfig(config);

module.exports = config;
