import { Image } from 'expo-image';
import { Button, Linking, Platform, StyleSheet, Text, TouchableOpacity, View, ViewComponent } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedCTA } from '@/components/ThemedCTA';
import { ThemedView } from '@/components/ThemedView';
import { Link, useRouter, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ThemeCTA } from './aa/ThemeCTA';

class Plant {
  name: string;
  image: any;
  color: string;
  constructor(name: string, image: any, color: string) {
    this.name  = name;
    this.image  = image;
    this.color  = color;
  }
}
import Data from './data'
export default function BuyScreen() {
  const router = useRouter();
    const nullPlant = new Plant('', '', '#000000');
  const { image, gardens, types, models, conditions, plants } = useLocalSearchParams<{ image: any; gardens: any; types: any; models: any; conditions: any; plants: any; }>();
  const [plantData, setPlantData] = useState(Data().plants);
  const [gardenData, setGardenData] = useState(Data().gardens);
  console.log('BuyScreen -> plants',  plants);

  const garden = gardenData.find((garden) => garden.name == types.split(',')[0]);
  const color = (garden?.colors || []).find((color) => color.name == models.split(',')[0]);

  return (
    <ThemedView style={styles.screen}>
      <Text style={{ fontSize: 48 }}>{garden?.buy?.name}</Text>
      <ThemedView style={styles.titleContainer}>
        <Image source={image} style={styles.image}></Image>
        <Image source={gardens} style={[styles.image, {backgroundColor: 'transparent', marginTop: -200 }]}></Image>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        {/* <Text style={{ fontSize: 48 }}>{garden?.buy?.name}</Text> */}
        <Text style={{ fontSize: 24 }}>{garden?.buy?.rating} / 5.0 ({garden?.buy?.reviews})</Text>
        <Text style={{ fontSize: 32 }}>${garden?.buy?.price}.00</Text>
        <Text style={{ fontSize: 16 }}>{garden?.buy?.description}</Text>
        {/* <ThemeCTA textstyle={styles.buttonText} style={styles.button} onPress={ ()=>{ Linking.openURL(color?.checkout || '')}}>
          Purchase
        </ThemeCTA> */}
        

        <Text style={{ fontSize: 32 }}>Potential Annual Harvest: </Text>
        <View style={{ width: '100%', flexDirection: 'row', backgroundColor: 'white', flexWrap: 'wrap', justifyContent: 'left', alignItems: 'center' }}>
          { plants.split(',').map((plantName) => plantData.find((plant) => plant.name == plantName)).map((item, index) => (
            <>
              <View>
                {item && item.image != '' ? <Image
                  source={item.image}
                  style={[styles.image,{ width: 50, height: 50 }]}
                ></Image> : <></>}
              </View>
            </>
          ))}
        </View>
        
      </ThemedView>
      {/* <ThemedView>
        <ThemedText style={{ fontSize: 24, backgroundColor: 'transparent' }}>Potential Harvest: </ThemedText>
        <View style={styles.dropZone}>
          
        </View>
      </ThemedView> */}

      <View style={styles.container}>
        <ThemeCTA textstyle={styles.buttonText} style={styles.button} onPress={ ()=>{ Linking.openURL(color?.checkout || '')}}>
          Checkout
        </ThemeCTA>
      </View>
      
      <ThemedView style={styles.ctaLogWrapper}>
        <ThemeCTA type='borderless' onPress={() => {
          router.dismissAll()
          router.replace({ 
            pathname: '/8-Home',
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
          Later
        </ThemeCTA>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 26,
  },
  buttonText: {
    marginTop: 10,
  },
  image: {
    width: 200,
    height: 200,
    backgroundColor: 'white',
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
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
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
    paddingLeft: 16,
    paddingRight: 16,
    width: '100%',
    position: 'relative',
  },
  titleText: {
    width: '100%',
    height: 64,
    fontFamily: 'Lato-Thin',
    fontSize: 64,
    textAlign: 'left',
    textAlignVertical: 'center',
    lineHeight: 64,
    color: '#595959'
  },
  stepContainer: {
    backgroundColor: 'transparent', // transparent
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    color: '#595959', // dark grey
    // color: '#ef7e47', // orange
    // color: '#78909c', // darker grey
    // color: '#eeeeee', // light grey
    // color: '#595959', // dark grey
  },
  stepText: {
    width: '100%',
    height: 64,
    fontFamily: 'Lato-Thin',
    fontSize: 64,
    textAlign: 'left',
    textAlignVertical: 'center',
    lineHeight: 64,
    color: '#595959'
  },
  ctaWrapper: {
    backgroundColor: 'white', // orange
    
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    marginBottom: 28,
    width: '100%',
    height: 48,
    lineHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 150,
  },
  button: {
    marginBottom: 8,
  },
  ctaLogWrapper: {
    backgroundColor: 'transparent'
  },
  dropZone: {
    flexDirection: "row",
    alignItems: "center",
    // marginLeft: 50,
    // marginTop: 50,
    flexWrap: "wrap",
    justifyContent: "center",
    width: 300,
    backgroundColor: 'red'
  },
  dropZone1: {
    height: 100,
    width: 100,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#fff",
    borderStyle: "dashed"
  },
  dropZone1f: {
    height: 100,
    width: 100,
    backgroundColor: "green",
    borderWidth: 1,
    borderColor: "#fff",
    borderStyle: "solid"
  },
  dropZone2f: {
    height: 100,
    width: 100,
    backgroundColor: "green",
    borderWidth: 1,
    borderColor: "#fff",
    borderStyle: "solid"
  },
  dropZone3f: {
    height: 100,
    width: 100,
    backgroundColor: "green",
    borderWidth: 1,
    borderColor: "#fff",
    borderStyle: "solid"
  },
  dropZone2: {
    height: 100,
    width: 100,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#fff",
    borderStyle: "dashed"
  },
  dropZone3: {
    height: 100,
    width: 100,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#fff",
    borderStyle: "dashed"
  },
});
