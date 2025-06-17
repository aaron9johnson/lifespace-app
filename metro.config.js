   const { getDefaultConfig } = require('expo/metro-config');
   const defaultConfig = getDefaultConfig(__dirname);
   defaultConfig.resolver.assetExts.push('glb', 'gltf', 'png', 'jpg', 'obj', 'mtl', 'usdz');
   module.exports = defaultConfig;