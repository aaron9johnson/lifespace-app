import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import { ThemeView } from './aa/ThemeView';
import { ThemeText } from './aa/ThemeText';
import { ThemeCTA } from './aa/ThemeCTA';

export default function StartScreen() {
  return (
    <ThemeView style={styles.screen}>

      <ThemeView style={styles.titleContainer}>
        <Image style={styles.logo} source={require('@/assets/images/logo.png')}></Image>
      </ThemeView>

      <ThemeView style={styles.stepContainer}>
        <ThemeText type="subtitle" style={styles.stepText}>Effortless</ThemeText>
        <ThemeText type="subtitle" style={styles.stepText}>Garden</ThemeText>
        <ThemeText type="subtitle" style={styles.stepText}>Design</ThemeText>
      </ThemeView>

      <ThemeText style={styles.description}>
        Capture your space, place your garden, and start planting in minutes.
      </ThemeText>

      <ThemeView style={styles.ctaWrapper}>
        <ThemeCTA link='/2-Photo'>
          Get Started
        </ThemeCTA>
      </ThemeView>

      <ThemeView style={styles.ctaLogWrapper}>
        <ThemeCTA type='borderless' link='/Login'>
          Login
        </ThemeCTA>
      </ThemeView>

    </ThemeView>
  );
}

const styles = StyleSheet.create({
  description: {
    fontFamily: 'LatoLightItalic',
    color: '#595959', // dark grey
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
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  titleContainer: {
    backgroundColor: 'white',
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
    fontSize: 64,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 64,
    color: '#595959', // dark grey
    margin: 0,
    letterSpacing: 0.9,
    padding: 0
  },
  ctaWrapper: {
    marginBottom: 20,
    backgroundColor: 'transparent'
  },
  ctaLogWrapper: {
    marginBottom: 20,
    backgroundColor: 'transparent'
  },
});

// '#595959', // dark grey
// '#ef7e47', // orange
// '#78909c', // darker grey
// '#eeeeee', // light grey
