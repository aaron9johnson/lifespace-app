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
      plantMeshesRef.current.forEach((plant) => {
        if (plant.rotation.y < 2.45) {
          plant.rotation.y += 0.01;
        }
      });
      renderer.render(sceneRef.current, threeCameraRef.current);
      glRef.current.endFrameEXP();
    };
    animate();
  };

  let clicks = 0;

const addPlant = () => {
  if (!sceneRef.current || !threeCameraRef.current) return;
  clicks++;

  const group = new THREE.Group();

  if (clicks === 1) {
    // Create a planter box (4 sides)
    const colors = [0x654321, 0x654321, 0x964B00, 0x964B00]; // dark browns
    const spacing = 0.46;

    colors.forEach((color, index) => {
      let geometry;
      let position = new THREE.Vector3();

      switch (index) {
        case 0: geometry = new THREE.BoxGeometry(0.02, 0.25, 0.5); position.set(-spacing / 4, 0, 0); break;
        case 1: geometry = new THREE.BoxGeometry(0.02, 0.25, 0.5); position.set(spacing / 4, 0, 0); break;
        case 2: geometry = new THREE.BoxGeometry(0.25, 0.25, 0.02); position.set(0, 0, -spacing / 2); break;
        case 3: geometry = new THREE.BoxGeometry(0.25, 0.25, 0.02); position.set(0, 0, spacing / 2); break;
      }

      const material = new THREE.MeshStandardMaterial({ color });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(position);
      group.add(mesh);
    });

  } else if (clicks === 2) {
    // Center plant
    const geometry = new THREE.ConeGeometry(0.07, 0.2, 4);
    const material = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    const cone = new THREE.Mesh(geometry, material);
    cone.position.y = 0.15;
    group.add(cone);

  } else if (clicks === 3) {
    // Left side leaf
    const geometry = new THREE.ConeGeometry(0.07, 0.2, 4);
    const material = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    const cone = new THREE.Mesh(geometry, material);
    cone.position.y = 0.15;
    cone.position.z = 0.15;
    group.add(cone);

  } else if (clicks === 4) {
    // Right side leaf
    const geometry = new THREE.ConeGeometry(0.07, 0.2, 4);
    const material = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    const cone = new THREE.Mesh(geometry, material);
    cone.position.y = 0.15;
    cone.position.z = -0.15;
    group.add(cone);
  }

  // Slight downward tilt
  group.rotation.x = 0.2;
  group.rotation.y = 2;

  // Start slightly further back and to the left
  const camera = threeCameraRef.current;
  const position = new THREE.Vector3(-0.3, 0, -2.2);
  position.applyMatrix4(camera.matrixWorld);
  group.position.copy(position);

  sceneRef.current.add(group);
  plantMeshesRef.current.push(group);
};


  const addPlantOld = () => {
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
