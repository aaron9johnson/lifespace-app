import * as React from 'react';
import { Button, StyleSheet, Text, type TextProps } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';

export default function Index() {
  const router = useRouter();

  // router.push('/1-Home'); // jnust go

  return (
    <ThemedView style={styles.container}>
      <Button
        title={'1-Home'} // Ensure the title is a string
        onPress={() => router.push('/1-Home')} // Navigate to the Garden AR screen
        color={'#ef7e47'} // Use the theme color

      />
      <Button
        title={'2-Photo'} // Ensure the title is a string
        onPress={() => router.push('/2-Photo')} // Navigate to the Garden AR screen
        color={'#ef7e47'} // Use the theme color

      />
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
