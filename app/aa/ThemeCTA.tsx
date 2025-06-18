import { Button, StyleSheet, Text, TouchableOpacity, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import { ThemeText } from './ThemeText';

export type ThemeCTAProps = TextProps & {
  onPress?: any;
  title?: string;
  link?: any;
  replacelink?: any;
  backlink?: any;
  type?: 'secondary' | 'primary' | 'borderless';
};

export function ThemeCTA({
  onPress,
  title,
  link,
  replacelink,
  backlink,
  type = 'primary',
  ...rest
}: ThemeCTAProps) {
  let go = onPress;
  const router = useRouter();
  if (link) {
    go = () => router.push(link)
  }
  if (replacelink) {
    go = () => router.replace(link)
  }
  if (backlink) {
    go = () => router.back()
  }
  return (
      <TouchableOpacity
        onPress={go}
        style={[styles.cta, styles[type]]}
      >
        <ThemeText style={[styles.ctaTitle, styles['title' + type]]}>
          {title}{rest.children}
        </ThemeText>
      </TouchableOpacity>
    );
  
  }

const styles = StyleSheet.create({
  title: {

  },
  titleprimary:{
    fontSize: 24,
    lineHeight: 44,
    color: 'white'
  },
  titlesecondary:{
    fontSize: 24,
    lineHeight: 44,
    color: '#78909c', // darker grey
  },
  titleborderless:{
    color: '#78909c', // darker grey
  },
  ctaTitle: {
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 44,
    fontWeight: 'bold', // semi-bold
    fontStyle: 'normal',
    letterSpacing: 1, // letter spacing for better readability
    fontFamily: 'LatoBold', // custom font family
    padding: 0,
    margin: 0
  },
  cta:{
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    margin: 0,
    elevation: 5, // elevation for Android
    minWidth: 250,
    minHeight: 44,
  },
  secondary: {
    backgroundColor: 'white',
    color: '#78909c', // darker grey
    borderColor: '#78909c', // darker grey
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  primary: {
    backgroundColor: '#ef7e47', // orange
    color: 'white',
    borderColor: '#ef7e47', // orange
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  borderless: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    color: '#78909c', // darker grey
  },
  temp: {
    color: '#595959', // dark grey
    color: '#ef7e47', // orange
    color: '#78909c', // darker grey
    color: '#eeeeee', // light grey
    color: '#595959', // dark grey
  }
});
