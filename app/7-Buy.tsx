import { Image } from 'expo-image';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ThemeCTA } from './aa/ThemeCTA';

import GardenData, { Garden, GardenColor, GardenBuy } from './data/GardenData'
const gardenData: Array<Garden> = GardenData();
import PlantData, { Plant, PlantInfo } from './data/PlantData'
import { ThemeView } from './aa/ThemeView';
const plantData: Array<Plant> = PlantData();

export default function BuyScreen() {
  const router = useRouter();
  const { image, gardens, types, models, conditions, plants } = useLocalSearchParams<{ image: string; gardens: string; types: string; models: string; conditions: string; plants: any; }>();
  const garden = gardenData.find((garden) => garden.name == types.split(',')[0]);
  const color = (garden?.colors || []).find((color) => color.name == models.split(',')[0]);

  const checkoutPressed = () => Linking.openURL(color?.checkout || '');

  const laterPressed = () => {
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
  }

  return (
    <ThemeView style={styles.screen}>
      <Text style={{ fontSize: 48 }}>{garden?.buy?.name}</Text>
      <ThemeView style={styles.titleContainer}>
        <Image source={image} style={styles.image}></Image>
        <Image source={gardens} style={[styles.image, { backgroundColor: 'transparent', marginTop: -200 }]}></Image>
      </ThemeView>
      <ThemeView style={styles.stepContainer}>
        <Text style={{ fontSize: 24 }}>
          {garden?.buy?.rating} / 5.0 ({garden?.buy?.reviews})
        </Text>
        <Text style={{ fontSize: 32 }}>
          ${garden?.buy?.price}.00
        </Text>
        <Text style={{ fontSize: 16 }}>
          {garden?.buy?.description}
        </Text>
        
        <Text style={{ fontSize: 32 }}>
          Potential Annual Harvest:
        </Text>

        <View style={styles.plantsRow}>
          {plants.split(',').map((plantName: string) => plantData.find((plant: Plant) => plant.name == plantName)).map((item: Plant, index: number) => (
            <View>
              {item && item.icon ?
                <Image source={item.icon} style={[styles.image,{ width: 50, height: 50 }]}></Image>
              : null}
            </View>
          ))}
        </View>
        
      </ThemeView>

      <View style={styles.container}>
        <ThemeCTA textstyle={styles.buttonText} style={styles.button} onPress={checkoutPressed}>Checkout</ThemeCTA>
      </View>
      
      <ThemeView style={styles.ctaLogWrapper}>
        <ThemeCTA type='borderless' onPress={laterPressed}>Later</ThemeCTA>
      </ThemeView>
    </ThemeView>
  );
}

const styles = StyleSheet.create({
  plantsRow: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
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
  button: {
    marginBottom: 8,
  },
  ctaLogWrapper: {
    backgroundColor: 'transparent',
  },
});
