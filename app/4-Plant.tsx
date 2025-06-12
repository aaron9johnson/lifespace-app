import React, { useEffect, useRef, useState } from 'react';
import { Button, View, StyleSheet, TouchableWithoutFeedback, type TextProps} from 'react-native';
import { Camera, useCameraPermission, getCameraDevice } from 'react-native-vision-camera';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/ThemedText';
import { ThemedCTA } from '@/components/ThemedCTA';
import { ThemedView } from '@/components/ThemedView';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function PlantScreen() {
  const router = useRouter();
  const { image, gardens, plants } = useLocalSearchParams<{ image: any; gardens: any; plants: any; }>();

  const confirmPhoto = async () => {
    console.log('confirmPhoto: ', image);
    router.push({ 
      pathname: '/3-Design',
      params: {
        image: image
      }
    });
  };
  
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.imageContainer}>
        <Image source={image} style={styles.image}></Image>
        <ThemedView style={styles.ctaContainer}>
          <ThemedView style={styles.ctaWrapper}>
          <Button
            title={'Retake'} // Ensure the title is a string
            onPress={router.back}
            color={'#595959'}
          />
          </ThemedView>
          <ThemedView style={styles.ctaWrapper2}>
            <Button
              title={'Confirm'} // Ensure the title is a string
              onPress={confirmPhoto} // Navigate to the Garden AR screen
              color={'#ef7e47'} // Use the theme color
            />
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
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
    bottom: 20,
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ffffff',
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
