import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import 'react-native-gesture-handler';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    LatoBlack: require('../assets/fonts/Lato-Black.ttf'),
    LatoBlackItalic: require('../assets/fonts/Lato-BlackItalic.ttf'),
    LatoBold: require('../assets/fonts/Lato-Bold.ttf'),
    LatoBoldItalic: require('../assets/fonts/Lato-BoldItalic.ttf'),
    LatoItalic: require('../assets/fonts/Lato-Italic.ttf'),
    LatoLight: require('../assets/fonts/Lato-Light.ttf'),
    LatoLightItalic: require('../assets/fonts/Lato-LightItalic.ttf'),
    Lato: require('../assets/fonts/Lato-Regular.ttf'),
    LatoThin: require('../assets/fonts/Lato-Thin.ttf'),
    LatoThinItalic: require('../assets/fonts/Lato-ThinItalic.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      
        <Stack>
          {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
    </ThemeProvider>
  );
}
