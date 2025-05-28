import React from 'react';
import { StyleSheet } from 'react-native';
import { ViroARSceneNavigator } from '@viro-community/react-viro';
import ARScene from './scenes/ARScene';

export default function ARView() {
  return (
    <ViroARSceneNavigator
      initialScene={{ scene: () => ARScene }}
      style={styles.flex}
    />
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});