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
import { ThemeCTA } from "./aa/ThemeCTA";
import { ThemeView } from "./aa/ThemeView";
import { ThemeText } from "./aa/ThemeText";




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
          style={{ backgroundColor: this.state.plant.color, width: 100, height: 100 , borderRadius: 8}}
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

// class Plant {
//   name: string;
//   image: any;
//   color: string;
//   seasons: string;
//   constructor(name: string, image: any, color: string, seasons: string) {
//     this.name  = name;
//     this.image  = image;
//     this.color  = color;
//     this.seasons = seasons;
//   }
// }

import Data from './data'

export default function PlantScreen() {
  const [plantRefreshKey, setPlantRefreshKey] = useState(0)
  const [plantData, setPlantData] = useState(Data().plants);
  //   [
  //     new Plant('Cucc1', require('@/assets/images/cucumber.png'), '#3CB043', '0'),
  //     new Plant('Dill2', require('@/assets/images/cucumber.png'), '#5DBB63', '0'),
  //     new Plant('Carr3', require('@/assets/images/cucumber.png'), '#466D1D', '0'),
  //     new Plant('Toma4', require('@/assets/images/cucumber.png'), '#234F1E', '1'),
  //     new Plant('Cucc5', require('@/assets/images/cucumber.png'), '#3CB043', '1'),
  //     new Plant('Dill6', require('@/assets/images/cucumber.png'), '#5DBB63', '1'),
  //     new Plant('Carr7', require('@/assets/images/cucumber.png'), '#466D1D', '2'),
  //     new Plant('Toma8', require('@/assets/images/cucumber.png'), '#234F1E', '2'),
  //   ]
  // )
  // const carouselInstanceRef = useRef(null);
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
  const { image, gardens, types, models, conditions } = useLocalSearchParams<{ image: any; gardens: any; types: any; models: any; conditions: any; }>();
  const nullPlant = {
                name: '',
                image: null,
                icon: null,
                spacing: null,
                planting: '',
                description: '',
                color: '#000000'
            };
  const [drops, setDrops] = useState([[nullPlant, nullPlant, nullPlant], [nullPlant, nullPlant, nullPlant], [nullPlant, nullPlant, nullPlant]]);
  const [confirm, setConfirm] = useState(false);

  const confirmPlanting = async () => {
    router.push({ 
      pathname: '/6-Steps',
      params: {
        image: image,
        gardens: gardens,
        types:types,
        models: models,
        conditions: conditions,
        plants: drops.map((i) => i.map((j) => j.name)).join(','),
      }
    });
  };
  const check3Plants = async (i) => {
    if (i != 1 && (!drops[0][0] || drops[0][0].color == nullPlant.color)) {
      return
    }
    if (i != 2 && (!drops[0][1]  || drops[0][1].color == nullPlant.color)) {
      return
    }
    if (i != 3 && (!drops[0][2]  || drops[0][2].color == nullPlant.color)) {
      return
    }
    if (!confirm){
      setConfirm(true);
    }
  }
  const checkDropped = (i, plant) => {
    console.log('carouselInstanceRef.current?.getCurrentIndex() ', carouselInstanceRef.current?.getCurrentIndex());
    const index = (carouselInstanceRef.current?.getCurrentIndex() || 0)
    
    if (index === 0) {
      setDrops((prevDrops) => {
        const newDrops = [...prevDrops];
        newDrops[index][i - 1] = plant;
        return newDrops;
      });
    } else if (index === 1) {
      setDrops((prevDrops) => {
        const newDrops = [...prevDrops];
        newDrops[index][i - 1] = plant;
        return newDrops;
      });
    } else if (index === 2) {
      setDrops((prevDrops) => {
        const newDrops = [...prevDrops];
        newDrops[index][i - 1] = plant;
        return newDrops;
      });
    }
    
    check3Plants(i);

    setTimeout(() => {
      setPlantRefreshKey(plantRefreshKey + 1); // refrsh colors
    }, 10);
  };
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const data = [
    { title: 'Item 1', color: 'red' },
    { title: 'Item 2', color: 'blue' },
    { title: 'Item 3', color: 'green' },
  ];
  const currentSeason = (index) => {
    if (index == 0) {
      return "Spring";
    } else if (index == 1) {
      return "Summer";
    } else if (index == 2) {
      return "Autumn";
    }
    return "";
  }

    return (
      <View style={styles.mainContainer}>
        <ThemeView style={styles.instructionContainer}>
          <ThemeText style={styles.instructionText}>Drag plants into your garden</ThemeText>
        </ThemeView>
        <Carousel
          ref={carouselInstanceRef}
          width={width}
          height={200}
          data={data}
          onProgressChange={progress}
          onScrollEnd={(index) => {
            setPlantRefreshKey(plantRefreshKey + 1); // refresh colors
          }}
          renderItem={({ index }) => (
            <View>
              
              <View style={styles.dropZone}>
                {/* <Text style={styles.text}>Drop them here!</Text> */}
                <View style={[ drops[index][0].color != nullPlant.color ? styles.dropZone1 : styles.dropZone1f, { backgroundColor: drops[index][0].color  } ]}>
                  {drops[index][0].image ? <Image
                    source={drops[index][0].planting}
                    style={{ width: 100, height: 100, backgroundColor: drops[index][0].color }}
                  /> : <></>}
                </View>
                <View style={[ drops[index][1].color != nullPlant.color ? styles.dropZone1 : styles.dropZone1f, { backgroundColor: drops[index][1].color  }]}>
                  {drops[index][1].image ? <Image
                    source={drops[index][1].planting}
                    style={{ width: 100, height: 100, backgroundColor: drops[index][1].color }}
                  /> : <></>}
                </View>
                <View style={[ drops[index][2].color != nullPlant.color ? styles.dropZone1 : styles.dropZone1f, { backgroundColor: drops[index][2].color  }]}>
                  {drops[index][2].image ? <Image
                    source={drops[index][2].planting}
                    style={{ width: 100, height: 100, backgroundColor: drops[index][2].color }}
                  /> : <></>}
                </View>
              </View>
              <ThemeView style={styles.instructionContainer}>
                <TouchableOpacity style={styles.arrow} onPress={() => carouselInstanceRef.current?.prev()}>
                    <ThemeText style={styles.arrowText} >{"<"}</ThemeText>
                  </TouchableOpacity>
                <ThemeText style={styles.instructionText}>{currentSeason(index)}</ThemeText>
                <TouchableOpacity style={styles.arrow} onPress={() => carouselInstanceRef.current?.next()}>
                    <ThemeText style={styles.arrowText} >{">"}</ThemeText>
                  </TouchableOpacity>
              </ThemeView>
              {/* <View ref={addDragableRef} style={styles.row} key={plantRefreshKey}>
                {plantData.map((item, index) => (
                  <View style={{ width: 100, height: 100, margin: 5,}}>
                    <Draggable dropped={checkDropped} plant={item}/>
                  </View>
                ))}
              </View> */}
            </View>
          )}
        />
        <Pagination.Basic
              progress={progress}
              data={data}
              dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
              containerStyle={{ gap: 5, marginTop: 10 }}
              onPress={onPressPagination}
            />
        <View ref={addDragableRef} style={styles.row} key={plantRefreshKey}>
                {plantData.filter((i) => i.seasons.includes(currentSeason(carouselInstanceRef.current?.getCurrentIndex() || 0) + "")).map((item, index) => (
                  <View style={{ width: 100, height: 100, margin: 5 }}>
                    <Draggable dropped={checkDropped} plant={item}/>
                  </View>
                ))}
              </View>
        {confirm == true ? <ThemedView style={styles.ctaContainer}>
          <ThemeCTA onPress={confirmPlanting}>
            Confirm
          </ThemeCTA>
          {/* <TouchableOpacity style={styles.ctaWrapper} onPress={confirmPlanting}>
            <ThemedText>
              Confirm
            </ThemedText>
          </TouchableOpacity> */}

          </ThemedView>
        :
          <ThemedView style={styles.instructionContainer}>
            <ThemedText type="title" style={{ textAlign: 'center', padding: 15, color: 'black', backgroundColor: 'white'}}>Pick a plant and drag it into the garden</ThemedText>
          </ThemedView>
        }
      </View>
    );
}

