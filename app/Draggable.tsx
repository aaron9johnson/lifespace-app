import { Image } from "expo-image";
import React, { Component } from "react";
import { StyleSheet, View, PanResponder, Animated } from "react-native";
import { Plant } from "./data/PlantData";

export default class Draggable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plant: props.plant,
      dropped: props.dropped as (i: number, plant: Plant) => {},
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
    if (gesture.moveY < 200 + 50 + 50){
      if (gesture.moveX > 0 + 50 && gesture.moveX < 100 + 50){
        remove = true;
        e.state.dropped(1, e.state.plant);
      } else if (gesture.moveX > 100 + 50 && gesture.moveX < 200 + 50){
        remove = true;
        e.state.dropped(2, e.state.plant);
      } else if (gesture.moveX > 200 + 50 && gesture.moveX < 300 + 50){
        remove = true;
        e.state.dropped(3, e.state.plant);
      }
    }
    if (remove) {
      e.setState({
        showDraggable: false
      })
      // Animated.timing(e.state.opacity, { toValue: 0, duration: 1000 }).start(() => {
      //   e.setState({
      //     showDraggable: false
      //   })
      // });
    } else {
      // return draggable to original position
      e.state.pan.setOffset({ x:0, y:0});
      e.state.pan.setValue({ x:0, y:0});
    }
  }
  render() {
    return (
      <View style={{ width: "20%", alignItems: "center" }}>
        { this.renderDraggable() }
      </View>
    );
  }
  renderDraggable() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    if (this.state.showDraggable) {
      return (
        <View style={{ position: "absolute"}}>
          <View style={{ backgroundColor: this.state.plant.color, width: 100, height: 100 , borderRadius: 8 }}>
            <Animated.View {...this.panResponder.panHandlers} style={[panStyle, styles.circle, { opacity:this.state.opacity }]}>
              <Image source={this.state.plant.image} style={{ width: 80, height: 80, margin: 10, backgroundColor: 'transparent' }}></Image>
            </Animated.View>
          </View>
        </View>
      );
    }
  }
}

let CIRCLE_RADIUS = 30;
const styles = StyleSheet.create({
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS
  }
});
