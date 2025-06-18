import { Image } from 'expo-image';
import { Button, Platform, StyleSheet, Text, ViewComponent } from 'react-native';

import { useRouter } from 'expo-router';
import { ThemeView } from './aa/ThemeView';
import { ThemeText } from './aa/ThemeText';
import { ThemeCTA } from './aa/ThemeCTA';


export default function StartScreen() {
  const router = useRouter();
  return (
    <ThemeView style={styles.screen}>
      <ThemeView style={styles.titleContainer}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
        />
      </ThemeView>
      <ThemeView style={styles.stepContainer}>
        <ThemeText type="subtitle" style={styles.stepText}>Effortless</ThemeText>
        <ThemeText type="subtitle" style={styles.stepText}>Garden</ThemeText>
        <ThemeText type="subtitle" style={styles.stepText}>Design</ThemeText>
        {/* <ThemeText type="subtitle" style={styles.stepText}>Design</ThemeText>
        <ThemeText type="subtitle" style={styles.stepText}>Your</ThemeText>
        <ThemeText type="subtitle" style={styles.stepText}>Garden</ThemeText> */}
      </ThemeView>
      
      {/* <ThemeView style={styles.imgContainer}>
        <Image
          source={require('@/assets/images/low.png')}
          style={styles.img}
        />
      </ThemeView> */}

      <ThemeText style={styles.description}>
        Capture your space, place your garden, and start planting in minutes.
      </ThemeText>

      <ThemeView style={styles.ctaWrapper}>
        <ThemeCTA link='/2-Photo'>Get Started</ThemeCTA>
      </ThemeView>

      <ThemeView style={styles.ctaLogWrapper}>
        <ThemeCTA type='borderless' link='/Login' >Login</ThemeCTA>
      </ThemeView>

    </ThemeView>
  );
}

const styles = StyleSheet.create({
  description: {
    fontFamily: 'LatoLightItalic',
    color: '#595959',
    fontSize: 32,
    lineHeight: 32,
    textAlign: 'center',
    maxWidth: 300,
    marginBottom: 32
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
    paddingLeft: 16,
    paddingRight: 16,
  },
  logo: {
    width: '100%',
    height: 150,
    alignSelf: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    borderWidth: 0,
    marginBottom: 20,
  },
  stepContainer: {
    backgroundColor: 'transparent',
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    color: '#595959', // dark grey
    marginBottom: 81,
  },
  stepText: {
    width: '100%',
    height: 64,
    fontFamily: 'LatoLightItalic',
    // fontStyle: 'italic',
    fontSize: 64,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 64,
    color: '#595959',
    margin: 0,
    letterSpacing: 0.9,
    padding: 0

  },
  imgContainer: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  img: {
    width: '100%',
    height: 75,
    maxWidth: 150,
    marginBottom: 28,
    alignSelf: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    borderWidth: 0,
  },
  ctaWrapper: {
    marginBottom: 20,
    backgroundColor: 'transparent'
    
  },
  ctaLogWrapper: {
    marginBottom: 20,
    backgroundColor: 'transparent'
  }
});
//   reactLogo: {
//     width: '100%',
//     height: 200,
//     alignSelf: 'center',
//     justifyContent: 'center',
//     resizeMode: 'contain',
//     borderWidth: 0,
//     marginBottom: -48,
//   },
//   imgContainer: {
//     width: '100%',
//     // height: 200,
//     alignSelf: 'center',
//     justifyContent: 'center',
//     // marginBottom: -48,
//     backgroundColor: 'transparent', // transparent
//   },
//   img: {
//     width: '100%',
//     height: 200,
//     maxWidth: 400,
//     marginBottom: 28,
//     alignSelf: 'center',
//     justifyContent: 'center',
//     resizeMode: 'contain',
//     borderWidth: 0,
//   },
  
//   titleContainer: {
//     backgroundColor: '#fff',
//     width: '100%',
//     // height: 128,
//     paddingLeft: 16,
//     paddingRight: 16,
//   },
//   titleText: {
    
//     width: '100%',
//     height: 64,
//     fontFamily: 'Lato-Thin',
//     fontSize: 64,
//     textAlign: 'left',
//     textAlignVertical: 'center',
//     lineHeight: 64,
//     // flexDirection: 'row',
//     // alignItems: 'center',
//     // gap: 8,
//     color: '#595959'
//   },
//   stepContainer: {
//     backgroundColor: 'transparent', // transparent
//     width: '100%',
//     // height: 240,
//     paddingLeft: 16,
//     paddingRight: 16,
//     // marginBottom: 32,
//     color: '#595959', // dark grey
//     color: '#ef7e47', // orange
//     color: '#78909c', // darker grey
//     color: '#eeeeee', // light grey
//     color: '#595959', // dark grey
//   },
//   stepText: {
//     width: '100%',
//     height: 64,
//     fontFamily: 'Lato-Thin',
//     fontSize: 64,
//     textAlign: 'center',
//     textAlignVertical: 'center',
//     lineHeight: 64,
//     // flexDirection: 'row',
//     // alignItems: 'center',
//     // gap: 8,
//     color: '#595959'
//   },
//   ctaWrapper: {
//     backgroundColor: '#ef7e47', // orange
    
//     borderRadius: 8,
//     borderColor: '#ef7e47',
//     borderWidth: 1,
//     borderStyle: 'solid',
//     marginBottom: 28,
//     width: '100%',
//     height: 48,
//     lineHeight: 48,
//     alignItems: 'center',
//     justifyContent: 'center',
    
//   },
//   ctaLogWrapper: {
//     color: '#ef7e47', // orange
//     fontFamily: 'Lato-Regular',
//     fontSize: 18,
//     textAlign: 'center',
//     textAlignVertical: 'center',
//     lineHeight: 18,
//     height: 40,
//     width: '100%',
//     borderRadius: 8,
//     borderWidth: 0,
//     borderStyle: 'solid',
//     borderColor: '#595959',
//     backgroundColor: 'transparent', // transparent
//     maxWidth: 120,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
