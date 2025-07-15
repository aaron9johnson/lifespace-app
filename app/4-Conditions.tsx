import React, { useEffect, useRef, useState } from 'react';
import { Button, View, StyleSheet, TouchableWithoutFeedback, type TextProps, TouchableOpacity} from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemeView } from './aa/ThemeView';
import { ThemeText } from './aa/ThemeText';
import { ThemeCTA } from './aa/ThemeCTA';

export default function ConditionsScreen() {
  const router = useRouter();
  const { image, gardens } = useLocalSearchParams<{ image: any; gardens: any; }>();

  const confirmPhoto = async () => {
    console.log('confirmPhoto: ', image);
    router.push({ 
      pathname: '/5-Plant',
      params: {
        image: image,
        gardens: gardens
      }
    });
  };
  return (
    <View style={styles.container}>
      <ThemeView style={styles.imageContainer}>
        <Image source={image} style={styles.image}></Image>
        <Image source={gardens} style={[styles.image, {backgroundColor: 'transparent', marginTop: -300 }]}></Image>
        <ThemeView style={styles.ctaContainer}>
          {/* <ThemeView style={ styles.ctaWrapper }>
            <ThemeText>Location: Vancouver BC</ThemeText>
            <ThemeText>Zone: 8</ThemeText>
            <ThemeCTA type='secondary' onPress={() => {
                confirmPhoto(); // Call the takePhoto function
              }}>
              Enter City
            </ThemeCTA>
          </ThemeView> */}
          <ThemeView style={styles.ctaWrapper2}>
            <ThemeCTA type='primary' onPress={() => {
                confirmPhoto(); // Call the takePhoto function
              }}>
              Full Shade
            </ThemeCTA>
          </ThemeView>

          <ThemeView style={styles.ctaWrapper2}>
            <ThemeCTA type='primary' onPress={() => {
                confirmPhoto(); // Call the takePhoto function
              }}>
              Part Shade
            </ThemeCTA>
          </ThemeView>

          <ThemeView style={styles.ctaWrapper2}>
            <ThemeCTA type='primary' onPress={() => {
                confirmPhoto(); // Call the takePhoto function
              }}>
              Full Sun
            </ThemeCTA>
          </ThemeView>
          
          
        </ThemeView>
        <ThemeView style={styles.instructionContainerBottom}>
          <ThemeText style={styles.instructionText}>Location: Vancouver BC</ThemeText>
          <ThemeText style={styles.instructionText}>Zone: 8</ThemeText>
          <ThemeText></ThemeText>
          <ThemeText style={styles.instructionText}>What level of light is the garden in?</ThemeText>
        </ThemeView>
      </ThemeView>
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
    bottom: 275,
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
    // width: 300,
    // height: 300,
    // backgroundColor: 'white',
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
