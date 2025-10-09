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
import DraggableTarget from './DraggableTarget';

import PlantData, { getSeasonFromText, getTextFromLight, Plant, PlantLight, PlantZone, ZoneData, ZoneInfo, NullPlant } from './data/PlantData'
const plantData: Array<Plant> = PlantData();
const zoneData: Array<ZoneInfo> = ZoneData();

import GardenData, { Garden } from "./data/GardenData";
const gardenData = GardenData()

export default function PlantScreen() {
  const router = useRouter();
  const { image, gardens, types, models, conditions } = useLocalSearchParams<{ image: string; gardens: string; types: string; models: string; conditions: string; }>();
  const zoneInfo: ZoneInfo = zoneData.find(data => data.zone == parseInt((conditions+'').split(',')[0]) as PlantZone) || zoneData[0];
  const light: PlantLight = parseInt((conditions+'').split(',')[1]);
  const filteredPlantData = plantData.filter(plant => plant.light.includes(light) && plant.zones.includes(zoneInfo.zone));

  const carouselInstanceRef = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const [plantRefreshKey, setPlantRefreshKey] = useState(0);

  const nullPlant = NullPlant();

  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [checkDropPosition, setCheckDropPosition] = useState({x: 0, y: 0});

  /*

[ // gardens
  [ // garden
    [ // plant
      nullPlant, nullPlant, nullPlant // 3 seasons
    ]

    ]
  ]
  
  
  */
 console.log("types: ", types)
  const plantingGardens: Array<Garden> = ((types+'').split(',').filter((type) => type != '').map((gardenType) => gardenData.find((garden) => garden.name == gardenType)) || []) as Array<Garden> ;
  console.log("plantingGardens: ", plantingGardens)
  const plantingGrid = plantingGardens.map((garden) => garden.grid).map((g) => {
    let gardenRows = [];
    for (let i = 0; i < g[0]; i++) { // row
      let gardenColumns = [];
      for (let j = 0; j < g[1]; j++) { // column
        gardenColumns.push([nullPlant,nullPlant,nullPlant]); // nullPlant x3 for 3 seasons
      }
      gardenRows.push(gardenColumns);
    }
    return gardenRows;
  });
  console.log("plantingGrid: ", plantingGrid)

  
  const [drops, setDrops] = useState(plantingGrid); /*useState([
    [nullPlant, nullPlant, nullPlant],
    [nullPlant, nullPlant, nullPlant],
    [nullPlant, nullPlant, nullPlant]
  ]);*/


  const targetGrid = plantingGardens.map((garden) => garden.grid).map((g) => {
    let gardenRows = [];
    for (let i = 0; i < g[0]; i++) { // row
      let gardenColumns = [];
      for (let j = 0; j < g[1]; j++) { // column
        gardenColumns.push({x: i * 100 + 50, y: j * 100 + 50}); // nullPlant x3 for 3 seasons
      }
      gardenRows.push(gardenColumns);
    }
    return gardenRows;
  });
const [targets, setTargets] = useState(targetGrid);


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
        plants: drops.map(gardens => gardens.map(rows => rows.map(squares => squares.map(square => square.name)))).join(','),
      }
    });
  };

  const check3Plants = (gardenIndex: number, row: number, column: number) => {
    // check to show confirm button - currently just fill first 3 to show
    if (column != 1 && (!drops[0][0][0][0] || drops[0][0][0][0].color == nullPlant.color)) {
      return;
    }
    if (column != 2 && (!drops[0][0][1][0] || drops[0][0][1][0].color == nullPlant.color)) {
      return;
    }
    if (column != 3 && (!drops[0][0][2][0] || drops[0][0][2][0].color == nullPlant.color)) {
      return;
    }
    if (!isConfirmVisible){
      setIsConfirmVisible(true);
    }
  }

  // Draggable succesfully dropped onto Target
  const dropped = (gardenIndex: number, row: number, column: number, plant: Plant) => {
    const seasonIndex = (carouselInstanceRef.current?.getCurrentIndex() || 0);
    setDrops((prevDrops) => {
      const newDrops = [...prevDrops];
      newDrops[gardenIndex][row][column][seasonIndex] = plant;
      return newDrops;
    });
    check3Plants(gardenIndex, row, column);
    setPlantRefreshKey(plantRefreshKey + 1); // refrsh colors
  }
  
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
        height={200 * drops.length}
        data={data}
        onProgressChange={progress}
        onScrollEnd={() => setPlantRefreshKey(plantRefreshKey + 1)}
        renderItem={({ index }) => (
          <View>
            <View style={styles.dropZone}>
              {drops.map((garden: Array<Array<Array<Plant>>>, gardenIndex: number) => (
                <View style={{ flexDirection: 'column', borderWidth: 1, marginBottom: 5 }}>
                  {garden.map((gardenRow: Array<Array<Plant>>, gardenRowIndex: number) => (
                    <View style={{ flexDirection: 'row' }}>
                      {gardenRow.map((gardenSquare: Array<Plant>, gardenSquareIndex: number) => (
                        <DraggableTarget
                          plant={gardenSquare[index]}
                          season={index}
                          positionGarden={gardenIndex}
                          positionRow={gardenRowIndex}
                          positionColumn={gardenRowIndex}
                        ></DraggableTarget>
                      ))}
                    </View>
                  ))}
                </View>
              ))}
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
      <ThemeText style={styles.filterText}>
        { getTextFromLight(light) } - Zone { zoneInfo.zone.toString() } ({ zoneInfo.desc }) - { currentSeason(carouselInstanceRef.current?.getCurrentIndex() || 0) + "" }
      </ThemeText>
      <View style={styles.row} key={plantRefreshKey}>
        {filteredPlantData.filter((i: Plant) => i.seasons.includes(getSeasonFromText(currentSeason(carouselInstanceRef.current?.getCurrentIndex() || 0) + ""))).map((item: Plant, index: number) => (
          <View key={index} style={{ width: 80, height: 80, margin: 2, zIndex: 9999 }}>
            <Draggable dropped={dropped} targets={targets} plant={item}/>
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
  filterText:{
    fontFamily: 'LatoLight',
    fontSize: 16,
    lineHeight: 16,
    textAlign: 'left',
    height: 16,
    width: Dimensions.get("window").width - 70,
    marginLeft: 35,
    color: '#595959', // dark grey
    marginTop: 25,
    opacity: 0.25,
    overflow: 'hidden',
    textOverflow: 'elipses'
  },
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
    // top: 80,
    backgroundColor: 'white',
    padding: 16,
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0
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
    left: 35,
    width: Dimensions.get("window").width - 70,
    // marginTop: 25,
    marginTop: 0,
    borderWidth: 1,
    height: Dimensions.get("window").height - (575),
    borderRadius: 4,
    borderColor: '#595959', // dark grey
  },  
  dropZone: {
    // flexDirection: "row",
    flexDirection: "column",
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
