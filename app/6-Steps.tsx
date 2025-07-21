import { Image } from 'expo-image';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useRef } from 'react';
import { ThemeCTA } from './aa/ThemeCTA';
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { ThemeView } from './aa/ThemeView';
import { useSharedValue } from 'react-native-reanimated';
import { ThemeText } from './aa/ThemeText';

// import GardenData, { Garden, GardenColor, GardenBuy } from './data/GardenData'
// const gardenData: Array<Garden> = GardenData();
import PlantData, { getSeasonFromText, Plant, PlantInfo } from './data/PlantData'
const plantData: Array<Plant> = PlantData();

export default function StepsScreen() {
  const data = [0,1,2];
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const router = useRouter();
  const { image, gardens, types, models, conditions, plants } = useLocalSearchParams<{ image: any; gardens: any; types: any; models: any; conditions: any; plants: any; }>();
  const plantsView: Array<Plant> = plants.split(',').map((plantName: string) => plantData.find((plant: Plant) => plant.name == plantName));
  const viewData: Array<PlantInfo> = [new PlantInfo(), new PlantInfo(), new PlantInfo()];

  const shopPressed = () => {
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
  }

  const getPageName = (index: number) => {
    switch (index) {
      case 0: return 'Spring';
      case 1: return 'Summer';
      case 2: return 'Autumn';
      default: return '';
    }
  }
  const getSeasonRange = (index: number) => {
    switch (index) {
      case 0: return 'Early Spring - Early May';
      case 1: return 'End of May - Early September';
      case 2: return 'Mid September - First Frost';
      default: return '';
    }
  }
  const getFillText = (index: number) => {
    switch (index) {
      case 0: return 'Fill reservoir 1-3 x in Spring';
      case 1: return 'Fill reservoir 6-8 x in Summer';
      case 2: return 'Fill reservoir 1-3 x in Autumn';
      default: return '';
    }
  }
  
  plantsView.forEach((value: Plant, index: number) => {
    if (!value) return;
    let pageIndex = parseInt((index / 3) + '');
    let pageName = getPageName(pageIndex);
    let page = viewData[pageIndex];
    let season = value.gardening.find((info: PlantInfo) => info.season == getSeasonFromText(pageName));
    if (season){
      if (season.grow != '' && !page.grow.includes(season.grow)) {
        page.grow += season.grow + '\n'
      }
      if (season.harvest != '' && !page.harvest.includes(season.harvest)) {
        page.harvest += season.harvest + '\n'
      }
      if (season.nurture != '' && !page.nurture.includes(season.nurture)) {
        page.nurture += season.nurture + '\n'
      }
      if (season.seed != '' && !page.seed.includes(season.seed)) {
        page.seed += season.seed + '\n'
      }
      if (season.transplant != '' && !page.transplant.includes(season.transplant)) {
        page.transplant += season.transplant + '\n'
      }
      viewData[pageIndex] = page; // Do I need this?
    }
  });

  const renderSlide = ({ index }: { index: number }) => {
    let page = viewData[index];
    return (
      <View style={styles.slide}>
        <ThemeView style={styles.slideContainer}>
          <ThemeView style={styles.slideTitleContainer}>
            <ThemeText style={styles.slideTitle}>- { getPageName(index) } -</ThemeText>
          </ThemeView>
          <ThemeView style={styles.slidePlantContainer}>
            <ThemeView style={styles.slidePlant}>

              <Image source={plantsView[index * 3]?.image || ''} style={styles.image}></Image>

            </ThemeView>
            <ThemeView style={styles.slidePlant}>

              <Image source={plantsView[index * 3 + 1]?.image || ''} style={styles.image}></Image>

            </ThemeView>
            <ThemeView style={styles.slidePlant}>

              <Image source={plantsView[index * 3 + 2]?.image || ''} style={styles.image}></Image>

            </ThemeView>
          </ThemeView>
          <ThemeView style={styles.slideWaterContainer}>
            <ThemeText style={styles.slideWaterRange}>
              { getSeasonRange(index) }
            </ThemeText>
            <ThemeText style={styles.slideWaterArrow}>
              {' o----------------------------------------------->'}
            </ThemeText>

            <Image source={require('@/assets/images/water-line-2.png')} style={styles.slideWaterImage}></Image>

            <ThemeText style={styles.slideWaterText}>
              { getFillText(index) }
            </ThemeText>
          </ThemeView>
          <ScrollView bounces={false} style={styles.slideStepContainer}>
            {page.seed != '' ?
              <>
                <ThemeText style={styles.slideStepHeaderBackground}></ThemeText>
                <ThemeText style={styles.slideStepHeader}>
                  Direct Seed:
                </ThemeText>

                <ThemeText style={styles.slideStepContent}>
                  {page.seed}
                </ThemeText>
              </> : <></>
            }
            {page.transplant != '' ?
              <>
                <ThemeText style={styles.slideStepHeaderBackground}></ThemeText>
                <ThemeText style={styles.slideStepHeader}>
                  Transplant:
                </ThemeText>

                <ThemeText style={styles.slideStepContent}>
                  { page.transplant }
                </ThemeText>
              </> : <></>
            }
            {page.nurture != '' ?
              <>
                <ThemeText style={styles.slideStepHeaderBackground}></ThemeText>
                <ThemeText style={styles.slideStepHeader}>
                  Nurture:
                </ThemeText>

                <ThemeText style={styles.slideStepContent}>
                  { page.nurture }
                </ThemeText>
              </> : <></>
            }
            {page.grow != '' ?
              <>
                <ThemeText style={styles.slideStepHeaderBackground}></ThemeText>
                <ThemeText style={styles.slideStepHeader}>
                  Grow:
                </ThemeText>

                <ThemeText style={styles.slideStepContent}>
                  { page.grow }
                </ThemeText>
              </> : <></>
            }
          </ScrollView>
        </ThemeView>
      </View>
    );
  }
  return (
    <ThemedView style={styles.screen}>
      <ThemeText style={styles.slideWaterHeader}>
        <Image source={require('@/assets/images/drop.png')} style={styles.slideWaterIcon}></Image>
        {'= predicted reservor fills\n          (check weekly just in case!)'}
      </ThemeText>
      <ThemeText style={styles.slideWaterHeaderBackground}></ThemeText>
      <ThemeView style={styles.titleContainer}>
        <ThemeText style={styles.titleText}>
          My Garden
        </ThemeText>
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
        <ThemeCTA type='primary' onPress={shopPressed}>
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
    backgroundColor: 'white',
  },
  slideContainer:{
    backgroundColor: 'white',
    width: Dimensions.get("window").width - 100,
    height: '100%',
    flexDirection: 'column',
    alignSelf: 'center',
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
    fontFamily: 'Lato',
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
    overflow: 'hidden',

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
    fontSize: 18,
  },
  slideWaterImage: {
    width: Dimensions.get("window").width - 100,
    height: 65,
    marginTop: 25,

  },
  slideWaterText: {
    color: '#5DADEC',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Lato',
  },
  slideWaterArrow: {
    color: '#85BA2C',
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
    touchAction: 'none',
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
    fontFamily: 'Lato',
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
    fontFamily: 'Lato',
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
    lineHeight: 48,
  },
  ctaLogWrapper: {
    backgroundColor: 'transparent',
  },
});
