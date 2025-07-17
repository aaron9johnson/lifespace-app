import React, { useEffect, useRef, useState } from 'react';
import { Button, View, StyleSheet, TouchableWithoutFeedback, type TextProps, TouchableOpacity, TextInput} from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemeView } from './aa/ThemeView';
import { ThemeText } from './aa/ThemeText';
import { ThemeCTA } from './aa/ThemeCTA';
import Entypo from '@expo/vector-icons/Entypo';

export default function ConditionsScreen() {
  const router = useRouter();
  const { image, gardens, types, models } = useLocalSearchParams<{ image: any; gardens: any; types: any; models: any; }>();
  const [changingLocation, setChangingLocation] = useState(false);
  const [text, setText] = useState('');
  const [cityText, setCityText] = useState('Vancouver BC');

  const confirmPhoto = async () => {
    console.log('confirmPhoto: ', image);
    router.push({ 
      pathname: '/5-Plant',
      params: {
        image: image,
        gardens: gardens,
        types: types,
        models: models,
        conditions: 8 // zone 8
      }
    });
  };
  return (
    <View style={styles.container}>
      <ThemeView style={styles.imageContainer}>
        {/* <Image source={image} style={styles.image}></Image> */}
        {!changingLocation ? <Image source={image} style={styles.image}></Image> : <></>}
        {!changingLocation ? <Image source={gardens} style={[styles.image, {backgroundColor: 'transparent' }]}></Image> : <></>}

        
        <ThemeView style={styles.instructionContainer}>
          <ThemeText style={styles.titleText}>What plants will thrive?</ThemeText>
        </ThemeView>

        <ThemeView style={styles.instructionContainerBottom}>
          {changingLocation ? 
            <View style={{ marginTop: -450}}>
              <ThemeText style={styles.instructionText}>Enter your City</ThemeText>
              
              <TextInput
                style={styles.input}
                placeholder="Enter city here"
                onChangeText={newText => setText(newText)}
                value={text}
              />

              <ThemeView style={styles.ctaWrapper2}>
                {text.length > 0 ?
                  <ThemeCTA type='primary' onPress={() => {
                      setCityText(text);
                      setChangingLocation(false);
                    }}>
                    Check Zone
                  </ThemeCTA>
                :
                  <ThemeCTA type='secondary' onPress={() => {
                      setChangingLocation(false);
                    }}>
                    Back
                  </ThemeCTA>
                }
              </ThemeView>
            </View>
          :
            <>
              <ThemeText style={styles.instructionText}>Location: <ThemeText style={[styles.instructionText, {fontFamily: 'LatoBold'}]}>{cityText}</ThemeText></ThemeText>
              <ThemeView style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>
                <ThemeText style={styles.instructionText}>Zone: <ThemeText style={[styles.instructionText, {fontFamily: 'LatoBold'}]}>8</ThemeText></ThemeText>

                <ThemeView style={[styles.ctaWrapper2, {maxWidth: 115, height: 32, margin: 0, padding: 0, marginTop: -8}]}>
                  <ThemeCTA style={{maxWidth: 115, height: 32, margin: 0, padding: 0 }} type='borderless' onPress={() => {
                    setText('');
                    setChangingLocation(true);
                  }}>
                    Change
                  </ThemeCTA>
                </ThemeView>
              </ThemeView>
              
              <ThemeText style={[styles.instructionText,{marginTop: 20, marginBottom: 20}]}>What level of light is the garden in?</ThemeText>
              <ThemeView style={styles.ctaWrapper2}>
                <ThemeCTA type='secondary' onPress={() => {
                    confirmPhoto(); // Call the takePhoto function
                  }}>
                  Full Sun
                  <View style={{ width: 20}}></View>
                  <Entypo name="light-up" size={24} color="black" />
                </ThemeCTA>
              </ThemeView>

              <ThemeView style={styles.ctaWrapper2}>
                <ThemeCTA type='secondary' onPress={() => {
                    confirmPhoto(); // Call the takePhoto function
                  }}>
                  Part Sun
                  <View style={{ width: 20}}></View>
                  <Entypo name="adjust" size={24} color="black" />
                </ThemeCTA>
              </ThemeView>

              <ThemeView style={styles.ctaWrapper2}>
                <ThemeCTA type='secondary' onPress={() => {
                    confirmPhoto(); // Call the takePhoto function
                  }}>
                  No Sun
                  <View style={{ width: 20}}></View>
                  <Entypo name="cloud" size={24} color="black" />
                </ThemeCTA>
              </ThemeView>
            </>
          }
        </ThemeView>
      </ThemeView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    fontFamily: 'Lato',
    fontSize: 32,
    textAlign: 'center',
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    // textShadowOffset: {width: -1, height: 1},
    // textShadowRadius: 10,
    lineHeight: 32,
    height: 50,
    width: 300,
    borderWidth: 1,
    color: '#78909c', // darker grey
    borderColor: '#78909c', // darker grey
    borderRadius: 0,
    borderStyle: 'solid',
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: 'white',
  },
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
    fontSize: 32,
    textAlign: 'center',
    lineHeight: 32,
  },
  instructionText:{
    fontFamily: 'LatoItalic',
    fontSize: 32,
    textAlign: 'center',
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    // textShadowOffset: {width: -1, height: 1},
    // textShadowRadius: 10,
    lineHeight: 32,
    color: '#595959',
  },
  titleText:{
    fontFamily: 'LatoItalic',
    fontSize: 32,
    textAlign: 'center',
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    // textShadowOffset: {width: -1, height: 1},
    // textShadowRadius: 10,
    lineHeight: 32,
    color: '#595959',
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
    backgroundColor: 'white',
  },
  image: {
    top: 100,
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: 'white',

  },
  imageOld:{
    marginTop: -300,
    marginBottom: 50,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'transparent',
    // backgroundColor: 'grey', // transparent
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
    backgroundColor: 'transparent',
    marginTop: 10,

  },
});
