   const { getDefaultConfig } = require('expo/metro-config');
   const defaultConfig = getDefaultConfig(__dirname);
   defaultConfig.resolver.assetExts.push('dae', 'glb', 'GLB', 'gltf', 'png', 'jpg', 'jpeg', 'JPG', 'obj', 'mtl', 'usdz', 'gif', 'bin', 'hdr', 'arobject', 'vrx');
   module.exports = defaultConfig;