let CIRCLE_RADIUS = 30;
const styles = StyleSheet.create({
  arrow: {
    width: 32,
    height: 32, 
    // backgroundColor: '#ef7e47', // orange
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto'


  },
  arrowText: {
    fontSize: 32,
    lineHeight: 32,
    color: '#78909c', // darker grey
  },

  instructionText:{
    fontFamily: 'LatoItalic',
    fontSize: 32,
    textAlign: 'center',
    lineHeight: 32,
    color: '#78909c', // darker grey
  },

  instructionContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
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
    backgroundColor: 'white',
    padding: 16

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
    borderWidth: 3,
    borderColor: "#000000",
    borderStyle: "dashed"
  },
  dropZone1f: {
    height: 100,
    width: 100,
    backgroundColor: "green",
    borderWidth: 3,
    borderColor: "#fff",
    borderStyle: "dashed"
  },
  dropZone2f: {
    height: 100,
    width: 100,
    backgroundColor: "green",
    borderWidth: 3,
    borderColor: "#fff",
    borderStyle: "dashed"
  },
  dropZone3f: {
    height: 100,
    width: 100,
    backgroundColor: "green",
    borderWidth: 3,
    borderColor: "#fff",
    borderStyle: "dashed"
  },
  dropZone2: {
    height: 100,
    width: 100,
    backgroundColor: "transparent",
    borderWidth: 3,
    borderColor: "#000000",
    borderStyle: "dashed"
  },
  dropZone3: {
    height: 100,
    width: 100,
    backgroundColor: "transparent",
    borderWidth: 3,
    borderColor: "#000000",
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