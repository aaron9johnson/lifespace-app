import { ThemedView } from "@/components/ThemedView";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { Component } from "react";
import { StyleSheet, View, Text, PanResponder, Animated, Button,  } from "react-native";
  let plant1 = false;
let plant2 = false;
let plant3 = false;

class Draggable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDraggable: true,
      dropAreaValues: null,
      pan: new Animated.ValueXY(),
      opacity: new Animated.Value(1)
    };
  }

  componentWillMount() {
    this._val = { x:0, y:0 }
    this.state.pan.addListener((value) => this._val = value);

    this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gesture) => true,
        onPanResponderGrant: (e, gesture) => {
          this.state.pan.setOffset({
            x: this._val.x,
            y:this._val.y
          })
          this.state.pan.setValue({ x:0, y:0})
        },
        onPanResponderMove: Animated.event([ 
          null, { dx: this.state.pan.x, dy: this.state.pan.y }
        ]),
        onPanResponderRelease: (e, gesture) => {
          this.checkDrop(this, gesture)
          
        }
      });
  }

  checkDrop(e, gesture){
    let remove = false;
    if (gesture.moveY < 200){
      if (gesture.moveX > 0 && gesture.moveX < 100){
        remove = true;
        plant1 = true;
      } else if (gesture.moveX > 100 && gesture.moveX < 200){
        remove = true;
        plant2 = true;
      } else if (gesture.moveX > 200 && gesture.moveX < 300){
        remove = true;
        plant3 = true;
      }
    }
    
    if (remove) {
      Animated.timing(e.state.opacity, {
        toValue: 0,
        duration: 1000
      }).start(() =>
        e.setState({
          showDraggable: false
        })
      );
    } 
  }
  // isDropArea(gesture) {
  //   return gesture.moveY < 200;
  // }

  render() {
    return (
      <View style={{ width: "20%", alignItems: "center" }}>
        {this.renderDraggable()}
      </View>
    );
  }

  renderDraggable() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    if (this.state.showDraggable) {
      return (
        <View style={{ position: "absolute" }}>
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[panStyle, styles.circle, {opacity:this.state.opacity}]}
          >
            <Image
              source={require('@/assets/images/cuc.png')}
              style={styles.img}
            />
          </Animated.View>
        </View>
      );
    }
  }
}


export default function PlantScreen() {
  const router = useRouter();
  const { image, gardens, plants } = useLocalSearchParams<{ image: any; gardens: any; plants: any; }>();
  const confirmPlanting = async () => {
    router.push({ 
      pathname: '/5-Buy',
      params: {
        image: image,
        gardens: gardens,
        plants: plants,
      }
    });
  };
    return (
      <View style={styles.mainContainer}>
        <View style={styles.dropZone}>
          {/* <Text style={styles.text}>Drop them here!</Text> */}
          <View style={!plant1 ? styles.dropZone1 : styles.dropZone1f}></View>
          <View style={!plant2 ? styles.dropZone2 : styles.dropZone2f}></View>
          <View style={!plant3 ? styles.dropZone3 : styles.dropZone3f}></View>
        </View>
        <View style={styles.ballContainer} />
        <View style={styles.row}>
          <Draggable />
          <Draggable />
          <Draggable />
          <Draggable />
          <Draggable />
        </View>
        <ThemedView style={styles.ctaContainer}>
          <ThemedView style={styles.ctaWrapper}>
            <Button
              title={'Confirm'} // Ensure the title is a string
              onPress={() => {
                confirmPlanting(); // Call the takePhoto function
              }} // Navigate to the Garden AR screen
              color={'#ef7e47'} // Use the theme color
            />
          </ThemedView>
        </ThemedView>
      </View>
    );
}

let CIRCLE_RADIUS = 30;
const styles = StyleSheet.create({
  img: {
    height: 60,
    width: 60,
    borderRadius: 30

  },
  mainContainer: {
    flex: 1
  },
  ballContainer: {
    height:200
  },
  circle: {
    backgroundColor: "skyblue",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS
  },
  row: {
    flexDirection: "row"
  },  
  dropZone: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  dropZone1: {
    height: 100,
    width: 100,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#fff",
    borderStyle: "dashed"
  },
  dropZone1f: {
    height: 100,
    width: 100,
    backgroundColor: "green",
    borderWidth: 1,
    borderColor: "#fff",
    borderStyle: "solid"
  },
  dropZone2f: {
    height: 100,
    width: 100,
    backgroundColor: "green",
    borderWidth: 1,
    borderColor: "#fff",
    borderStyle: "solid"
  },
  dropZone3f: {
    height: 100,
    width: 100,
    backgroundColor: "green",
    borderWidth: 1,
    borderColor: "#fff",
    borderStyle: "solid"
  },
  dropZone2: {
    height: 100,
    width: 100,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#fff",
    borderStyle: "dashed"
  },
  dropZone3: {
    height: 100,
    width: 100,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#fff",
    borderStyle: "dashed"
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold"
  }
});