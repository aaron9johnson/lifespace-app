import { Button, StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';

export type ThemedCTAProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  link?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedCTA({
  style,
  lightColor,
  darkColor,
  link,
  type = 'default',
  ...rest
}: ThemedCTAProps) {
  const router = useRouter();
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  
  return (
      <Button
        title={rest.children as string} // Ensure the title is a string
        onPress={() => router.push(link)} // Navigate to the Garden AR screen
        color={color} // Use the theme color
      />
    );
  }

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    // cta styling
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    textAlign: 'center',
    backgroundColor: '#ef7e47', // light theme background color
    color: '#FFFFFF', // light theme text color
    borderColor: '#ed6e30', // light theme border color - darker
    margin: 0,
    fontWeight: 'bold', // semi-bold
    fontStyle: 'normal',
    // textTransform: 'uppercase', // uppercase text
    letterSpacing: 1, // letter spacing for better readability
    shadowColor: '#000', // shadow color for the button
    shadowOffset: { width: 0, height: 2 }, // shadow offset
    shadowOpacity: 0.25, // shadow opacity
    shadowRadius: 3.84, // shadow radius
    elevation: 5, // elevation for Android
    fontFamily: 'Lato', // custom font family
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
