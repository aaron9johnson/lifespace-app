import React, { useRef } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { GLView } from 'expo-gl';
import { Asset } from 'expo-asset';
import { Renderer } from 'expo-three';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, { useSharedValue } from 'react-native-reanimated';
export default function App() {
  
  const models = useRef([]);
  const sceneRef = useRef(null);
  const modelGroup = useRef(new THREE.Group());

  const scale = useSharedValue(0.1);
  const scaleOrigin = useSharedValue(0.1);
  const rotate = useSharedValue({ x: 0, y: 0, z: 0 });
  const translate = useSharedValue({ x: 0, y: 0 });
  const translateOrigin = useSharedValue({ x: 0, y: 0 });

  const resetTransform = () => {
    scale.value = .1;
    rotate.value = { x: 0, y: 0, z: 0 };
    translate.value = { x: 0, y: 0 };
  };

  const pinchGesture = Gesture.Pinch().onStart((e) => {
    scaleOrigin.value = e.scale
  }).onUpdate((e) => {
    console.log("pinch")
    const scaleTemp = (e.scale - scaleOrigin.value) * .01
    const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
    scale.value = clamp(scale.value + scaleTemp, .08, 0.55);
  }).onEnd((e) => {
    const scaleTemp = (e.scale - scaleOrigin.value) * .01
      const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
      scale.value = clamp(scale.value + scaleTemp, .08, 0.55);
    });

  const rotateGesture = Gesture.Rotation().onUpdate((e) => {
    console.log("rotate")
    rotate.value = {
      ...rotate.value,
      y: -e.rotation,
    };
  });

  // const translateUpdate = (e) => {
  //   translate.value = {
  //     x: translateOrigin.value.x + e.translationX * 0.005,
  //     y: translateOrigin.value.y - e.translationY * 0.005,
  //   };
  // }
  // const rollUpdate = (e) => {
  //   rotate.value = {
  //     ...rotate.value,
  //     z: e.translationY,
  //   };
  // }

  const panGesture = Gesture.Pan().minDistance(1)
    .onStart((e) => {
      if (e.numberOfPointers > 1){
        // rollUpdate(e)
        rotate.value = {
          ...rotate.value,
          x: rotate.value.x + e.translationY * 0.0005,
        };
        console.log("rotate up")
      } else {
        translateOrigin.value = {
          x: translate.value.x + e.translationX * 0.005,
          y: translate.value.y - e.translationY * 0.005,
        };
        // translateUpdate(e)
        translate.value = {
          x: translateOrigin.value.x + e.translationX * 0.005,
          y: translateOrigin.value.y - e.translationY * 0.005,
        };
      }
    }).onUpdate((e) => {
      if (e.numberOfPointers > 1){
        // rollUpdate(e)
        rotate.value = {
          ...rotate.value,
          x: rotate.value.x + e.translationY * 0.0005,
        };
        console.log("rotate up...")
      } else {
        // translateUpdate(e)
        translate.value = {
          x: translateOrigin.value.x + e.translationX * 0.005,
          y: translateOrigin.value.y - e.translationY * 0.005,
        };
      }
    }).onEnd((e) => {
      if (e.numberOfPointers > 1){
        // rollUpdate(e)
        rotate.value = {
          ...rotate.value,
          x: rotate.value.x + e.translationY * 0.0005,
        };
        console.log("rotate up.")
      } else {
        // translateUpdate(e)
        translate.value = {
          x: translateOrigin.value.x + e.translationX * 0.005,
          y: translateOrigin.value.y - e.translationY * 0.005,
        };
      }
    });

  

  const gesture = Gesture.Simultaneous(pinchGesture, rotateGesture, panGesture);

  const loadModel = async () => {
    const objAsset = Asset.fromModule(require('@/assets/models/low.obj'));
    const mtlAsset = Asset.fromModule(require('@/assets/models/low.mtl'));
    await Promise.all([objAsset.downloadAsync(), mtlAsset.downloadAsync()]);

    const mtlLoader = new MTLLoader();
    const mtlText = await fetch(mtlAsset.uri).then((res) => res.text());
    const materials = mtlLoader.parse(mtlText);
    materials.preload();

    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    const objText = await fetch(objAsset.uri).then((res) => res.text());
    const object = objLoader.parse(objText);

    object.scale.set(scale.value, scale.value, scale.value);


    const box = new THREE.Box3().setFromObject(object);
    const center = new THREE.Vector3();
    box.getCenter(center);
    object.position.sub(center); // move geometry to center

    modelGroup.current.add(object);
    models.current.push(object);
  };

  const onContextCreate = async (gl) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    const scene = new THREE.Scene();
    // const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    // camera.position.z = 3;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 100);
    camera.position.z = 5;

    sceneRef.current = scene;

    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);

    scene.add(new THREE.AmbientLight(0xffffff, 1));
    scene.add(new THREE.DirectionalLight(0xffffff, 0.5));
    scene.add(modelGroup.current);

    await loadModel(); // Load initial model

    const render = () => {
      requestAnimationFrame(render);

      const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
      const s = clamp(scale.value, 0.08, 0.55);
      const tx = clamp(translate.value.x, -10, 10);
      const ty = clamp(translate.value.y, -10, 10);
      const ry = isNaN(rotate.value.y) ? 0 : rotate.value.y;
      const rz = isNaN(rotate.value.z) ? 0 : rotate.value.z;
      const rx = isNaN(rotate.value.x) ? 0 : rotate.value.x;

      modelGroup.current.scale.set(s, s, s);
      modelGroup.current.rotation.set(rx, ry, rz); // or include X/Z
      modelGroup.current.position.set(tx, ty, 0);
      // modelGroup.current.scale.set(scale.value, scale.value, scale.value);
      // modelGroup.current.rotation.set(rotate.value.x, rotate.value.y, rotate.value.z);
      // modelGroup.current.position.set(translate.value.x, translate.value.y, 0);

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    render();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <View style={styles.container}>
          <GLView style={styles.glview} onContextCreate={onContextCreate} />
          <View style={styles.buttons}>
            <Button title="Reset" onPress={resetTransform} />
            <Button title="Add Model" onPress={loadModel} />
          </View>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent'
  },
  glview: {
    flex:1,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent'
  },
  buttons: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
