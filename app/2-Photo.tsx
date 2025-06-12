import React, { useEffect, useRef, useState } from 'react';
import { Button, View, StyleSheet, TouchableWithoutFeedback, type TextProps, TouchableOpacity} from 'react-native';
import { Camera, useCameraPermission, getCameraDevice } from 'react-native-vision-camera';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/ThemedText';
import { ThemedCTA } from '@/components/ThemedCTA';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';

export default function PhotoScreen() {

  if (!Camera.getAvailableCameraDevices) {
    return (<ThemedView style={styles.container}><ThemedCTA lightColor={'#ef7e47'} darkColor={'#595959'} link='/1-Home'>No Camera Permission</ThemedCTA></ThemedView>);
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
    return (<ThemedView style={styles.container}><ThemedCTA lightColor={'#ef7e47'} darkColor={'#595959'} link='/1-Home'>No Camera Permission</ThemedCTA></ThemedView>);
  }
  
  const takePhoto = async () => {
    try {
      const photo = await cameraRef.current.takePhoto({
        flash: 'on',
        enableAutoRedEyeReduction: true
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
      <ThemedView style={styles.cameraContainer}>
        
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
        />
        <ThemedView style={ takingPhoto ? styles.buttonCamera : styles.buttonCameraPhoto}>
          <Button
            title={' '} // Ensure the title is a string
            onPress={() => {
              setTakingPhoto(false);
              takePhoto();
              // takePhoto(); // Call the takePhoto function
            }} // Navigate to the Garden AR screen
            color={'#000000'} // Use the theme color
          />
        </ThemedView>
        <ThemedView style={styles.instructionContainer}>
          <ThemedText type="title" style={{ textAlign: 'center' }}>Where would you like to plan your garden?</ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }
  const renderImage = () => {
    return (
      <ThemedView style={styles.imageContainer}>
        <Image source={image} style={styles.image}></Image>
        <ThemedView style={styles.ctaContainer}>
          <ThemedView style={ styles.ctaWrapper }>
            <Button
              title={'Retake'} // Ensure the title is a string
              onPress={() => {
                setImage(null);
                setTakingPhoto(true);
              }}
              color={'#595959'}
            />
          </ThemedView>
          <ThemedView style={styles.ctaWrapper2}>
            <TouchableOpacity
              onPress={() => {
                confirmPhoto(); // Call the takePhoto function
              }} // Navigate to the Garden AR screen
            >
              <ThemedText type="title" style={{ textAlign: 'center', color: '#ef7e47' }}>Confirm</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.instructionContainerBottom}>
          <ThemedText type="title" style={{ textAlign: 'center' }}>Use this Photo?</ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }
  return (
    <View style={styles.container}>
      { image ? renderImage() : renderCamera() }
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
  instructionContainerBottom: {
    // width: '100%',
    height: 100,
    position: 'absolute',
    bottom: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000', // transparent
    left: 20,
    right: 20,
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
    borderWidth: 6,
    borderColor: '#ffffff',
    width: 75,
    height: 75,
    opacity: 0.5,
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
    borderRadius: 25,
    borderWidth: 0,
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
