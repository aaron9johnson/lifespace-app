import { Image } from 'expo-image';
import { Button, Linking, Platform, StyleSheet, Text, TouchableOpacity, View, ViewComponent } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedCTA } from '@/components/ThemedCTA';
import { ThemedView } from '@/components/ThemedView';
import { Link, useRouter, Stack, useLocalSearchParams } from 'expo-router';

export default function DesignScreen() {
  const router = useRouter();
  const { image, gardens, plants } = useLocalSearchParams<{ image: any; gardens: any; plants: any; }>();
  return (
    <ThemedView style={styles.screen}>
      <ThemedView style={styles.titleContainer}>
        <Image source={image} style={styles.image}></Image>

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
    width: 200,
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
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 64,
    // flexDirection: 'row',
    // alignItems: 'center',
    // gap: 8,
    color: '#595959'
  },
  ctaWrapper: {
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
