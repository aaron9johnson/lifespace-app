import { Image } from "expo-image";
import React, { Component } from "react";
import { StyleSheet, View, PanResponder, Animated, Easing } from "react-native";
import { NullPlant, Plant } from "./data/PlantData";
// import { Easing } from "react-native-reanimated";

export interface DraggableTargetPlant {
  plant: Plant;
  season: number;
  positionGarden: number;
  positionRow: number;
  positionColumn: number;
}

export default class DraggableTarget extends Component {
  constructor(props: DraggableTargetPlant) {
    super(props);
    this.state = {
      plant: props.plant,
      season: props.season,
      positionGarden: props.positionGarden,
      positionRow: props.positionRow,
      positionColumn: props.positionColumn,
      opacityIcon: new Animated.Value(1),
      opacityImage: new Animated.Value(1),
      opacityPlanting: new Animated.Value(1),
      opacityHoles: new Animated.Value(1),
    };
  }
  checkPosition(x: number, y: number): Boolean {
    console.log("Target: Is this in my screen location? -----------> ", x, y)
    if (this.state.plant == x) { // if x and y is in my screen location
      return true;
    }
    return false;
  }
  getPlant() {
    return this.state.plant[this.state.season];
  }
  animate() {
    if (this.state.plant && this.state.season) {

      console.log("Animating -> ", Date.now());

      Animated.timing((this.state.opacityHoles),{toValue: 0, easing: Easing.ease, duration: 500, delay: 0 });
      Animated.timing((this.state.opacityPlanting),{toValue: 0, easing: Easing.ease, duration: 500, delay: 500 });
      Animated.timing((this.state.opacityImage),{toValue: 0, easing: Easing.ease, duration: 1000, delay: 1000 });
      Animated.timing((this.state.opacityImage),{toValue: 1, easing: Easing.ease, duration: 500, delay: 2000 });
      Animated.timing((this.state.opacityPlanting),{toValue: 1, easing: Easing.ease, duration: 500, delay: 2500 });
      Animated.timing((this.state.opacityPlanting),{toValue: 0, easing: Easing.ease, duration: 500, delay: 3000 });
      Animated.timing((this.state.opacityHoles),{toValue: 1, easing: Easing.ease, duration: 500, delay: 3500 });
      Animated.timing((this.state.opacityHoles),{toValue: 0, easing: Easing.ease, duration: 500, delay: 4000 });
      // Animated.timing((this.state.opacityIcon),{toValue: 0, easing: Easing.ease, duration: 1000, delay: 10 });
      setTimeout(() => {

        console.log("Done Animating -> ", Date.now());
        
      }, 4500);
    }
  }
  componentWillMount() {
    this.animate();
  }
  render() {
    if (this.getPlant().color == NullPlant().color){
      return <View style={styles.dropZoneEmpty}></View>
    }
    return (
      <View style={[styles.dropZone, { backgroundColor: this.getPlant().color}]}>
        
        <Animated.View style={{ opacity: this.state.opacityHoles, marginTop: 0 }}>
          <Image source={ this.getPlant().holes  } style={{ width: 94, height: 94, backgroundColor: 'transparent' }}/>
        </Animated.View>
        <Animated.View style={{ opacity: this.state.opacityPlanting, marginTop: -94 }}>
          <Image source={ this.getPlant().planting } style={{ width: 94, height: 94, backgroundColor: 'transparent' }}/>
        </Animated.View>
        <Animated.View style={{ opacity: this.state.opacityImage, marginTop: -94 }}>
          <Image source={ this.getPlant().image } style={{ width: 94, height: 94, backgroundColor: 'transparent' }}/>
        </Animated.View>
        <Animated.View style={{ opacity: this.state.opacityIcon, marginTop: -94 }}>
          <Image source={ this.getPlant().icon } style={{ width: 94, height: 94, backgroundColor: 'transparent' }}/>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dropZone: {
    width: 94,
    height: 94,
    borderWidth: 1,
    borderStyle: 'dotted'
  },
  dropZoneEmpty: {
    width: 94,
    height: 94,
    borderWidth: 1,
    borderStyle: 'dashed'
  }
});
