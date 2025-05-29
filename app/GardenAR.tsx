import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Camera, useCameraPermission, getCameraDevice } from 'react-native-vision-camera';

import { GLView } from 'expo-gl';
import * as THREE from 'three';
import { Renderer } from 'expo-three';

export default function GardenAR() {
  const cameraRef = useRef(null);
  const glRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const threeCameraRef = useRef(null);
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
      return (<View style={styles.container} onPress={requestPermission}>
        <Text style={styles.text}>!!hasPermission</Text>
      </View>);
    }

  const onContextCreate = async (gl) => {

    glRef.current = gl;
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 1000);
    camera.position.z = 5;
    threeCameraRef.current = camera;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const animate = () => {
      requestAnimationFrame(animate);
      plants.forEach((plant) => {
        plant.rotation.y += 0.01;
      });
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    animate();
  };

  const addPlant = () => {
    if (!sceneRef.current || !threeCameraRef.current) return;

    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshStandardMaterial({ color: 0x228822 });
    const plant = new THREE.Mesh(geometry, material);

    const camera = threeCameraRef.current;
    const vector = new THREE.Vector3(0, 0, -2);
    vector.applyMatrix4(camera.matrixWorld);
    plant.position.copy(vector);

    sceneRef.current.add(plant);
    setPlants((prev) => [...prev, plant]);
  };

  return (
    <View style={styles.container}>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
          />
      <TouchableWithoutFeedback onPress={addPlant}>
        <GLView
          style={StyleSheet.absoluteFill}
          onContextCreate={onContextCreate}
        />
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
