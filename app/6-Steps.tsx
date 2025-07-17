import { Image } from 'expo-image';
import { Button, Linking, Platform, StyleSheet, Text, TouchableOpacity, View, ViewComponent, Dimensions, ScrollView } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedCTA } from '@/components/ThemedCTA';
import { ThemedView } from '@/components/ThemedView';
import { Link, useRouter, Stack, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { ThemeCTA } from './aa/ThemeCTA';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

import Data from './data'
import { ThemeView } from './aa/ThemeView';
import { useSharedValue } from 'react-native-reanimated';
import { ThemeText } from './aa/ThemeText';
// import { ScrollView } from 'react-native-gesture-handler';
export default function StepsScreen() {
  const data = [...new Array(3).keys()];
  const width = Dimensions.get("window").width;
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const router = useRouter();
    // const nullPlant = new Plant('', '', '#000000');
  const { image, gardens, types, models, conditions, plants } = useLocalSearchParams<{ image: any; gardens: any; types: any; models: any; conditions: any; plants: any; }>();
  const [plantData, setPlantData] = useState(Data().plants);
  const [gardenData, setGardenData] = useState(Data().gardens);
  console.log('BuyScreen -> plants',  plants);

  const garden = gardenData.find((garden) => garden.name == types.split(',')[0]);
  const color = (garden?.colors || []).find((color) => color.name == models.split(',')[0]);
  // const color = (garden?.colors || []).find((color) => color.name == models.split(',')[0]);

  console.log("check that plants makes sense...", plants)

  const plantsView = plants.split(',').map((plantName) => plantData.find((plant) => plant.name == plantName));

  const viewData = [
    {
      transplant: '',
      nurture: '',
      seed: '',
      grow: ''
    },
    {
      transplant: '',
      nurture: '',
      seed: '',
      grow: ''
    },
    {
      transplant: '',
      nurture: '',
      seed: '',
      grow: ''
    }
  ];

  plantsView.forEach((value, index) => {
    if (!value) return;

    let page = parseInt((parseInt(index) / 3) + '')
    if (value.gardening.transplant != '' && !viewData[page].transplant.includes(value.gardening.transplant)) {
      viewData[page].transplant = viewData[page].transplant + value.gardening.transplant + '\n'
    }
    if (value.gardening.nurture != '' && !viewData[page].nurture.includes(value.gardening.nurture)) {
      viewData[page].nurture = viewData[page].nurture + value.gardening.nurture + '\n'
    }
    if (value.gardening.seed != '' && !viewData[page].seed.includes(value.gardening.seed)) {
      viewData[page].seed = viewData[page].seed + value.gardening.seed + '\n'
    }
    if (value.gardening.grow != '' && !viewData[page].grow.includes(value.gardening.grow)) {
      viewData[page].grow = viewData[page].grow + value.gardening.grow + '\n'
    }

  });

  // for (const [i, value] of plantsView.entries()) {
    
  // }

  

  const renderSlide = ({ index }: { index: number }) => {
    return (
      <View style={styles.slide}>
        <ThemeView style={styles.slideContainer}>
          <ThemeView style={styles.slideTitleContainer}>
            <ThemeText style={styles.slideTitle}>- {index == 0 ? "Spring" : index == 1 ? "Summer" : "Autumn"} -</ThemeText>
          </ThemeView>
          <ThemeView style={styles.slidePlantContainer}>
            <ThemeView style={styles.slidePlant}>
              <Image
                source={plantsView[index * 3]?.image || ''}
                style={styles.image}
              />
            </ThemeView>
            <ThemeView style={styles.slidePlant}>
              <Image
                source={plantsView[index * 3 + 1]?.image || ''}
                style={styles.image}
              />
            </ThemeView>
            <ThemeView style={styles.slidePlant}>
              <Image
                source={plantsView[index * 3 + 2]?.image || ''}
                style={styles.image}
              />
            </ThemeView>
          </ThemeView>
          <ThemeView style={styles.slideWaterContainer}>
            <ThemeText style={styles.slideWaterRange}>{index == 0 ? "Early Spring - Early May" : index == 1 ? "End of May - Early September" : "Mid September - First Frost"}</ThemeText>
            <ThemeText style={styles.slideWaterArrow}>{' o----------------------------------------------->'}</ThemeText>
            {/* {index == 0 ? <>
              <ThemeText style={styles.slideWaterHeader}>Predicted reservor fills</ThemeText>
            </> : <></>} */}
            <Image
                source={require('@/assets/images/water-line-2.png')}
                style={styles.slideWaterImage}
              />
            <ThemeText style={styles.slideWaterText}>{index == 0 ? "Fill reservoir 1-3 x in Spring" : index == 1 ? "Fill reservoir 6-8 x in Summer" : "Fill reservoir 1-3 x in Autumn"}</ThemeText>
          </ThemeView>
          <ScrollView bounces={false} style={styles.slideStepContainer}>
            {viewData[index].seed != '' ? <>
              <ThemeText style={styles.slideStepHeaderBackground}></ThemeText>
              <ThemeText style={styles.slideStepHeader}>
                Direct Seed:
              </ThemeText>

              <ThemeText style={styles.slideStepContent}>
                {viewData[index].seed}
              </ThemeText>
            </> : <></> }

            {viewData[index].transplant != '' ? <>
              <ThemeText style={styles.slideStepHeaderBackground}></ThemeText>
              <ThemeText style={styles.slideStepHeader}>
                Transplant:
              </ThemeText>

              <ThemeText style={styles.slideStepContent}>
                {viewData[index].transplant}
              </ThemeText>
            </> : <></> }

            {viewData[index].nurture != '' ? <>
              <ThemeText style={styles.slideStepHeaderBackground}></ThemeText>
              <ThemeText style={styles.slideStepHeader}>
                Nurture:
              </ThemeText>

              <ThemeText style={styles.slideStepContent}>
                {viewData[index].nurture}
              </ThemeText>
            </> : <></> }

            {viewData[index].grow != '' ? <>
              <ThemeText style={styles.slideStepHeaderBackground}></ThemeText>
              <ThemeText style={styles.slideStepHeader}>
                Grow:
              </ThemeText>

              <ThemeText style={styles.slideStepContent}>
                {viewData[index].grow}
              </ThemeText>
            </> : <></> }

          </ScrollView>
        </ThemeView>
      </View>
    );
  }
  return (
    <ThemedView style={styles.screen}>
      <ThemeText style={styles.slideWaterHeader}>
        <Image
                source={require('@/assets/images/drop.png')}
                style={styles.slideWaterIcon}
              />
        {'= predicted reservor fills\n          (check weekly just in case!)'}
      </ThemeText>
      <ThemeText style={styles.slideWaterHeaderBackground}></ThemeText>
      <ThemeView style={styles.titleContainer}>
        <ThemeText style={styles.titleText}>My Garden</ThemeText>
      </ThemeView>
      <ThemedView style={{ width: Dimensions.get("window").width, backgroundColor: 'red'}}>
        <Carousel
          ref={ref}
          width={Dimensions.get("window").width - 100}
          height={Dimensions.get("window").height - 250}
          data={data}
          onProgressChange={progress}
          containerStyle={{ marginLeft: 50, overflow: 'visible', width: Dimensions.get("window").width - 100 }}
          style={{ overflow: 'visible', width: Dimensions.get("window").width - 200 }}
          renderItem={renderSlide}
        />
      </ThemedView>
      
      <ThemedView style={styles.ctaLogWrapper}>
        <ThemeCTA type='primary' onPress={() => {
          router.push({ 
            pathname: '/7-Buy',
            params: {
              image: image,
              gardens: gardens,
              types: types,
              models: models,
              conditions: conditions,
              plants: plants,
            }
          });
        }}>
          Shop
        </ThemeCTA>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  slide:{
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  },
  slideContainer:{
    // borderWidth: 1,
    // padding: 5,
    backgroundColor: 'white',
    width: Dimensions.get("window").width - 100,
    height: '100%',
    flexDirection: 'column',
    alignSelf: 'center'
  },
  slideTitleContainer: {
    width: Dimensions.get("window").width - 100,
    height: 32,
    backgroundColor: 'white',
  },
  slideTitle: {
    fontSize: 32,
    lineHeight: 32,
    textAlign: 'center',
    color: 'black',
    height: 32,
    backgroundColor: 'white',
    fontFamily: 'Lato'
  },
  slidePlantContainer: {
    width: Dimensions.get("window").width - 100,
    height: 100,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  slidePlant: {
    borderWidth: 1,
    height: 100,
    width: 100,
    borderColor: 'gray',
    overflow: 'hidden'

  },
  slideWaterContainer: {
    width: Dimensions.get("window").width - 100,
    height: 150,
    flexDirection: 'column',
    backgroundColor: 'white',
    
  },
  slideWaterRange: {
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Lato',
    fontSize: 18
  },
  slideWaterImage: {
    width: Dimensions.get("window").width - 100,
    height: 65,
    marginTop: 25

  },
  slideWaterText: {
    color: '#5DADEC',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Lato'
  },
  slideWaterArrow: {
    color: '#85BA2C'
  },
  slideWaterHeader: {
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 16,
    width: 175,
    height: 40,
    position: 'absolute',
    left: 55,
    top: 225,
    zIndex: 9999,
    backgroundColor: 'white',
    wordWrap: 'wrap',
    fontSize: 14,
    lineHeight: 14,
    touchAction: 'none',
    fontFamily: 'Lato',
    // padding: 4
  },
  slideWaterHeaderBackground: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 16,
    width: 175,
    height: 40,
    position: 'absolute',
    left: 58,
    top: 228,
    zIndex: 9998,
    backgroundColor: '#5DADEC',
    wordWrap: 'wrap',
    fontSize: 14,
    lineHeight: 14,
    padding: 4,
    touchAction: 'none'
  },
  slideWaterIcon: {
    height: 15,
    width: 15,

  },
  slideStepContainer: {
    width: Dimensions.get("window").width - 100,
    flexDirection: 'column',
    backgroundColor: 'white',
    height: Dimensions.get("window").height - 530,
    overflow: 'scroll',
    padding: 15,
    // borderWidth: 1
  },
  slideStepHeader: {
    borderWidth: 1,
    borderColor: '#85BA2C',
    fontSize: 24,
    borderRadius: 8,
    width: 125,
    textAlign: 'center',
    color: 'black',
    marginTop: -31,
    backgroundColor: 'white',
    height: 28,
    lineHeight: 28,
    marginBottom: 12,
    fontFamily: 'Lato'
  },
  slideStepHeaderBackground: {
    borderWidth: 1,
    borderColor: '#85BA2C',
    backgroundColor: '#85BA2C',
    borderRadius: 8,
    width: 125,
    marginLeft: 3,
    height: 28,
    lineHeight: 28,
    
  },
  slideStepContent: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Lato'
  },
  container: {
    // paddingTop: 26,
  },
  buttonText: {
    // marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
  },
  screen: {
    margin: 0,
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  titleContainer: {
    backgroundColor: 'transparent',
    height: 54,
    justifyContent:'center',
    alignItems: 'center',

  },
  titleText: {
    fontFamily: 'LatoLightItalic',
    fontSize: 48,
    // color: '#78909c', // darker grey
    color: '#595959', // dark grey
    lineHeight: 48
  },
  ctaLogWrapper: {
    backgroundColor: 'transparent'
  },
});
