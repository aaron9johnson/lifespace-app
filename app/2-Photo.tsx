import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Camera, getCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { ThemeCTA } from './aa/ThemeCTA';
import { ThemeText } from './aa/ThemeText';
import { ThemeView } from './aa/ThemeView';

export default function PhotoScreen() {
  const router = useRouter();
  const cameraRef = useRef(null);
  const { hasPermission, requestPermission } = useCameraPermission()
  const devices = Camera.getAvailableCameraDevices();
  const device = getCameraDevice(devices, 'back', {
    physicalDevices: ['wide-angle-camera']
  })
  const [image, setImage] = useState(null);
  const [isTakingPhoto, setIsTakingPhoto] = useState(true);

  const errorScreen = () => {
    return (
      <ThemeView style={styles.container}>
        <ThemeView style={styles.errorContainer}>
          <ThemeText style={styles.errorText}>LifeSpace Requires Camera Permission</ThemeText>
          <ThemeText style={styles.errorTextSmall}>Allow LifeSpace To Access Camera In Settings</ThemeText>
        </ThemeView>
        <ThemeCTA type='borderless' backlink='/1-Home'>Back</ThemeCTA>
      </ThemeView>
    );
  }

  if (!Camera.getAvailableCameraDevices) {
    return errorScreen();
  }

  if (!hasPermission) {
    requestPermission();
    return errorScreen();
  }
  
  const capturePressed = () => {
    if (!isTakingPhoto) return;
    setIsTakingPhoto(false);
    takePhoto();
  }
  const takePhoto = async () => {
    try {
      const photo = await cameraRef.current.takePhoto({
        flash: 'off',
        enableAutoRedEyeReduction: false,
        enableShutterSound: false
      });
      setImage(photo.path);
    } catch (err) {
      console.log('err: ', err);
    }
  }

  const confirmPhoto = () => {
    router.push({ 
      pathname: '/3-Design',
      params: {
        image: image
      }
    });
  };
  
  const renderCamera = () => {
    return (
      <View style={styles.container}>
        <ThemeView style={styles.cameraContainer}>
          
          <Camera
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
          />
          
          <TouchableOpacity style={ isTakingPhoto ? styles.buttonCamera : styles.buttonCameraPhoto} onPress={capturePressed}></TouchableOpacity>
            
          <ThemeView style={styles.instructionContainer}>
            <ThemeText style={styles.instructionText}>
              Take a photo of the spot you want to transform into a garden
            </ThemeText>
          </ThemeView>
          
        </ThemeView>
      </View>
    );
  }
  const renderImage = () => {
    return (
      <View style={styles.container}>
        <ThemeView style={styles.imageContainer}>
          <Image source={'file://' + image} style={styles.image}></Image>
          <ThemeView style={styles.ctaContainer}>
            <ThemeView style={ styles.ctaWrapper }>
              <ThemeCTA type='secondary' onPress={() => {
                setImage(null);
                setIsTakingPhoto(true);
              }}>
                Retake
              </ThemeCTA>
            </ThemeView>
            <ThemeView style={styles.ctaWrapper2}>
              <ThemeCTA type='primary' onPress={confirmPhoto}>
                Confirm
              </ThemeCTA>
            </ThemeView>
          </ThemeView>
          <ThemeView style={styles.instructionContainerBottom}>
            <ThemeText style={styles.instructionText}>
              Use this Photo?
            </ThemeText>
          </ThemeView>
        </ThemeView>
      </View>
    );
  }
  return image ? renderImage() : renderCamera();
}

const styles = StyleSheet.create({
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: '100%',
    padding: 20,
  },
  errorText: {
    fontFamily: 'LatoItalic',
    fontSize: 32,
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 24,
  },
  errorTextSmall: {
    fontFamily: 'LatoThinItalic',
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 24,
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
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    left: 20,
    right: 20,
    borderRadius: 20,
  },
  instructionContainerBottom: {
    height: 100,
    position: 'absolute',
    bottom: 175,
    justifyContent: 'center',
    alignItems: 'center',
    left: 20,
    right: 20,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  cameraContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  buttonCamera: {
    position: 'absolute',
    bottom: 40,
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 37,
    borderWidth: 6,
    borderColor: '#ffffff',
    width: 75,
    height: 75,
  },
  buttonCameraPhoto: {
    position: 'absolute',
    bottom: 40,
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 37,
    borderColor: '#ffffff',
    width: 75,
    height: 75,
    borderWidth: 0,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'relative',
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
  ctaContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    width: '100%',
    flexDirection: 'column-reverse',
    rowGap: 10,
    height: 165,
    padding: 10,
    backgroundColor: 'transparent',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaWrapper: {
    backgroundColor: 'transparent',
  },
  ctaWrapper2: {
    backgroundColor: 'transparent',
  },
});
