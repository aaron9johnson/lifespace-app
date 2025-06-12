import { ThemedView } from "@/components/ThemedView";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { Component, useState } from "react";
import { StyleSheet, View, Text, PanResponder, Animated, Button, ScrollView,  } from "react-native";

class Draggable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: props.color,
      dropped: props.dropped,
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
    console.log('gesture: ', gesture);
    console.log('gesture.moveX: ', gesture.moveX);
    console.log('gesture.moveY: ', gesture.moveY);
    console.log('color: ', e.state.color);
    let remove = false;
    if (gesture.moveY < 200){
      if (gesture.moveX > 0 && gesture.moveX < 100){
        remove = true;
        e.state.dropped(1, e.state.color);
      } else if (gesture.moveX > 100 && gesture.moveX < 200){
        remove = true;
        e.state.dropped(2, e.state.color);
      } else if (gesture.moveX > 200 && gesture.moveX < 300){
        remove = true;
        e.state.dropped(3, e.state.color);
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
            style={[{backgroundColor: this.state.color },panStyle, styles.circle, {opacity:this.state.opacity}]}
          >
            <Image
              source={require('@/assets/images/cuc.png')}
              style={{ backgroundColor: this.state.color }}
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
  const [drops1, setDrops1] = useState('black');
  const [drops2, setDrops2] = useState('black');
  const [drops3, setDrops3] = useState('black');
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
  const checkDropped = (i, color) => {
    console.log(i)
    console.log("color me")
    console.log(color)
      if (i === 1) {
        setDrops1(color);
      } else if (i === 2) {
        setDrops2(color);
      } else if (i === 3) {
        setDrops3(color);
      }
  };
    return (
      <View style={styles.mainContainer}>
        <View style={styles.dropZone}>
          {/* <Text style={styles.text}>Drop them here!</Text> */}
          <View style={[ { backgroundColor: drops1 }, drops1 != "#000000" ? styles.dropZone1 : styles.dropZone1f, { backgroundColor: drops1 } ]}></View>
          <View style={[ { backgroundColor: drops2 }, drops2 != "#000000" ? styles.dropZone1 : styles.dropZone1f, { backgroundColor: drops2 }]}></View>
          <View style={[ { backgroundColor: drops3 }, drops3 != "#000000" ? styles.dropZone1 : styles.dropZone1f, { backgroundColor: drops3 }]}></View>
        </View>
        <View style={styles.ballContainer} />
        <View style={styles.row}>
            <Draggable dropped={checkDropped} color={'white'}/>
            <Draggable dropped={checkDropped} color={'purple'}/>
            <Draggable dropped={checkDropped} color={'red'}/>
            <Draggable dropped={checkDropped} color={'blue'}/>
            <Draggable dropped={checkDropped} color={'green'}/>
            <Draggable dropped={checkDropped} color={'green'}/>
            <Draggable dropped={checkDropped} color={'yellow'}/>
            
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
  ctaContainer: {
    top: 200,

  },
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
    // backgroundColor: "skyblue",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: 200,
    justifyContent: "space-around",
  },  
  dropZone: {
    flexDirection: "row",
    // justifyContent: "space-around",
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