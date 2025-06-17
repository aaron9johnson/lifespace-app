import React, { useRef, useState } from 'react';
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
import { useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { runOnJS } from 'react-native-reanimated';

export default function App() {
  const { image, gardens, plants } = useLocalSearchParams<{ image: any; gardens: any; plants: any; }>();
  const [isRotating, setIsRotating] = useState(true)
  const sceneRef = useRef(null);
  const models = useRef([]);
  const modelGroup1 = useRef(new THREE.Group());
  const modelGroup2 = useRef(new THREE.Group());
  const modelGroup3 = useRef(new THREE.Group());

  const scaleOrigin = useSharedValue(0.1);
  const translateOrigin = useSharedValue({ x: 0, y: 0 });

  const scale1 = useSharedValue(0.1);
  const rotate1 = useSharedValue({ x: 0, y: 0, z: 0 });
  const translate1 = useSharedValue({ x: 0, y: 0 });

  const scale2 = useSharedValue(0.1);
  const rotate2 = useSharedValue({ x: 0, y: 0, z: 0 });
  const translate2 = useSharedValue({ x: 0, y: 0 });

  const scale3 = useSharedValue(0.1);
  const rotate3 = useSharedValue({ x: 0, y: 0, z: 0 });
  const translate3 = useSharedValue({ x: 0, y: 0 });

  const [activeGarden, setActiveGarden] = useState(0)

  const resetTransform = () => {
    switch (activeGarden) {
      case 1:
        scale1.value = .1;
        rotate1.value = { x: 0, y: 0, z: 0 };
        translate1.value = { x: 0, y: 0 };
        break;
      case 2:
        scale2.value = .1;
        rotate2.value = { x: 0, y: 0, z: 0 };
        translate2.value = { x: 0, y: 0 };
        break;
      case 3:
        scale3.value = .1;
        rotate3.value = { x: 0, y: 0, z: 0 };
        translate3.value = { x: 0, y: 0 };
        break;
    }
  };

  function updateScale(e) {
    const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
    const scaleTemp = (e.scale - scaleOrigin.value) * .01
    switch (activeGarden) {
      case 1:
        scale1.value = clamp(scale1.value + scaleTemp, .08, 0.55);
        break;
      case 2:
        scale2.value = clamp(scale2.value + scaleTemp, .08, 0.55);
        break;
      case 3:
        scale3.value = clamp(scale3.value + scaleTemp, .08, 0.55);
        break;
    }
  }

  const pinchGesture = Gesture.Pinch().onStart((e) => {
    scaleOrigin.value = e.scale
  }).onUpdate(updateScale).onEnd(updateScale);

  const rotateGesture = Gesture.Rotation().onUpdate((e) => {
    console.log("rotate")
    switch (activeGarden) {
      case 1:
        if (isRotating) {
          rotate1.value = {
            ...rotate1.value,
            y: -e.rotation,
          };
        } else {
          rotate1.value = {
            ...rotate1.value,
            x: -e.rotation,
          };
        }
        break;
      case 2:
        if (isRotating) {
          rotate2.value = {
            ...rotate2.value,
            y: -e.rotation,
          };
        } else {
          rotate2.value = {
            ...rotate2.value,
            x: -e.rotation,
          };
        }
        break;
      case 3:
        if (isRotating) {
          rotate3.value = {
            ...rotate3.value,
            y: -e.rotation,
          };
        } else {
          rotate3.value = {
            ...rotate3.value,
            x: -e.rotation,
          };
        }
        break;
    }
  });

function updateTranslate(e) {
  switch (activeGarden) {
    case 1:
      translate1.value = {
        x: translateOrigin.value.x + e.translationX * 0.005,
        y: translateOrigin.value.y - e.translationY * 0.005,
      };
      break;
    case 2:
      translate2.value = {
        x: translateOrigin.value.x + e.translationX * 0.005,
        y: translateOrigin.value.y - e.translationY * 0.005,
      };
      break;
    case 3:
      translate3.value = {
        x: translateOrigin.value.x + e.translationX * 0.005,
        y: translateOrigin.value.y - e.translationY * 0.005,
      };
      break;
  }
}
  const panGesture = Gesture.Pan().minDistance(1)
    .onStart((e) => {
      switch (activeGarden) {
        case 1:
          translateOrigin.value = {
            x: translate1.value.x + e.translationX * 0.005,
            y: translate1.value.y - e.translationY * 0.005,
          };
          break;
        case 2:
          translateOrigin.value = {
            x: translate2.value.x + e.translationX * 0.005,
            y: translate2.value.y - e.translationY * 0.005,
          };
          break;
        case 3:
          translateOrigin.value = {
            x: translate3.value.x + e.translationX * 0.005,
            y: translate3.value.y - e.translationY * 0.005,
          };
          break;
      }
      
    }).onUpdate(updateTranslate).onEnd(updateTranslate);

  

  const gesture = Gesture.Simultaneous(pinchGesture, rotateGesture, panGesture);

  const loadModel = async () => {
    if (models.current.length >= 3) {
      setActiveGarden(activeGarden % 3 + 1)
      return;
    }
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

    switch (activeGarden) {
    case 0:
      setActiveGarden(1)
      object.scale.set(scale1.value, scale1.value, scale1.value);
      modelGroup1.current.add(object);
      break;
    case 1:
      setActiveGarden(2)
      object.scale.set(scale2.value, scale2.value, scale2.value);
      modelGroup2.current.add(object);
      break;
    case 2:
      setActiveGarden(3)
      object.scale.set(scale3.value, scale3.value, scale3.value);
      modelGroup3.current.add(object);
      break;
    case 3:
      setActiveGarden(1)
      break;
  }

    const box = new THREE.Box3().setFromObject(object);
    const center = new THREE.Vector3();
    box.getCenter(center);
    object.position.sub(center); // move geometry to center

    models.current.push(object);
  };

  function checkObjects() {
    const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

    const s = clamp(scale1.value, 0.08, 0.55);
    const tx = clamp(translate1.value.x, -10, 10);
    const ty = clamp(translate1.value.y, -10, 10);
    const ry = isNaN(rotate1.value.y) ? 0 : rotate1.value.y;
    const rz = isNaN(rotate1.value.z) ? 0 : rotate1.value.z;
    const rx = isNaN(rotate1.value.x) ? 0 : rotate1.value.x;
    modelGroup1.current.scale.set(s, s, s);
    modelGroup1.current.rotation.set(rx, ry, rz); // or include X/Z
    modelGroup1.current.position.set(tx, ty, 0);

    const s2 = clamp(scale2.value, 0.08, 0.55);
    const tx2 = clamp(translate2.value.x, -10, 10);
    const ty2 = clamp(translate2.value.y, -10, 10);
    const ry2 = isNaN(rotate2.value.y) ? 0 : rotate2.value.y;
    const rz2 = isNaN(rotate2.value.z) ? 0 : rotate2.value.z;
    const rx2 = isNaN(rotate2.value.x) ? 0 : rotate2.value.x;
    modelGroup2.current.scale.set(s2, s2, s2);
    modelGroup2.current.rotation.set(rx2, ry2, rz2); // or include X/Z
    modelGroup2.current.position.set(tx2, ty2, 0);

    const s3 = clamp(scale3.value, 0.08, 0.55);
    const tx3 = clamp(translate3.value.x, -10, 10);
    const ty3 = clamp(translate3.value.y, -10, 10);
    const ry3 = isNaN(rotate3.value.y) ? 0 : rotate3.value.y;
    const rz3 = isNaN(rotate3.value.z) ? 0 : rotate3.value.z;
    const rx3 = isNaN(rotate3.value.x) ? 0 : rotate3.value.x;
    modelGroup3.current.scale.set(s3, s3, s3);
    modelGroup3.current.rotation.set(rx3, ry3, rz3); // or include X/Z
    modelGroup3.current.position.set(tx3, ty3, 0);
  }
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
    scene.add(modelGroup1.current);
    scene.add(modelGroup2.current);
    scene.add(modelGroup3.current);

    await loadModel(); // Load initial model

    const render = () => {
      requestAnimationFrame(render);

      checkObjects()

      // const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
      // const s = clamp(scale.value, 0.08, 0.55);
      // const tx = clamp(translate.value.x, -10, 10);
      // const ty = clamp(translate.value.y, -10, 10);
      // const ry = isNaN(rotate.value.y) ? 0 : rotate.value.y;
      // const rz = isNaN(rotate.value.z) ? 0 : rotate.value.z;
      // const rx = isNaN(rotate.value.x) ? 0 : rotate.value.x;

      // modelGroup.current.scale.set(s, s, s);
      // modelGroup.current.rotation.set(rx, ry, rz); // or include X/Z
      // modelGroup.current.position.set(tx, ty, 0);



      // modelGroup.current.scale.set(scale.value, scale.value, scale.value);
      // modelGroup.current.rotation.set(rotate.value.x, rotate.value.y, rotate.value.z);
      // modelGroup.current.position.set(translate.value.x, translate.value.y, 0);

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    render();
  };

  const selectRotate = () => {
    setIsRotating(true)

  }
  const selectRoll = () => {
    setIsRotating(false)
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Image source={image} style={styles.image}></Image>
      <GestureDetector gesture={gesture}>
        <View style={styles.container}>
          <GLView style={styles.glview} onContextCreate={onContextCreate} />
          <View style={styles.buttons}>
            <Button title="Reset" onPress={resetTransform} />
            {models.current.length >= 3 ? <Button title="Next Model" onPress={loadModel} /> : <Button title="Add Model" onPress={loadModel} />}
            {!isRotating ? <Button title="Rotate" onPress={selectRotate}/> : <Button title="Roll" onPress={selectRoll}/> }
          </View>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  image: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'grey', // transparent
    objectFit: 'contain',
    borderRadius: 25,
    borderWidth: 0,
  },
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
