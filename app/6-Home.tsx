import { useRef } from 'react';
import { Image } from 'expo-image';
import { View, Dimensions, Button, Platform, StyleSheet, Text, TouchableOpacity, ViewComponent } from 'react-native';

// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedCTA } from '@/components/ThemedCTA';
import { ThemedView } from '@/components/ThemedView';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
// import Carousel from 'react-native-snap-carousel';

// import * as React from "react";
// import { Dimensions, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

const data = [...new Array(6).keys()];
const width = Dimensions.get("window").width;

export default function HomeAllScreen() {
  const router = useRouter();
  console.log('HomeAllScreen');
  const { image, gardens, plants } = useLocalSearchParams<{ image?: any; gardens?: any; plants?: any; }>();
  console.log('HomeAllScreen2');
  const carouselRef = useRef(null);
  const { width } = Dimensions.get('window');

  const data = [
    { title: 'Item 1', color: 'red' },
    { title: 'Item 2', color: 'blue' },
    { title: 'Item 3', color: 'green' },
  ];
  function renderItem( item: any) {
    return (
      <ThemedView>
        <ThemedView>
          { image ? <Image style={styles.block} source={image}></Image> : <ThemedView style={styles.block2}></ThemedView>}
        </ThemedView>
        <ThemedText>{item.title}</ThemedText>
      </ThemedView>
    );
  };
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  
  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };
  return (
    <ThemedView style={styles.screen}>
      {/* <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.stepText}>Home</ThemedText>
      </ThemedView> */}
        <ThemedView  style={{ backgroundColor: 'white'}}>
          <View>
            <Carousel
              ref={ref}
              width={width}
              height={400}
              data={data}
              onProgressChange={progress}
              renderItem={({ index }) => (
                <View
                  style={{ width: '100%', height: '100%'}}
                >
                  <ThemedView style={{
                    borderWidth: 1,
                    backgroundColor: 'white',
                    maxWidth: 200,
                    borderRadius: 8,
                    width: 500,
                    height: 400,
                    flexDirection: 'column',
                    alignSelf: 'center'
                  }}>
                    <Text style={{ textAlign: "center", fontSize: 30 }}>Garden {index + 1}</Text>
                    <Image style={index % 2 == 0 ? styles.block : styles.block2} source={image}></Image>
                    <Text style={{ textAlign: "left", fontSize: 30 }}>Next Task:</Text>
                    <Text style={{ textAlign: "left", fontSize: 30 }}>Harvest Tomatoes</Text>
                    {/* <ThemedView style={index % 2 == 0 ? styles.blockV : styles.blockV2}></ThemedView> */}
                  </ThemedView>
                  {/* { image ? <Image style={styles.block} source={image}></Image> : <ThemedView style={styles.block2}></ThemedView>}
                  { index % 2 == 0 ? <ThemedView style={styles.block}></ThemedView> : <ThemedView style={styles.block2}></ThemedView>} */}
                </View>
              )}
            />
            <Pagination.Basic
              progress={progress}
              data={data}
              dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
              containerStyle={{ gap: 5, marginTop: 10 }}
              onPress={onPressPagination}
            />
          </View>
        </ThemedView>
      <ThemedView style={styles.ctaWrapper}>
        <TouchableOpacity style={styles.cta} onPress={() => {
          router.dismissAll()
          router.replace('/1-Home')
        }}>
          <Text style={styles.ctaText}>Restart</Text>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  block: {
    height: 300,
    width: 200,
    backgroundColor: 'red',
  },
  block2: {
    height: 300,
    width: 200,
    backgroundColor: 'green',
  },
  blockV: {
    height: 300,
    width: 200,
    backgroundColor: 'red',
  },
  blockV2: {
    height: 300,
    width: 200,
    backgroundColor: 'green',
  },
  image:{
    height: 300,
    width: 200,
  },
  reactLogo: {
    width: '100%',
    height: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    borderWidth: 0,
    marginBottom: -48,
  },
  imgContainer: {
    width: '100%',
    // height: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    // marginBottom: -48,
    backgroundColor: 'transparent', // transparent
  },
  img: {
    width: '100%',
    height: 200,
    maxWidth: 400,
    marginBottom: 28,
    alignSelf: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    borderWidth: 0,
  },
  screen: {
    margin: 0,
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  titleContainer: {
    backgroundColor: '#fff',
    width: '100%',
    // height: 128,
    paddingLeft: 16,
    paddingRight: 16,
  },
  titleText: {
    
    width: '100%',
    height: 64,
    fontFamily: 'Lato-Thin',
    fontSize: 64,
    textAlign: 'left',
    textAlignVertical: 'center',
    lineHeight: 64,
    // flexDirection: 'row',
    // alignItems: 'center',
    // gap: 8,
    color: '#595959'
  },
  stepContainer: {
    backgroundColor: 'transparent', // transparent
    width: '100%',
    // height: 240,
    paddingLeft: 16,
    paddingRight: 16,
    // marginBottom: 32,
    color: '#595959', // dark grey
    color: '#ef7e47', // orange
    color: '#78909c', // darker grey
    color: '#eeeeee', // light grey
    color: '#595959', // dark grey
  },
  stepText: {
    width: '100%',
    height: 64,
    fontFamily: 'Lato-Thin',
    fontSize: 64,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 64,
    // flexDirection: 'row',
    // alignItems: 'center',
    // gap: 8,
    color: '#595959'
  },
  ctaWrapper: {
    width: '100%',
    backgroundColor: 'transparent', // transparent
    
  },
  cta: {
    marginTop: 16,
    backgroundColor: '#ef7e47', // orange
    
    borderRadius: 8,
    borderColor: '#ef7e47',
    borderWidth: 1,
    borderStyle: 'solid',
    marginBottom: 28,
    width: '100%',
    height: 48,
    lineHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  ctaText: {
    color: '#ffffff', // white
    
    
  },
  // cta: {
  //   backgroundColor: '#ef7e47', // orange
  //   height: 48,
  //   fontFamily: 'Lato-Regular',
  //   fontSize: 18,
  //   textAlign: 'center',
  //   textAlignVertical: 'center',
  //   lineHeight: 18,
  //   width: '100%',
  //   color: '#ffffff', // orange
    
    
  // },
  ctaLogWrapper: {
    color: '#ef7e47', // orange
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 18,
    height: 40,
    width: '100%',
    borderRadius: 8,
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: '#595959',
    backgroundColor: 'transparent', // transparent
    maxWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // ctaLog: {
  //   height: 48,
  //   width: '100%',
  //   color: '#595959', // dark grey
  //   fontFamily: 'Lato-Regular',
  //   fontSize: 18,
  //   textAlign: 'center',
  //   textAlignVertical: 'center',
  //   lineHeight: 18,
  //   lightColor: '#ef7e47', // orange
    
  // },
});
