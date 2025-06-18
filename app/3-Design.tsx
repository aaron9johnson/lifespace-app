import React, { useRef, useState } from 'react';
import { View, StyleSheet, Button, FlatList, ScrollView } from 'react-native';
import { GLView } from 'expo-gl';
import { Asset } from 'expo-asset';
import { Renderer } from 'expo-three';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, { useSharedValue, runOnJS } from 'react-native-reanimated';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { ThemeView } from './aa/ThemeView';
import { ThemeText } from './aa/ThemeText';
import { ThemeCTA } from './aa/ThemeCTA';

export default function App() {
  const glViewRef = useRef(null);
  const [capturedImageUri, setCapturedImageUri] = useState(null);
  const router = useRouter();
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


  const [selectedModel, setSelectedModel] = useState('LowRider')
  const [selectedColor, setSelectedColor] = useState('Raw Cedar')
  const [activeGarden, setActiveGarden] = useState(0)
  const [colorPickerOpen, setColorPickerOpen] = useState(true)
  const [colorPickerOptions, setColorPickerOptions] = useState([
    {
      name: 'Raw Cedar',
      file: 'low_rider_raw_1_',
      image: require('@/assets/images/RAW_CEDAR.png')
    },
    {
      name: 'Silver Patina',
      file: 'low_rider_raw_1_',
      image: require('@/assets/images/SILVER_PATINA.png')
    },
    {
      name: 'Raven',
      file: 'low_rider_raw_1_',
      image: require('@/assets/images/RAVEN_FINISH.png')
    },
    {
      name: 'Coastal',
      file: 'low_rider_raw_1_',
      image: require('@/assets/images/COASTAL_FINISH.png')
    },
    {
      name: 'Modern Patina',
      file: 'low_rider_raw_1_',
      image: require('@/assets/images/MODERN_PATINA.png')
    },
    {
      name: 'Modern Clear',
      file: 'low_rider_raw_1_',
      image: require('@/assets/images/MODERN_CLEAR.png')
    }
  ])
  const [modelOptions, setModelOptions] = useState([
    {
      name: 'LowRider',
      file: 'low_rider_raw_1_',
      image: require('@/assets/images/low-rider.png')
    },
    {
      name: 'HighRise',
      file: 'low_rider_raw_1_',
      image: require('@/assets/images/highrise.png')
    },
    {
      name: 'Canopy',
      file: 'low_rider_raw_1_',
      image: require('@/assets/images/canopy.png')
    },
    {
      name: 'Artifex',
      file: 'low_rider_raw_1_',
      image: require('@/assets/images/Artifex.png')
    },
    {
      name: 'Garden Box',
      file: 'low_rider_raw_1_',
      image: require('@/assets/images/garden_box.png')
    },
    {
      name: 'Elevated Artifex',
      file: 'low_rider_raw_1_',
      image: require('@/assets/images/elevated-artifex.png')
    }
    
  ])

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
    runOnJS(setColorPickerOpen)(false)
  }).onUpdate(updateScale).onEnd(updateScale);

  const rotateGesture = Gesture.Rotation().onUpdate((e) => {
    runOnJS(setColorPickerOpen)(false)
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
      runOnJS(setColorPickerOpen)(false)
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
    setColorPickerOpen(true)
    if (models.current.length >= 3) {
      setActiveGarden(activeGarden % 3 + 1)
      return;
    }
    
    const objAsset = Asset.fromModule(require('@/assets/models/low_rider_raw_1_.obj'));
    const mtlAsset = Asset.fromModule(require('@/assets/models/low_rider_raw_1_.mtl'));
    await Promise.all([objAsset.downloadAsync(), mtlAsset.downloadAsync()]);

    const mtlLoader = new MTLLoader();
    mtlLoader.setPath('@/assets/models/');
    // mtlLoader.setResourcePath('@/assets/models/');
    const mtlText = await fetch(mtlAsset.uri).then((res) => res.text());
    const materials = mtlLoader.parse(mtlText);
    materials.preload();

    const objLoader = new OBJLoader();

    objLoader.setMaterials(materials);
    objLoader.setPath('@/assets/models/')
    const objText = await fetch(objAsset.uri).then((res) => res.text());
    const object = objLoader.parse(objText);

    // object.traverse((child) => {
    //   if (child.isMesh) {
    //     if (Array.isArray(child.material)) {
    //       console.log(child.material)
    //       child.material[0].map = textures[0];
    //       child.material[1].map = textures[1];
    //       console.log(child.material)
    //     } else {
    //       child.material.map = textures[0];
    //       child.material.emissiveMap = textures[1];
    //     }
    //     child.material.needsUpdate = true;
    //   }
    // });

    // const myGLTFLoader = new GLTFLoader();
    // myGLTFLoader.load( '@/assets/models/low_rider_raw_1_/low_rider_raw_1_.gltf', gltf => {
    //   modelGroup1.current.add( gltf.scene );
    // } );

    switch (activeGarden) {
    case 0:
      setActiveGarden(1)
      object.scale.set(scale1.value, scale1.value, scale1.value);
      const ambientLight1 = new THREE.AmbientLight(0xffffff, 0.5); // white light, intensity 0.5
      modelGroup1.current.add(ambientLight1);
      modelGroup1.current.add(object);
      break;
    case 1:
      setActiveGarden(2)
      object.scale.set(scale2.value, scale2.value, scale2.value);
      const ambientLight2 = new THREE.AmbientLight(0xffffff, 0.5); // white light, intensity 0.5
      modelGroup2.current.add(ambientLight2);
      modelGroup2.current.add(object);
      break;
    case 2:
      setActiveGarden(3)
      object.scale.set(scale3.value, scale3.value, scale3.value);
      const ambientLight3 = new THREE.AmbientLight(0xffffff, 0.5); // white light, intensity 0.5
      modelGroup3.current.add(ambientLight3);
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

    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
    hemiLight.color.setHSL( 0.6, 0.75, 0.5 );
    hemiLight.groundColor.setHSL( 0.095, 0.5, 0.5 );
    hemiLight.position.set( 0, 500, 0 );
    scene.add( hemiLight );

    const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight.position.set( -1, 0.75, 1 );
    dirLight.position.multiplyScalar( 50);
    dirLight.name = "dirlight";
    // dirLight.shadowCameraVisible = true;

    scene.add( dirLight );

    dirLight.castShadow = true;
    // dirLight.shadow.mapSize = 
    dirLight.shadow.mapSize.width = dirLight.shadow.mapSize.height = 1024*2;

    const d = 300;

    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;

    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = -0.0001;
    dirLight.shadow.intensity = 0.35;


    // renderer.toneMapping = THREE.LinearToneMapping

    // renderer.toneMapping = THREE.ACESFilmicToneMapping
//  renderer.toneMappingExposure = 1
//  scene.environment = null

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    // scene.add(new THREE.DirectionalLight(0xffffff, 0.5));


//     const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
// scene.add(ambientLight);

// // Add a directional light
// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
// directionalLight.position.set(1, 1, 1).normalize();
// scene.add(directionalLight);

// const spotlight = new THREE.SpotLight()
// scene.add(spotlight);
    // scene.add(new THREE.DirectionalLight());
    // scene.add(new THREE.HemisphereLight());
    // scene.add(new THREE.AmbientLight());
    // scene.add(new THREE.SpotLight());
    // scene.add(new THREE.PointLight());

    // scene.add(new THREE.HemisphereLight(0xffffff, 0xffffff, 0.50));
    // scene.add(new THREE.DirectionalLight(0xffffff, 0.50));

    // scene.add(new THREE.HemisphereLight());
    // scene.add(new THREE.DirectionalLight());

    // scene.add(new THREE.AmbientLight(0xffffff, 1));
    // scene.add(new THREE.DirectionalLight(0xffffff, 0.5));

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // white light, intensity 0.5
    scene.add(ambientLight);
    scene.add(modelGroup1.current);
    scene.add(modelGroup2.current);
    scene.add(modelGroup3.current);

    modelGroup1.current.add(new THREE.AmbientLight())

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

      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
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

  const confirmDesign = async () => {
    const snap = await handleSnapshot()
    console.log('confirmDesign: ', image);
    router.push({ 
      pathname: '/4-Plant',
      params: {
        image: image,
        gardens: snap
      }
    });
  };

  const handleSnapshot = async () => {
    let u = ''
    if (glViewRef.current) {
      try {
        const snapshot = await glViewRef.current.takeSnapshotAsync({
          format: 'png',
        });
        setCapturedImageUri(snapshot.uri);
        console.log('Snapshot taken:', snapshot.uri);
        u = snapshot.uri
      } catch (error) {
        console.error('Error taking snapshot:', error);
      }
    }
    return u
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, position: 'relative'}}>
      <Image source={image} style={styles.image}></Image>
      <GestureDetector gesture={gesture}>
        <View style={styles.container}>
          <GLView ref={glViewRef} style={styles.glview} onContextCreate={onContextCreate} />
          {/* <View style={styles.buttons}>
            <Button title="Reset" onPress={resetTransform} />
            {models.current.length >= 3 ? <Button title="Next Model" onPress={loadModel} /> : <Button title="Add Model" onPress={loadModel} />}
            {!isRotating ? <Button title="Rotate" onPress={selectRotate}/> : <Button title="Roll" onPress={selectRoll}/> }
          </View> */}
        </View>
      </GestureDetector>

      <ThemeView style={styles.modelPicker}>
        <ScrollView horizontal={true} >
          {modelOptions.map(item => {
            return (
              <ThemeView key={item.name} onTouchEnd={() => {setColorPickerOpen(true); setSelectedModel(item.name); }} style={ item.name != selectedModel ? styles.model : styles.selectedModel }>
                <Image source={item.image} style={styles.modelImage}></Image>
                <ThemeText style={item.name != selectedModel ? styles.modelText : styles.selectedModelText}>
                  {item.name}
                </ThemeText>
              </ThemeView>
            );
          })}
        </ScrollView>
      </ThemeView>

      {colorPickerOpen ?
        <ThemeView style={styles.colorPicker}>
          <ScrollView horizontal={true} >
            {colorPickerOptions.map(item => {
              return (
                <ThemeView key={item.name} onTouchEnd={() => {setSelectedColor(item.name);}} style={item.name != selectedColor ? styles.color : styles.selectedColor }>
                  <Image source={item.image} style={styles.colorImage}></Image>
                </ThemeView>
              );
            })}
          </ScrollView>
        </ThemeView>
      :<></>}

      <ThemeView style={colorPickerOpen ? styles.instructionContainer : styles.instructionContainerNoColor}>
        <ThemeText style={styles.instructionText}>Select Garden And Finish</ThemeText>
      </ThemeView>

      <ThemeView style={styles.instructionContainerBottom}>
        <ThemeText style={styles.instructionText}>Drag to move garden. Use two fingers to scale and {isRotating ? 'roll' : 'rotate'}.</ThemeText>
      </ThemeView>

      <ThemeView style={styles.buttons}>
        <ThemeCTA style={styles.button} textstyle={styles.buttonText} type='secondary' onPress={resetTransform}>
          Reset Position
        </ThemeCTA>
        <ThemeCTA style={styles.button} textstyle={styles.buttonText} type='secondary' onPress={loadModel}>
          Add Garden
        </ThemeCTA>
        <ThemeCTA style={styles.button} textstyle={styles.buttonText} type='secondary' onPress={isRotating ? selectRoll : selectRotate}>
          {isRotating ? 'Roll Mode' : 'Rotate Mode'}
        </ThemeCTA>
        <ThemeCTA style={styles.button} textstyle={styles.buttonText} type='primary' onPress={confirmDesign} >
          Done
        </ThemeCTA>
      </ThemeView>

    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  buttons: {
    position: 'absolute',
    bottom: 44,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'transparent'
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 18,
    textAlign: 'center',
    textAlignVertical: 'center'

  },
  button: {
    maxWidth: 95,
    width: 95,
    minWidth: 95,
    fontSize: 18,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  instructionContainerBottom: {
    // width: '100%',
    height: 100,
    position: 'absolute',
    bottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#000000', // transparent
    // opacity:0.5,
    left: 20,
    right: 20,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  instructionText:{
    fontFamily: 'LatoItalic',
    fontSize: 32,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    lineHeight: 32,
  },
  instructionContainer: {
    // width: '100%',
    height: 100,
    position: 'absolute',
    top: 125,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#000000', // transparent
    // opacity:0.5,
    backgroundColor: 'transparent',
    left: 20,
    right: 20,
    borderRadius: 20,
  },
  instructionContainerNoColor: {
    // width: '100%',
    height: 100,
    position: 'absolute',
    top: 75,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#000000', // transparent
    // opacity:0.5,
    backgroundColor: 'transparent',
    left: 20,
    right: 20,
    borderRadius: 20,
  },
  colorPicker: {
    position: 'absolute',
    top: 95,
    left: 0,
    right: 0,
    width: '100%',
    height: 50,
    backgroundColor: 'transparent'
  },
  color: {
    width: 45,
    height: 45,
    borderRadius: 8,
    borderWidth: 0,
    borderColor: 'white',
    backgroundColor: 'transparent',
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedColor: {
    width: 45,
    height: 45,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'transparent',
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  colorImage: {
    width: 40,
    height: 40,
    objectFit: 'contain',
  },
  model: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 0,
    borderColor: 'white',
    backgroundColor: 'transparent',
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center'

  },
  selectedModel: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'transparent',
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center'

  },
  modelImage: {
    width: 60,
    height: 60,
    objectFit: 'contain',

  },
  modelText: {
    fontFamily: 'Lato',
    textAlign: 'center'

  },
  selectedModelText: {
    fontFamily: 'Lato',
    textAlign: 'center',

  },
  modelPicker: {
    position: 'absolute',
    top: 5,
    left: 0,
    right: 0,
    width: '100%',
    height: 90,
    backgroundColor: 'transparent'

  },
  image: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'grey', // transparent
    objectFit: 'contain',
    // borderRadius: 25,
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
});
