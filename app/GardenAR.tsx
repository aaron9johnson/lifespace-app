import * as React from 'react';

import {
  StyleSheet,
  View,
  Platform,
  TouchableHighlight,
  Text,
} from 'react-native';
import { ArViewerView } from 'react-native-ar-viewer';
import RNFS from 'react-native-fs';

export default function App() {
  const [localModelPath, setLocalModelPath] = React.useState<string>();
  const [showArView, setShowArView] = React.useState(true);
  const ref = React.useRef() as React.MutableRefObject<ArViewerView>;

  const loadPath = async () => {
    const modelSrc =
      Platform.OS === 'android'
        ? 'https://www.lifespacegardens.com/cdn/shop/3d/models/o/a606b50f06f23301/low_rider_raw_1_.glb'
        : 'https://www.lifespacegardens.com/cdn/shop/3d/models/o/4782bfb9b4fd7ba9/low_rider_raven_finish.usdz';
    const modelPath = `${RNFS.DocumentDirectoryPath}/model.${
      Platform.OS === 'android' ? 'glb' : 'usdz'
    }`;
    const exists = await RNFS.exists(modelPath);
    if (!exists) {
      await RNFS.downloadFile({
        fromUrl: modelSrc,
        toFile: modelPath,
      }).promise;
    }

    setLocalModelPath(modelPath);
  };

  React.useEffect(() => {
    loadPath();
  });

  const takeSnapshot = () => {
    ref.current?.takeScreenshot().then(async (base64Image) => {
      const date = new Date();
      const filePath = `${
        RNFS.CachesDirectoryPath
      }/arscreenshot-${date.getFullYear()}-${date.getMonth()}-${date.getDay()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.jpg`;
      await RNFS.writeFile(filePath, base64Image, 'base64');
      console.log('Screenshot written to ' + filePath);
    });
  };

  const reset = () => {
    ref.current?.reset();
  };

  const rotate = () => {
    ref.current?.rotate(0, 25, 0);
  };
  const scale = () => {
    ref.current?.rotate(180, 75, 180);
  };

  const mountUnMount = () => setShowArView(!showArView);

  return (
    <View style={styles.container}>
      {localModelPath && showArView && (
        <ArViewerView
          model={localModelPath}
          style={styles.arView}
          disableInstantPlacement
          manageDepth
          allowRotate
          allowScale
          allowTranslate
          onStarted={() => console.log('started')}
          onEnded={() => console.log('ended')}
          onModelPlaced={() => console.log('model displayed')}
          onModelRemoved={() => console.log('model not visible anymore')}
          ref={ref}
        />
      )}
      <View style={styles.footer}>
        <TouchableHighlight onPress={takeSnapshot} style={styles.button}>
          <Text>Take Snapshot</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={mountUnMount} style={styles.button}>
          <Text>{showArView ? 'Unmount' : 'Mount'}</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={reset} style={styles.button}>
          <Text>Reset</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={rotate} style={styles.button}>
          <Text>Rotate</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={scale} style={styles.button}>
          <Text>Scale</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
