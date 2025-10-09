import { Image } from "expo-image";
import React, { Component } from "react";
import { StyleSheet, View, PanResponder, Animated } from "react-native";
import { Plant } from "./data/PlantData";

export interface DraggableDropped {
  plant: Plant;
  targets: Array<Array<Array<any>>>;
  dropped(x: number, y: number, plant: Plant): Boolean;
}

export default class Draggable extends Component {
  constructor(props: DraggableDropped) {
    super(props);
    this.state = {
      plant: props.plant,
      targets: props.targets,
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
    const targetWidth = 100;
    const leftSpacing = 50;
    const topSpacing = 50;
    const gardenSpacing = 50;

    // gesture.moveX
    // gesture.moveY
    // check is drop position is within targets
    let remove = false;
    targetLoop: for (let i = 0; i < this.state.targets.length; i++){
      let target = this.state.targets[i];
      for (let j = 0; j < target.length; j++){
        let row = target[j];
        for (let k = 0; k < row.length; k++){
          let column = row[k];
          if (column.x <= gesture.moveX && column.x + targetWidth >= gesture.moveX && column.y <= gesture.moveY && column.y + targetWidth >= gesture.moveY){
            e.state.dropped(i, j, k, e.state.plant);
            remove = true;
            break targetLoop;
          }
        }
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
      <View style={{ width: 80, height: 80, alignItems: "center" }}>
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
          <View style={{ backgroundColor: this.state.plant.color, width: 80, height: 80 , borderRadius: 8 }}>
            <Animated.View {...this.panResponder.panHandlers} style={[panStyle, { opacity:this.state.opacity }]}>
              <Image source={this.state.plant.image} style={{ width: 70, height: 70, margin: 5, backgroundColor: 'transparent' }}></Image>
            </Animated.View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
});
