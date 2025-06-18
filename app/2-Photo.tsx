import React, { useEffect, useRef, useState } from 'react';
import { Button, View, StyleSheet, TouchableWithoutFeedback, type TextProps, TouchableOpacity} from 'react-native';
import { Camera, useCameraPermission, getCameraDevice } from 'react-native-vision-camera';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ThemeView } from './aa/ThemeView';
import { ThemeText } from './aa/ThemeText';
import { ThemeCTA } from './aa/ThemeCTA';

export default function PhotoScreen() {

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
  const router = useRouter();
  const cameraRef = useRef(null);
  const [image, setImage] = useState(null);
  const { hasPermission, requestPermission } = useCameraPermission()
  const devices = Camera.getAvailableCameraDevices();
  const device = getCameraDevice(devices, 'back', {
    physicalDevices: ['wide-angle-camera']
  })
  const [takingPhoto, setTakingPhoto] = useState(true);

  if (!hasPermission) {
    requestPermission();
    return errorScreen();
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
  };

  const confirmPhoto = async () => {
    console.log('confirmPhoto: ', image);
    router.push({ 
      pathname: '/3-Design',
      params: {
        image: image
      }
    });
  };
  
  const renderCamera = () => {
    return (
      <ThemeView style={styles.cameraContainer}>
        
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
        />
        <ThemeView style={ takingPhoto ? styles.buttonCamera : styles.buttonCameraPhoto}>
          <Button
            title={' '} // Ensure the title is a string
            onPress={() => {
              setTakingPhoto(false);
              takePhoto();
              // takePhoto(); // Call the takePhoto function
            }} // Navigate to the Garden AR screen
            color={'#000000'} // Use the theme color
          />
        </ThemeView>
        <ThemeView style={styles.instructionContainer}>
          <ThemeText style={styles.instructionText}>Take a photo of the spot you want to transform into a garden</ThemeText>
        </ThemeView>
      </ThemeView>
    );
  }
  const renderImage = () => {
    return (
      <ThemeView style={styles.imageContainer}>
        <Image source={image} style={styles.image}></Image>
        <ThemeView style={styles.ctaContainer}>
          <ThemeView style={ styles.ctaWrapper }>
            <ThemeCTA type='secondary' onPress={() => {
                setImage(null);
                setTakingPhoto(true);
              }}>
              Retake
            </ThemeCTA>
          </ThemeView>
          <ThemeView style={styles.ctaWrapper2}>
            <ThemeCTA type='primary' onPress={() => {
                confirmPhoto(); // Call the takePhoto function
              }}>
              Confirm
            </ThemeCTA>
          </ThemeView>
        </ThemeView>
        <ThemeView style={styles.instructionContainerBottom}>
          <ThemeText style={styles.instructionText}>Use this Photo?</ThemeText>
        </ThemeView>
      </ThemeView>
    );
  }
  return (
    <View style={styles.container}>
      { image ? renderImage() : renderCamera() }
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: '100%',
    padding: 20

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
    // width: '100%',
    height: 100,
    position: 'absolute',
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#000000', // transparent
    // opacity:0.5,
    backgroundColor: 'transparent',
    left: 20,
    right: 20,
    borderRadius: 20,
  },
  instructionContainerBottom: {
    // width: '100%',
    height: 100,
    position: 'absolute',
    bottom: 175,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#000000', // transparent
    // opacity:0.5,
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
    backgroundColor: 'grey', // transparent
    objectFit: 'contain',
    // borderRadius: 25,
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
    backgroundColor: 'transparent'
    
  },
  ctaWrapper2: {
    backgroundColor: 'transparent'
  },
});
