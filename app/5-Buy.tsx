import { Image } from 'expo-image';
import { Button, Linking, Platform, StyleSheet, Text, TouchableOpacity, View, ViewComponent } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedCTA } from '@/components/ThemedCTA';
import { ThemedView } from '@/components/ThemedView';
import { Link, useRouter, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

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

export default function DesignScreen() {
  const router = useRouter();
    const nullPlant = new Plant('', '', '#000000');
  const { image, plant1, plant2, plant3, gardens} = useLocalSearchParams<{ image: any; plant1: any; plant2: any; plant3: any; gardens: any; }>();
  const plants = (plant1, plant2, plant3)
  const [plantData, setPlantData] = useState(
      [
        new Plant('Cucc', require('@/assets/images/cuc.png'), '#3CB043'),
        new Plant('Dill', require('@/assets/images/dill.png'), '#5DBB63'),
        new Plant('Carr', require('@/assets/images/carrot.png'), '#466D1D'),
        new Plant('Toma', require('@/assets/images/tomato.png'), '#234F1E'),
        new Plant('Cucc', require('@/assets/images/arug.png'), '#3CB043'),
        new Plant('Dill', require('@/assets/images/dill.png'), '#5DBB63'),
        new Plant('Carr', require('@/assets/images/carrot.png'), '#466D1D'),
        new Plant('Toma', require('@/assets/images/tomato.png'), '#234F1E'),
      ]
    )
  return (
    <ThemedView style={styles.screen}>
      <ThemedView style={styles.titleContainer}>
        <View style={styles.dropZone}>
          { plantData.filter((i) => { return i.name == plant1; }).map((item, index) => (
            <>
              { index == 0 ? <View>
                <Image
                  source={item.image}
                  style={[styles.image,{ width: 100, height: 100 }]}
                ></Image>
              </View> : <></>}
            </>
          ))}
          { plantData.filter((i) => { return i.name == plant2; }).map((item, index) => (
            <>
              { index == 0 ? <View>
                <Image
                  source={item.image}
                  style={[styles.image,{ width: 100, height: 100 }]}
                ></Image>
              </View> : <></>}
            </>
          ))}
          { plantData.filter((i) => { return i.name == plant3; }).map((item, index) => (
            <>
              { index == 0 ? <View>
                <Image
                  source={item.image}
                  style={[styles.image,{ width: 100, height: 100 }]}
                ></Image>
              </View> : <></>}
            </>
          ))}
        </View>
        <Image source={image} style={styles.image}></Image>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Text style={{ fontSize: 48 }}>LowRider Self-Watering Planter</Text>
        <Text style={{ fontSize: 24 }}>***** (24)</Text>
        <Text style={{ fontSize: 32 }}>$339.00</Text>
      </ThemedView>

      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={ ()=>{ Linking.openURL('https://lifespace-projects.myshopify.com/cart/31911805157430:1')}}>
          <Text style={styles.buttonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
      
      <ThemedView style={styles.ctaLogWrapper}>
        <TouchableOpacity style={styles.ctaWrapper} onPress={() => {
          router.dismissAll()
          router.replace({ 
            pathname: '/6-Home',
            params: {
              image: image,
              gardens: gardens,
              plants: plants,
            }
          });
        }}>
          <Text style={styles.ctaText}>Later</Text>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    width: '100%',
    height: 128,
    position: 'relative',
  },
  image: {
    width: 300,
    height: 300,
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
    textAlign: 'left',
    textAlignVertical: 'center',
    lineHeight: 64,
    // flexDirection: 'row',
    // alignItems: 'center',
    // gap: 8,
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
    minWidth: 150,
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
  ctaLogWrapper: {
    color: '#696969', // orange
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
    backgroundColor: 'white', // transparent
    maxWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropZone: {
    flexDirection: "row",
    // justifyContent: "space-around",
    alignItems: "center",
    marginLeft: 50,
    marginTop: 50,
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
