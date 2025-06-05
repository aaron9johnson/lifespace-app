import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Camera, useCameraPermission, getCameraDevice } from 'react-native-vision-camera';

import { GLView } from 'expo-gl';
import * as THREE from 'three';
import { Renderer } from 'expo-three';
import { ThemedText } from '@/components/ThemedText';
import { ThemedCTA } from '@/components/ThemedCTA';
import { ThemedView } from '@/components/ThemedView';

export default function PhotoScreen() {
  const cameraRef = useRef(null);
  const glRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const threeCameraRef = useRef(null);
  const plantMeshesRef = useRef([]);

  const [plants, setPlants] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.requestCameraPermissionsAsync();
  //     if (status !== 'granted') {
  //       alert('Camera permission required');
  //     }
  //   })();
  // }, []);
  const { hasPermission, requestPermission } = useCameraPermission()
  const devices = Camera.getAvailableCameraDevices();
  const device = getCameraDevice(devices, 'back', {
      physicalDevices: ['wide-angle-camera']
    })
    if (!hasPermission) {
      requestPermission();
      return (
        <ThemedView style={styles.container}>
          <ThemedCTA lightColor={'#ef7e47'} darkColor={'#595959'} link='/Home'>No Camera Permission</ThemedCTA>
        </ThemedView>
      );
    }
    const takePhoto = async () => {
      const photo = await cameraRef.current.takePhoto()
    }

  const onContextCreate = async (gl) => {
  };

  return (
    <View style={styles.container}>
          <Camera
            device={device}
            isActive={true}
            photo={true}
          />
          <ThemedView style={styles.button}>
            <ThemedCTA lightColor={'#ef7e47'} darkColor={'#595959'} link='/PhotoReview'></ThemedCTA>
          </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -50 }],
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ffffff',
  },
});
