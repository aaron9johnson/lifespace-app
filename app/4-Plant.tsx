import { ThemedView } from "@/components/ThemedView";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { Component, useState, useRef } from "react";
import { StyleSheet, View, Text, PanResponder, Animated, Button, ScrollView, Dimensions, TouchableOpacity,  } from "react-native";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { ThemedText } from "@/components/ThemedText";



class Draggable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      plant: props.plant,
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
    console.log('color: ', e.state.plant.color);
    let remove = false;
    if (gesture.moveY < 200 + 50){
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
        <View style={{ position: "absolute"}}>
          <View
          style={{ backgroundColor: this.state.plant.color, width: 100, height: 100 }}
          >
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[panStyle, styles.circle, {opacity:this.state.opacity}]}
          >
            <Image
              source={this.state.plant.image}
              style={{ width: 80, height: 80, margin: 10, backgroundColor: 'transparent' }}
            />
          </Animated.View>
          </View>
        </View>
      );
    }
  }
}

class Plant {
  name: string;
  image: any;
  color: string;
  constructor(name: string, image: any, color: string) {
    this.name  = name;
    this.image  = image;
    this.color  = color;
  }
}


export default function PlantScreen() {
  const [plantRefreshKey, setPlantRefreshKey] = useState(0)
  const [plantData, setPlantData] = useState(
    [
      new Plant('Cucc', require('@/assets/images/cuc.png'), '#3CB043'),
      new Plant('Dill', require('@/assets/images/dill.png'), '#5DBB63'),
      new Plant('Carr', require('@/assets/images/carrot.png'), '#466D1D'),
      new Plant('Toma', require('@/assets/images/tomato.png'), '#234F1E'),
      new Plant('Cucc', require('@/assets/images/arug.png'), '#3CB043'),
      new Plant('Dill', require('@/assets/images/dill.png'), '#5DBB63'),
      new Plant('Carr', require('@/assets/images/carrot.png'), '#466D1D'),
      new Plant('Toma', require('@/assets/images/tomato.png'), '#234F1E'),
    ]
  )
  const carouselRef = useRef(null);
  const addDragableRef = useRef(null);
  const carouselInstanceRef = useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);
    
    const onPressPagination = (index: number) => {
      carouselInstanceRef.current?.scrollTo({
        /**
         * Calculate the difference between the current index and the target index
         * to ensure that the carousel scrolls to the nearest index
         */
        count: index - progress.value,
        animated: true,
      });
    };
    
  const router = useRouter();
  const { image, gardens, plants } = useLocalSearchParams<{ image: any; gardens: any; plants: any; }>();
  const nullPlant = new Plant('', '', '#000000');
  const [drops1, setDrops1] = useState(nullPlant);
  const [drops2, setDrops2] = useState(nullPlant);
  const [drops3, setDrops3] = useState(nullPlant);
  const [confirm, setConfirm] = useState(false);

  const confirmPlanting = async () => {
    router.push({ 
      pathname: '/5-Buy',
      params: {
        image: image,
        plant1: drops1.name,
        plant2: drops2.name,
        plant3: drops3.name,
        gardens: gardens,
      }
    });
  };
  const check3Plants = async (i) => {
    if (i != 1 && (!drops1 || drops1.color == nullPlant.color)) {
      return
    }
    if (i != 2 && (!drops2 || drops2.color == nullPlant.color)) {
      return
    }
    if (i != 3 && (!drops3 || drops3.color == nullPlant.color)) {
      return
    }
    if (!confirm){
      setConfirm(true);
    }
  }
  const checkDropped = (i, plant) => {
    if (i === 1) {
      setDrops1(plant);
    } else if (i === 2) {
      setDrops2(plant);
    } else if (i === 3) {
      setDrops3(plant);
    }
    
    check3Plants(i);

    setTimeout(() => {
      setPlantRefreshKey(plantRefreshKey + 1); // refrsh colors
    }, 10);
  };
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

    return (
      <View style={styles.mainContainer}>
        <View style={styles.dropZone}>
          {/* <Text style={styles.text}>Drop them here!</Text> */}
          <View style={[ drops1.color != nullPlant.color ? styles.dropZone1 : styles.dropZone1f, { backgroundColor: drops1.color  } ]}>
            {drops1.image ? <Image
              source={drops1.image}
              style={{ width: 100, height: 100, backgroundColor: drops1.color }}
            /> : <></>}
          </View>
          <View style={[ drops2.color != nullPlant.color ? styles.dropZone1 : styles.dropZone1f, { backgroundColor: drops2.color  }]}>
            {drops2.image ? <Image
              source={drops2.image}
              style={{ width: 100, height: 100, backgroundColor: drops2.color }}
            /> : <></>}
          </View>
          <View style={[ drops3.color != nullPlant.color ? styles.dropZone1 : styles.dropZone1f, { backgroundColor: drops3.color  }]}>
            {drops3.image ? <Image
              source={drops3.image}
              style={{ width: 100, height: 100, backgroundColor: drops3.color }}
            /> : <></>}
          </View>
        </View>
        <View ref={addDragableRef} style={styles.row} key={plantRefreshKey}>
          {plantData.map((item, index) => (
            <View style={{ width: 100, height: 100, margin: 5,}}>
              <Draggable dropped={checkDropped} plant={item}/>
            </View>
         ))}
        </View>
        {confirm == true ? <ThemedView style={styles.ctaContainer}>
          <TouchableOpacity style={styles.ctaWrapper} onPress={confirmPlanting}>
            <ThemedText>
              Confirm
            </ThemedText>
          </TouchableOpacity>
          </ThemedView>: <></>
          }
      </View>
    );
}

let CIRCLE_RADIUS = 30;
const styles = StyleSheet.create({
  ctaWrapper: {
    backgroundColor: '#ef7e47', // orange
    
    borderRadius: 8,
    borderColor: '#ef7e47',
    borderWidth: 1,
    borderStyle: 'solid',
    marginBottom: 28,
    width: '100%',
    height: 60,
    lineHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  ctaContainer: {
    top: 80,
    backgroundColor: 'white'

  },
  img: {
    height: 60,
    width: 60,
    borderRadius: 30

  },
  mainContainer: {
    // flex: 1,
    backgroundColor:'white',
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  ballContainer: {
    // height:200
    marginTop: 20,
  },
  circle: {
    // backgroundColor: "skyblue",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS
  },
  row: {
    flexShrink: 0,
    flexDirection: "row",
    flexWrap: 'wrap',
    // height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    left: 75,
    width: 335,
    marginTop: 75,
    // right: 35,
    // position: 'relative',
  },  
  dropZone: {
    flexDirection: "row",
    // justifyContent: "space-around",
    alignItems: "center",
    marginLeft: 50,
    marginTop: 50,
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