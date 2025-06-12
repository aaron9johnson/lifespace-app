import * as React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, type TextProps } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';

export default function Index() {
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      router.dismissAll()
      router.replace('/1-Home')
    })();
  }, []);
  
  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity style={styles.cta} onPress={() => {
          router.dismissAll()
          router.replace('/1-Home')
        }}>
        <Text style={styles.ctaText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cta} onPress={() => {
          router.dismissAll()
          router.replace('/4-Plant')
        }}>
        <Text style={styles.ctaText}>Plant</Text>
      </TouchableOpacity>
        <TouchableOpacity style={styles.cta} onPress={() => {
          router.dismissAll()
          router.replace('/6-Home')
        }}>
        <Text style={styles.ctaText}>Home6</Text>
      </TouchableOpacity>
    </ThemedView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  arView: {
    flex: 2,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  button: {
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 10,
    margin: 5,
  },
  cta: {
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 10,
    margin: 5,
  },
  ctaText: {
    padding: 10,
  },
});


// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { ThemedText } from '@/components/ThemedText';
// import { ArViewerView } from "react-native-ar-viewer";
// import { Platform } from 'react-native';
// // ...



// export default function GardenAR() {
//   return (
//     <View style={styles.container}>
//       <ThemedText type="title">
//         Hello
//         </ThemedText>
//       <ArViewerView 
//     style={{flex: 1}}
//     model={Platform.OS === 'android' ? './assets/models/low_rider.glb' : './assets/models/low_rider.usdz'}
//     lightEstimation
//     manageDepth
//     allowRotate
//     allowScale
//     allowTranslate
//     disableInstantPlacement
//     onStarted={() => console.log('started')}
//     onEnded={() => console.log('ended')}
//     onModelPlaced={() => console.log('model displayed')}
//     onModelRemoved={() => console.log('model not visible anymore')}
//     planeOrientation="both" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
