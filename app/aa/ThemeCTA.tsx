import { Button, StyleSheet, Text, TouchableOpacity, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import { ThemeText } from './ThemeText';

export type ThemeCTAProps = TextProps & {
  onPress?: any;
  title?: string;
  link?: any;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemeCTA({
  onPress,
  title,
  link,
  type = 'default',
  ...rest
}: ThemeCTAProps) {
  const router = useRouter();
  if (link) {
    return (
      <TouchableOpacity
        onPress={router.push(link)}
        style={styles.cta}
      >
        <ThemeText>
          {title}
        </ThemeText>
        {rest.children}
      </TouchableOpacity>
    );
  }
  return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.cta}
      >
        <ThemeText>
          {title}
        </ThemeText>
        {rest.children}
      </TouchableOpacity>
    );
  
  }

const styles = StyleSheet.create({
  cta:{
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
});
