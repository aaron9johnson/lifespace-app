import { Asset } from 'expo-asset';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ExpoTHREE, { Renderer } from 'expo-three';
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { runOnJS, useSharedValue } from 'react-native-reanimated';
import * as THREE from 'three';
import { ThemeCTA } from './aa/ThemeCTA';
import { ThemeText } from './aa/ThemeText';
import { ThemeView } from './aa/ThemeView';

import GardenData, { Garden, GardenColor } from './data/GardenData';
const gardenData: Array<Garden> = GardenData();
// import PlantData, { Plant, PlantInfo } from './data/PlantData'
// const plantData: Array<Plant> = PlantData();

export default function App() {
  const SCALE_MIN = 0.1;
  const SCALE_MAX = 1.0;
  const SCALE_INIT = 0.2;

  const glViewRef = useRef(null);
  const { image } = useLocalSearchParams<{ image: any; }>();
  const router = useRouter();

  const modelGroup1 = useRef(new THREE.Group());
  const modelGroup2 = useRef(new THREE.Group());
  const modelGroup3 = useRef(new THREE.Group());
  const scaleOrigin = useSharedValue(SCALE_INIT);
  const translateOrigin = useSharedValue({ x: 0, y: 0 });
  const scale1 = useSharedValue(SCALE_INIT);
  const rotate1 = useSharedValue({ x: 0, y: 0, z: 0 });
  const translate1 = useSharedValue({ x: 0, y: 0 });
  const scale2 = useSharedValue(SCALE_INIT);
  const rotate2 = useSharedValue({ x: 0, y: 0, z: 0 });
  const translate2 = useSharedValue({ x: 0, y: 0 });
  const scale3 = useSharedValue(SCALE_INIT);
  const rotate3 = useSharedValue({ x: 0, y: 0, z: 0 });
  const translate3 = useSharedValue({ x: 0, y: 0 });

  const [confirmingDesign, setConfirmingDesign] = useState(false);
  const [isRotating, setIsRotating] = useState(true)
  const [modelCount, setModelCount] = useState(0);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(true);
  const [colorPickerOptions, setColorPickerOptions] = useState(gardenData[0].colors)
  const [selectedModel, setSelectedModel] = useState('LowRider');
  const [selectedColor, setSelectedColor] = useState('Raw Cedar');
  const [activeGarden, setActiveGarden] = useState(0);

  const [gardenTypes, setGardenTypes] = useState([['LowRider', 'Raw Cedar'], [], []]);

  const clamp = (val: number, min: number, max: number): number => {
    'worklet'; // ui thread error fix
    return Math.max(min, Math.min(max, val));
  }

  const resetTransform = () => {
    switch (activeGarden) {
      case 1:
        scale1.value = SCALE_INIT;
        rotate1.value = { x: 0, y: 0, z: 0 };
        translate1.value = { x: 0, y: 0 };
        break;
      case 2:
        scale2.value = SCALE_INIT;
        rotate2.value = { x: 0, y: 0, z: 0 };
        translate2.value = { x: 0, y: 0 };
        break;
      case 3:
        scale3.value = SCALE_INIT;
        rotate3.value = { x: 0, y: 0, z: 0 };
        translate3.value = { x: 0, y: 0 };
        break;
    }
  };

  function updateScale(e) {
    const scaleTemp = (e.scale - scaleOrigin.value) * .01
    switch (activeGarden) {
      case 1:
        scale1.value = clamp(scale1.value + scaleTemp, SCALE_MIN, SCALE_MAX);
        break;
      case 2:
        scale2.value = clamp(scale2.value + scaleTemp, SCALE_MIN, SCALE_MAX);
        break;
      case 3:
        scale3.value = clamp(scale3.value + scaleTemp, SCALE_MIN, SCALE_MAX);
        break;
    }
  }

  const pinchGesture = Gesture.Pinch().onStart((e) => {
    scaleOrigin.value = e.scale
    runOnJS(setIsColorPickerOpen)(false)
  }).onUpdate(updateScale).onEnd(updateScale);

  const rotateGesture = Gesture.Rotation().onUpdate((e) => {
    runOnJS(setIsColorPickerOpen)(false)
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
      runOnJS(setIsColorPickerOpen)(false)
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

  const updateModel = async (model: GardenColor) => {
    let tempTypes = [...gardenTypes];
    tempTypes[activeGarden - 1][0] = selectedModel
    tempTypes[activeGarden - 1][1] = model.name;
    setGardenTypes(tempTypes);

    let group: THREE.Group;
    // let translate: any;
    // let scale: any;
    switch(activeGarden) {
      case 2:
        group = modelGroup2.current;
        // translate = translate2.value;
        // scale = scale2.value;
        break;
      case 3:
        group = modelGroup3.current;
        // translate = translate3.value;
        // scale = scale3.value;
        break;
      default:
        group = modelGroup1.current;
        // translate = translate1.value;
        // scale = scale1.value;
        break;
    }
    group.add(new THREE.AmbientLight(0xffffff, 100000)); // whiteout

    let object = await loadOBJ(model);
    group.clear()
    group.add(object);

    // object.position.set(translate.x, translate.y, 0)
    // object.scale.set(scale, scale, scale);
  }
  
  const loadOBJ = async (model: GardenColor): Promise<THREE.Object3D> => {
    console.log("loadOBJ: ", model)
    const obj = await ExpoTHREE.loadDaeAsync({
      asset: model.dae,
      onAssetRequested: (m: string) => Asset.fromModule(model.daeImages[m]).downloadAsync(),
      onProgress: () => {}
    });
    // console.log("obj.scene:", obj.scene)
    return obj.scene;
  }

  const loadModel = async (model: GardenColor) => {
    setIsColorPickerOpen(true);

    if (modelCount >= 3) {
      setActiveGarden(activeGarden % 3 + 1)
      return;
    }
    
    const object = await loadOBJ(model);

    switch (activeGarden) {
      case 0:
        setActiveGarden(1);
        modelGroup1.current.add(object);
        // object.scale.set(scale1.value, scale1.value, scale1.value);
        break;
      case 1:
        setActiveGarden(2);
        modelGroup2.current.add(object);
        // object.scale.set(scale2.value, scale2.value, scale2.value);
        break;
      case 2:
        setActiveGarden(3);
        modelGroup3.current.add(object);
        // object.scale.set(scale3.value, scale3.value, scale3.value);
        break;
      default:
        break;
    }

    const box = new THREE.Box3().setFromObject(object);
    const center = new THREE.Vector3();
    box.getCenter(center);
    object.position.sub(center); // move geometry to center
    
    setModelCount(modelCount + 1);

    let tempTypes = [...gardenTypes];
    tempTypes[activeGarden - 1][0] = 'LowRider' // new models always LowRider / Raw Cedar
    tempTypes[activeGarden - 1][1] = 'Raw Cedar'; // model.name;
    setGardenTypes(tempTypes);
  };
  
  const updateObjects = () => {
    const s = clamp(scale1.value, SCALE_MIN, SCALE_MAX);
    const tx = clamp(translate1.value.x, -10, 10);
    const ty = clamp(translate1.value.y, -10, 10);
    const ry = isNaN(rotate1.value.y) ? 0 : rotate1.value.y;
    const rz = isNaN(rotate1.value.z) ? 0 : rotate1.value.z;
    const rx = isNaN(rotate1.value.x) ? 0 : rotate1.value.x;
    modelGroup1.current.scale.set(s, s, s);
    modelGroup1.current.rotation.set(rx, ry, rz); // or include X/Z
    modelGroup1.current.position.set(tx, ty, 0);

    const s2 = clamp(scale2.value, SCALE_MIN, SCALE_MAX);
    const tx2 = clamp(translate2.value.x, -10, 10);
    const ty2 = clamp(translate2.value.y, -10, 10);
    const ry2 = isNaN(rotate2.value.y) ? 0 : rotate2.value.y;
    const rz2 = isNaN(rotate2.value.z) ? 0 : rotate2.value.z;
    const rx2 = isNaN(rotate2.value.x) ? 0 : rotate2.value.x;
    modelGroup2.current.scale.set(s2, s2, s2);
    modelGroup2.current.rotation.set(rx2, ry2, rz2); // or include X/Z
    modelGroup2.current.position.set(tx2, ty2, 0);

    const s3 = clamp(scale3.value, SCALE_MIN, SCALE_MAX);
    const tx3 = clamp(translate3.value.x, -10, 10);
    const ty3 = clamp(translate3.value.y, -10, 10);
    const ry3 = isNaN(rotate3.value.y) ? 0 : rotate3.value.y;
    const rz3 = isNaN(rotate3.value.z) ? 0 : rotate3.value.z;
    const rx3 = isNaN(rotate3.value.x) ? 0 : rotate3.value.x;
    modelGroup3.current.scale.set(s3, s3, s3);
    modelGroup3.current.rotation.set(rx3, ry3, rz3); // or include X/Z
    modelGroup3.current.position.set(tx3, ty3, 0);
  }

  const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    // const pixelStorei = gl.pixelStorei.bind(gl); // removes the warning EXGL: gl.pixelStorei() doesn't support this parameter yet!
    // gl.pixelStorei = function(...args){const [parameter]=args;switch(parameter){case gl.UNPACK_FLIP_Y_WEBGL:return pixelStorei(...args)}};

    // Setup
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 100);
    camera.position.z = 5;
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);

    const scene = new THREE.Scene();
    scene.add(modelGroup1.current);
    scene.add(modelGroup2.current);
    scene.add(modelGroup3.current);

    // Lighting
    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
    hemiLight.color.setHSL( 0.6, 0.75, 0.5 );
    hemiLight.groundColor.setHSL( 0.095, 0.5, 0.5 );
    hemiLight.position.set( 0, 500, 0 );
    scene.add(hemiLight);
    const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight.position.set( -1, 0.75, 1 );
    dirLight.position.multiplyScalar( 50);
    dirLight.name = "dirlight";
    scene.add(dirLight);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = dirLight.shadow.mapSize.height = 1024*2;
    const d = 300;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = -0.0001;
    dirLight.shadow.intensity = 0.35;
    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1); // HemisphereLight - color feels nicer
    scene.add(hemisphereLight);

     // Load initial model
    await loadModel(gardenData[0].colors[0]);

    // Render Loop
    const render = () => {
      requestAnimationFrame(render);
      updateObjects();
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  };

  const confirmDesign = () => {
    if (confirmingDesign) return;
    setConfirmingDesign(true);
    snapshotDesign();
  }
  const snapshotDesign = async () => {
    const snapshot = await handleGLSnapshot();
    if (snapshot != '') {
      router.push({ 
        pathname: '/4-Conditions',
        params: {
          image: image,
          gardens: snapshot,
          types: gardenTypes.map((i) => i[0]).join(','), // ['LowRider', 'HighRise', '']
          models: gardenTypes.map((i) => i[1]).join(','),
        }
      });
    }
    setConfirmingDesign(false);
  };
  const handleGLSnapshot = async (): Promise<string> => {
    if (glViewRef.current) {
      try {
        const snapshot = await glViewRef.current.takeSnapshotAsync({ format: 'png' });
        return snapshot.uri;
      } catch (error) {
        console.error('Error taking snapshot:', error);
      }
    }
    return '';
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, position: 'relative'}}>

      <Image source={'file://' + image} style={styles.image}></Image>

      <GestureDetector gesture={gesture}>
        <View style={styles.container}>
          <GLView ref={glViewRef} style={styles.glview} onContextCreate={onContextCreate} />
        </View>
      </GestureDetector>

      <ThemeView style={styles.modelPicker}>
        <ScrollView horizontal={true} >
          {gardenData.map(garden =>
            <ThemeView key={garden.name} style={ garden.name != selectedModel ? styles.model : styles.selectedModel } onTouchEnd={() => {
              setColorPickerOptions(garden.colors);
              setIsColorPickerOpen(true);
              setSelectedModel(garden.name);
              setSelectedColor(garden.colors[0].name);
              updateModel(garden.colors[0]);
            }}>
              <Image source={garden.image} style={styles.modelImage}></Image>
              <ThemeText style={garden.name != selectedModel ? styles.modelText : styles.selectedModelText}>
                { garden.name }
              </ThemeText>
            </ThemeView>
          )}
        </ScrollView>
      </ThemeView>

      {isColorPickerOpen ?
        <ThemeView style={styles.colorPicker}>
          <ScrollView horizontal={true}>
            {colorPickerOptions.map(colorOption => 
              <ThemeView key={colorOption.name} style={colorOption.name != selectedColor ? styles.color : styles.selectedColor } onTouchEnd={() => {
                setSelectedColor(colorOption.name);
                updateModel(colorOption);
              }}>
                <Image source={colorOption.image} style={styles.colorImage}></Image>
              </ThemeView>
            )}
          </ScrollView>
        </ThemeView>
      :null}

      <ThemeView style={isColorPickerOpen ? styles.instructionContainer : styles.instructionContainerNoColor}>
        <ThemeText style={styles.instructionText}>
          { isColorPickerOpen ? 'Select Garden And Finish' : 'Position Garden' }
        </ThemeText>
      </ThemeView>

      <ThemeView style={styles.instructionContainerBottom}>
        <ThemeText style={styles.instructionText}>
          Drag to move garden. Use two fingers to scale and {!isRotating ? 'roll' : 'rotate'}.
        </ThemeText>
      </ThemeView>

      <ThemeView style={styles.buttons}>
        <ThemeCTA style={styles.button} textstyle={styles.buttonText} type='secondary' onPress={resetTransform}>
          Reset Position
        </ThemeCTA>
        <ThemeCTA style={styles.button} textstyle={styles.buttonText} type='secondary' onPress={() => loadModel(gardenData[0].colors[0])}>
          Add Garden
        </ThemeCTA>
        <ThemeCTA style={styles.button} textstyle={styles.buttonText} type='secondary' onPress={() => isRotating ? setIsRotating(false) : setIsRotating(true)}>
          { isRotating ? 'Roll Mode' : 'Rotate Mode' }
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
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  button: {
    maxWidth: 95,
    width: 95,
    minWidth: 95,
    fontSize: 18,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionContainerBottom: {
    height: 100,
    position: 'absolute',
    bottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
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
    height: 100,
    position: 'absolute',
    top: 125,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    left: 20,
    right: 20,
    borderRadius: 20,
  },
  instructionContainerNoColor: {
    height: 100,
    position: 'absolute',
    top: 75,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: 'transparent',
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
    alignItems: 'center',
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
    alignItems: 'center',
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
    justifyContent: 'center',
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
    justifyContent: 'center',
  },
  modelImage: {
    width: 60,
    height: 60,
    objectFit: 'contain',
  },
  modelText: {
    fontFamily: 'Lato',
    textAlign: 'center',
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
    backgroundColor: 'transparent',
  },
  image: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'grey',
    objectFit: 'contain',
    borderWidth: 0,
  },
  container: {
    flex:1,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  glview: {
    flex:1,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
});
