   const { getDefaultConfig } = require('expo/metro-config');
   const defaultConfig = getDefaultConfig(__dirname);
   defaultConfig.resolver.assetExts.push('glb', 'GLB', 'gltf', 'png', 'jpg', 'JPG', 'obj', 'mtl', 'usdz', 'gif', 'bin', 'hdr', 'arobject', 'vrx');
   module.exports = defaultConfig;