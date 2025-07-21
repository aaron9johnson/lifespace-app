import React, { useState } from 'react';
import { View, StyleSheet, TextInput} from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemeView } from './aa/ThemeView';
import { ThemeText } from './aa/ThemeText';
import { ThemeCTA } from './aa/ThemeCTA';
import Entypo from '@expo/vector-icons/Entypo';
import { PlantLight, PlantZone, ZoneData, cityToZone } from './data/PlantData';

const zoneData = ZoneData();

export default function ConditionsScreen() {
  const router = useRouter();
  const { image, gardens, types, models } = useLocalSearchParams<{ image: any; gardens: any; types: any; models: any; }>();
  const [isChangingLocation, setIsChangingLocation] = useState(false);
  const [inputText, setInputText] = useState('');
  const [cityText, setCityText] = useState('Vancouver BC');
  const [plantZone, setPlantZone] = useState(PlantZone.ZONE_8);

  const checkCity = () => {
    const city = inputText;
    const info = cityToZone(city, zoneData);
    if (info.zone != PlantZone.ZONE_0) {
      setPlantZone(info.zone)
      setCityText(city);
      setIsChangingLocation(false);
    } else {
      // no city found
      setCityText(city+"?");
      setIsChangingLocation(false);
    }
  }
  const confirmPhoto = (light: PlantLight) => {
    const conditions = plantZone.toString() + ',' + light;
    router.push({ 
      pathname: '/5-Plant',
      params: {
        image: image,
        gardens: gardens,
        types: types,
        models: models,
        conditions: conditions
      }
    });
  };
  return (
    <View style={styles.container}>
      <ThemeView style={styles.imageContainer}>
        
        {!isChangingLocation ? <Image source={image} style={styles.image}></Image> : <></>}
        {!isChangingLocation ? <Image source={gardens} style={[styles.image, { backgroundColor: 'transparent' }]}></Image> : <></>}
        
        <ThemeView style={styles.instructionContainer}>
          <ThemeText style={styles.titleText}>
            What plants will thrive?
          </ThemeText>
        </ThemeView>
        <ThemeView style={styles.instructionContainerBottom}>

          {isChangingLocation ?
            <View style={{ marginTop: -450 }}>
              <ThemeText style={styles.instructionText}>Enter your City</ThemeText>
              <TextInput
                style={styles.input}
                placeholder="Enter city here"
                onChangeText={setInputText}
                value={inputText}
              />
              <ThemeView style={styles.ctaWrapper2}>

                {inputText.length > 0 ?
                  <ThemeCTA type='primary' onPress={checkCity}>
                    Check Zone
                  </ThemeCTA>
                :
                  <ThemeCTA type='secondary' onPress={() => setIsChangingLocation(false)}>
                    Back
                  </ThemeCTA>
                }

              </ThemeView>

            </View>
          :
          // isChangingLocation == false
            <>
              <ThemeText style={styles.instructionText}>
                Location: <ThemeText style={[styles.instructionText, { fontFamily: 'LatoBold' }]}>{ cityText }</ThemeText>
              </ThemeText>

              <ThemeView style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>
                <ThemeText style={styles.instructionText}>
                  Zone: <ThemeText style={[styles.instructionText, { fontFamily: 'LatoBold' }]}>{ plantZone.toString() }</ThemeText>
                </ThemeText>
                <ThemeView style={[styles.ctaWrapper2, { maxWidth: 115, height: 32, margin: 0, padding: 0, marginTop: -8 }]}>
                  <ThemeCTA style={{ maxWidth: 115, height: 32, margin: 0, padding: 0 }} type='borderless' onPress={() => {
                    setInputText('');
                    setIsChangingLocation(true);
                  }}>
                    Change
                  </ThemeCTA>
                </ThemeView>
              </ThemeView>
              
              <ThemeText style={[styles.instructionText,{ marginTop: 20, marginBottom: 20 }]}>
                What level of light is the garden in?
              </ThemeText>

              <ThemeView style={styles.ctaWrapper2}>
                <ThemeCTA type='secondary' onPress={() => confirmPhoto(PlantLight.FULL_SUN)}>
                  Full Sun
                  <View style={{ width: 20 }}></View>
                  <Entypo name="light-up" size={24} color="black" />
                </ThemeCTA>
              </ThemeView>

              <ThemeView style={styles.ctaWrapper2}>
                <ThemeCTA type='secondary' onPress={() => confirmPhoto(PlantLight.PART_SUN)}>
                  Part Sun
                  <View style={{ width: 20 }}></View>
                  <Entypo name="adjust" size={24} color="black" />
                </ThemeCTA>
              </ThemeView>

              <ThemeView style={styles.ctaWrapper2}>
                <ThemeCTA type='secondary' onPress={() => confirmPhoto(PlantLight.FULL_SHADE)}>
                  No Sun
                  <View style={{ width: 20 }}></View>
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
  instructionText:{
    fontFamily: 'LatoItalic',
    fontSize: 32,
    textAlign: 'center',
    lineHeight: 32,
    color: '#595959',
  },
  titleText:{
    fontFamily: 'LatoItalic',
    fontSize: 32,
    textAlign: 'center',
    lineHeight: 32,
    color: '#595959',
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
    bottom: 275,
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
  ctaWrapper2: {
    backgroundColor: 'transparent',
    marginTop: 10,
  },
});
