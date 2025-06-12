import React, { use, useEffect, useRef, useState } from 'react';
import { Button, View, StyleSheet, TouchableWithoutFeedback, type TextProps } from 'react-native';
import { Camera, useCameraPermission, getCameraDevice } from 'react-native-vision-camera';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/ThemedText';
import { ThemedCTA } from '@/components/ThemedCTA';
import { ThemedView } from '@/components/ThemedView';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ReviewPhotoScreen() {
  if (!Camera.getAvailableCameraDevices) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">NO CAMERA</ThemedText>
        <ThemedView style={styles.container}>
          <ThemedCTA lightColor={'#ef7e47'} darkColor={'#595959'} link='/1-Home'>No Camera Permission</ThemedCTA>
        </ThemedView>
      </ThemedView>
    );
  }
  const { image } = useLocalSearchParams<{ image: string; }>();
  console.log('useLocalSearchParams -----> image', image);
  // const imageData = JSON.parse(image);
  // console.log('imageData ri', imageData.uri);
    // console.log('image ri', image.uri);
  // const [image, setImage] = useState(null);

  const confirmPhoto = async () => {
    router.push({ 
        pathname: '/3-Design',
        params: {
          image: image
        }
      });
  }

  const router = useRouter();
  const cameraRef = useRef(null);
  // const [image, setImage] = useState(null);
  const { hasPermission, requestPermission } = useCameraPermission()
  const devices = Camera.getAvailableCameraDevices();
  const device = getCameraDevice(devices, 'back', {
    physicalDevices: ['wide-angle-camera']
  })

  if (!hasPermission) {
    requestPermission();
    return (
      <ThemedView style={styles.container}>
        <ThemedCTA lightColor={'#ef7e47'} darkColor={'#595959'} link='/1-Home'>No Camera Permission</ThemedCTA>
      </ThemedView>
    );
  }
  
  return (
    
    <ThemedView style={styles.container}>
      <ThemedView style={styles.imageContainer}>
        {/* { image && uri ? <Image */}
        { image ? <Image
          source={{ uri: image}}
          style={styles.image}
        /> : <ThemedText type="title">No Image</ThemedText>}
        <ThemedView style={styles.buttonsContainer}>
          <ThemedView style={styles.ctaWrapper}>
            <Button
              title={'Retake'}
              onPress={router.back}
              color={'#000000'}
            />
          </ThemedView>
          <ThemedView style={styles.ctaWrapper}>
            <Button
              title={'Order'}
              onPress={confirmPhoto}
              color={'#000000'}
            />
          </ThemedView>

        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent', // transparent
    position: 'relative',
  },
  image: {
    position: 'absolute',
    bottom: 200,
    right: 20,
    left: 20,
    top: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    resizeMode: 'contain',
  },
  ctaWrapper: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 20,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    height: 165,
  },
});


// // Snip
// import { RNCamera as Camera } from 'react-native-camera';


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#000',
//   },
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     height: Dimensions.get('window').height,
//     width: Dimensions.get('window').width
//   },
//   capture: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     borderWidth: 5,
//     borderColor: '#FFF',
//     marginBottom: 15,
//   },
//   cancel: {
//     position: 'absolute',
//     right: 20,
//     top: 20,
//     backgroundColor: 'transparent',
//     color: '#FFF',
//     fontWeight: '600',
//     fontSize: 17,
//   }
// });

// class TakePictureScreen extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     path: null,
  //   };
  // }
// function del(){
//   takePicture = async () => {
//     try {
//       const data = await this.camera.takePictureAsync();
//       this.setState({ path: data.uri });
//       // this.props.updateImage(data.uri);
//       // console.log('Path to image: ' + data.uri);
//     } catch (err) {
//       console.log('err: ', err);
//     }
//   };

//   renderCamera() {
//     return (
//       <Camera
//         ref={(cam) => {
//           this.camera = cam;
//         }}
//         style={styles.preview}
//         flashMode={Camera.Constants.FlashMode.off}
//         permissionDialogTitle={'Permission to use camera'}
//         permissionDialogMessage={'We need your permission to use your camera phone'}
//       >
//         <TouchableHighlight
//           style={styles.capture}
//           onPress={this.takePicture.bind(this)}
//           underlayColor="rgba(255, 255, 255, 0.5)"
//         >
//           <View />
//         </TouchableHighlight>
//       </Camera>
//     );
//   }

//   renderImage() {
//     return (
//       <View>
//         <Image
//           source={{ uri: this.state.path }}
//           style={styles.preview}
//         />
//         <Text
//           style={styles.cancel}
//           onPress={() => this.setState({ path: null })}
//         >Cancel
//         </Text>
//       </View>
//     );
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         {this.state.path ? this.renderImage() : this.renderCamera()}
//       </View>
//     );
//   }
// }