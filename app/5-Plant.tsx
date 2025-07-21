import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState, useRef } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { ThemeCTA } from "./aa/ThemeCTA";
import { ThemeView } from "./aa/ThemeView";
import { ThemeText } from "./aa/ThemeText";
import Draggable from './Draggable';

// import GardenData, { Garden, GardenColor, GardenBuy } from './data/GardenData'
// const gardenData: Array<Garden> = GardenData();
import PlantData, { getSeasonFromText, Plant, PlantInfo, PlantLight, PlantZone, ZoneData, ZoneInfo } from './data/PlantData'
const plantData: Array<Plant> = PlantData();
const zoneData: Array<ZoneInfo> = ZoneData();

export default function PlantScreen() {
  const router = useRouter();
  const { image, gardens, types, models, conditions } = useLocalSearchParams<{ image: any; gardens: any; types: any; models: any; conditions: any; }>();
  console.log(conditions)

  const zoneInfo: ZoneInfo = zoneData.find(data => data.zone == parseInt(conditions.split(',')[0]) as PlantZone) || zoneData[0];
  const light: PlantLight = parseInt(conditions.split(',')[1]);
  const filteredPlantData = plantData.filter((plant) => plant.light.includes(light) && plant.zones.includes(zoneInfo.zone));

  const carouselInstanceRef = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const [plantRefreshKey, setPlantRefreshKey] = useState(0);
  const nullPlant = new Plant('',0,0,0,[],[],[],'','#000000',[]);
  
  const [drops, setDrops] = useState([
    [nullPlant, nullPlant, nullPlant],
    [nullPlant, nullPlant, nullPlant],
    [nullPlant, nullPlant, nullPlant]
  ]);

  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const data = [1,2,3];

  const currentSeason = (index: number) => {
    switch (index) {
      case 0: return 'Spring';
      case 1: return 'Summer';
      case 2: return 'Autumn';
      default: return '';
    }
  }

  const onPressPagination = (index: number) => {
    carouselInstanceRef.current?.scrollTo({
      count: index - progress.value, // Calculate the difference between the current index and the target index to ensure that the carousel scrolls to the nearest index
      animated: true,
    });
  };

  const confirmPlanting = () => {
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

  const check3Plants = (i: number) => {
    // check to show confirm button - currently just fill first 3 to show
    if (i != 1 && (!drops[0][0] || drops[0][0].color == nullPlant.color)) {
      return;
    }
    if (i != 2 && (!drops[0][1] || drops[0][1].color == nullPlant.color)) {
      return;
    }
    if (i != 3 && (!drops[0][2] || drops[0][2].color == nullPlant.color)) {
      return;
    }
    if (!isConfirmVisible){
      setIsConfirmVisible(true);
    }
  }
  
  const dropped = (i: number, plant: Plant) => {
    const index = (carouselInstanceRef.current?.getCurrentIndex() || 0);
    setDrops((prevDrops) => {
      const newDrops = [...prevDrops];
      newDrops[index][i - 1] = plant;
      return newDrops;
    });
    check3Plants(i);
    // setTimeout(() => {
    //   setPlantRefreshKey(plantRefreshKey + 1); // refrsh colors
    // }, 10);
    setPlantRefreshKey(plantRefreshKey + 1); // refrsh colors
  };
  
  return (
    <View style={styles.mainContainer}>
      <ThemeView style={styles.instructionContainer}>
        <ThemeText style={styles.instructionText}>
          Drag plants into your garden
        </ThemeText>
      </ThemeView>
      <Carousel
        ref={carouselInstanceRef}
        width={Dimensions.get("window").width}
        height={200}
        data={data}
        onProgressChange={progress}
        onScrollEnd={() => setPlantRefreshKey(plantRefreshKey + 1)}
        renderItem={({ index }) => (
          <View>
            <View style={styles.dropZone}>
              <View style={[ drops[index][0].color != nullPlant.color ? styles.dropZone1 : styles.dropZone1f, { backgroundColor: drops[index][0].color }]}>
                {drops[index][0].image ?
                  <Image source={drops[index][0].planting} style={{ width: 94, height: 94, backgroundColor: drops[index][0].color }}/>
                : <></>}
              </View>
              <View style={[ drops[index][1].color != nullPlant.color ? styles.dropZone1 : styles.dropZone1f, { backgroundColor: drops[index][1].color }]}>
                {drops[index][1].image ?
                  <Image source={drops[index][1].planting} style={{ width: 94, height: 94, backgroundColor: drops[index][1].color }}/>
                : <></>}
              </View>
              <View style={[ drops[index][2].color != nullPlant.color ? styles.dropZone1 : styles.dropZone1f, { backgroundColor: drops[index][2].color }]}>
                {drops[index][2].image ?
                  <Image source={drops[index][2].planting} style={{ width: 94, height: 94, backgroundColor: drops[index][2].color }}/>
                : <></>}
              </View>
            </View>
            <ThemeView style={styles.instructionContainer}>
              <TouchableOpacity style={styles.arrow} onPress={() => carouselInstanceRef.current?.prev()}>
                <ThemeText style={styles.arrowText}>
                  {"<"}
                </ThemeText>
              </TouchableOpacity>

              <ThemeText style={styles.instructionText}>{ currentSeason(index) }</ThemeText>

              <TouchableOpacity style={styles.arrow} onPress={() => carouselInstanceRef.current?.next()}>
                <ThemeText style={styles.arrowText}>
                  {">"}
                </ThemeText>
              </TouchableOpacity>
            </ThemeView>
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
      <View style={styles.row} key={plantRefreshKey}> {/* ref={addDragableRef} */}
        {filteredPlantData.filter((i: Plant) => i.seasons.includes(getSeasonFromText(currentSeason(carouselInstanceRef.current?.getCurrentIndex() || 0) + ""))).map((item: Plant, index: number) => (
          <View style={{ width: 100, height: 100, margin: 5, zIndex: 9999 }}>
            <Draggable dropped={dropped} plant={item}/>
          </View>
        ))}
      </View>
      {isConfirmVisible == true ?
        <ThemeView style={styles.ctaContainer}>
          <ThemeCTA onPress={confirmPlanting}>
            Confirm
          </ThemeCTA>
        </ThemeView>
      :
        <ThemeView style={styles.instructionContainer}>
          <ThemeText type="title" style={{ textAlign: 'center', padding: 15, color: 'black', backgroundColor: 'white'}}>
            Pick a plant and drag it into the garden
          </ThemeText>
        </ThemeView>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  arrow: {
    width: 32,
    height: 32, 
    // backgroundColor: '#ef7e47', // orange
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
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
  ctaContainer: {
    top: 80,
    backgroundColor: 'white',
    padding: 16,
  },
  mainContainer: {
    backgroundColor:'white',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  row: {
    flexShrink: 0,
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    left: 75,
    width: 335,
    marginTop: 75,
  },  
  dropZone: {
    flexDirection: "row",
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
    borderStyle: "dashed",
    overflow: 'hidden',
  },
  dropZone1f: {
    height: 100,
    width: 100,
    backgroundColor: "green",
    borderWidth: 3,
    borderColor: "#fff",
    borderStyle: "dashed",
    overflow: 'hidden',
  },
});
