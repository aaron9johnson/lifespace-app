import React, { use, useEffect, useRef, useState } from 'react';
import { Button, View, StyleSheet, TouchableWithoutFeedback, type TextProps} from 'react-native';
import { Camera, useCameraPermission, getCameraDevice } from 'react-native-vision-camera';
import { Image } from 'expo-image';

import { GLView } from 'expo-gl';
import * as THREE from 'three';
import { Renderer } from 'expo-three';

import { ThemedText } from '@/components/ThemedText';
import { ThemedCTA } from '@/components/ThemedCTA';
import { ThemedView } from '@/components/ThemedView';
import { useRouter, useLocalSearchParams } from 'expo-router';


export default function DesignScreen() {
  const router = useRouter();
  const cameraRef = useRef(null);
  const glRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const threeCameraRef = useRef(null);
  const plantMeshesRef = useRef([]);
  // const [photo, setPhoto] = useState(null);
  const [plants, setPlants] = useState([]);
  const [gardens, setGardens] = useState([]);
  const [clicks, setClicks] = useState(0);
  const { image } = useLocalSearchParams<{ image: any; }>();


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

const addPlant = () => {
  if (!sceneRef.current || !threeCameraRef.current) return;
  setClicks(clicks + 1)
  // clicks++;

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
  const confirmDesign = async () => {
    router.push({ 
      pathname: '/4-Plant',
      params: {
        image: image,
        gardens: gardens,
        plants: plants,
      }
    });
  };
  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={false}
      />
      <Image source={image} style={styles.image}></Image>
      <TouchableWithoutFeedback onPress={addPlant}>
        <GLView
          style={StyleSheet.absoluteFill}
          onContextCreate={onContextCreate}
        />
      </TouchableWithoutFeedback>

      { clicks > 1 ?
        <ThemedView style={styles.ctaContainer}>
          <ThemedView style={styles.ctaWrapper}>
          <Button
            title={'Cancel'} // Ensure the title is a string
            onPress={() => {
              console.log("cancel")
            }}
            color={'#595959'}
          />
          </ThemedView>
          <ThemedView style={styles.ctaWrapper2}>
            <Button
              title={'Confirm'} // Ensure the title is a string
              onPress={confirmDesign} // Navigate to the Garden AR screen
              color={'#ef7e47'} // Use the theme color
            />
          </ThemedView>
        </ThemedView>
        :
        <ThemedView style={styles.instructionContainer2}>
          <ThemedText type="title" style={{ textAlign: 'center' }}>Place a garden</ThemedText>
        </ThemedView>
      }

      <ThemedView style={styles.instructionContainer}>
        <ThemedText type="title" style={{ textAlign: 'center' }}>Design your Garden</ThemedText>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  instructionContainer: {
    // width: '100%',
    height: 100,
    position: 'absolute',
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000', // transparent
    left: 20,
    right: 20,
  },
  instructionContainer2: {
    // width: '100%',
    height: 100,
    position: 'absolute',
    bottom: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000', // transparent
    left: 20,
    right: 20,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  ctaContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    width: '100%',
    flexDirection: 'row',
    columnGap: 10,
    height: 165,
    padding: 10,
    backgroundColor: 'transparent',
    
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaWrapper: {
    flex: 1,
    padding: 0,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#595959',
    maxHeight: 88,
    minHeight: 66,
    minWidth: 150,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#595959',
    backgroundColor: '#FFFFFF', // ish white
    borderStyle: 'solid',
    tintColor: '#78909c', // dark grey
  },
  ctaWrapper2: {
    flex: 1,
    padding: 0,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ef7e47',
    maxHeight: 88,
    minHeight: 66,
    minWidth: 150,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ef7e47',
    backgroundColor: '#FFFFFF', // ish white
    borderStyle: 'solid',
    tintColor: '#78909c', // dark grey

    // color: '#595959', // dark grey
    // color: '#ef7e47', // orange
    // color: '#78909c', // darker grey
    // color: '#eeeeee', // light grey
    // color: '#595959', // dark grey
  },
});
