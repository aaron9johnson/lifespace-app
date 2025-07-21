
export enum PlantSeason {
    SPRING,
    SUMMER,
    AUTUMN,
}
export function getSeasonFromText(text: string): PlantSeason {
    switch (text) {
        case "Summer":
            return PlantSeason.SUMMER
        case "Autumn":
            return PlantSeason.AUTUMN
        default:
            return PlantSeason.SPRING
    }
}
export function getTextFromSeason(season: PlantSeason): string {
    switch (season) {
        case PlantSeason.SUMMER:
            return "Summer";
        case PlantSeason.AUTUMN:
            return "Autumn";
        default:
            return "Spring"
    }
}
export enum PlantLight {
    FULL_SUN,
    PART_SUN,
    FULL_SHADE,
}
export enum PlantZone {
    ZONE_0,
    ZONE_1,
    ZONE_2,
    ZONE_3,
    ZONE_4,
    ZONE_5,
    ZONE_6,
    ZONE_7,
    ZONE_8,
    ZONE_9,
    ZONE_10,
    ZONE_11,
    ZONE_12,
    ZONE_13
}
export class ZoneInfo {
    zone: PlantZone;
    name: string;
    desc: string;
    temp: string;
    cities: string;
    constructor(zone: PlantZone, name: string, desc: string, temp: string, cities: string){
        this.zone = zone;
        this.name = name;
        this.desc = desc;
        this.temp = temp;
        this.cities = cities;
    }
}
/**
 * Check if "city" text contains any of the zone info cities
 */
export function cityToZone(city: string, data: Array<ZoneInfo> | null): ZoneInfo {
    if (!data) {
        data = ZoneData();
    }
    return data.find((info) => {
        let c = info.cities.split(',');
        for (const key in c) {
            if (c[key] != '' && city.includes(c[key])) {
                return true;
            }
        }
        return false;
    }) || data[0];
}
export function ZoneData(): Array<ZoneInfo> {
    return [
        {
            zone: PlantZone.ZONE_0,
            name: 'Zone 0',
            desc: '',
            temp: '',
            cities: ''
        },
        {
            zone: PlantZone.ZONE_1,
            name: 'Zone 1',
            desc: 'Arctic Cold',
            temp: '-45°C (-49°F)',
            cities: ''
        },
        {
            zone: PlantZone.ZONE_2,
            name: 'Zone 2',
            desc: 'Subarctic Chill',
            temp: '-45 to -40°C (-49 to -40°F)',
            cities: 'Yellowknife'
        },
        {
            zone: PlantZone.ZONE_3,
            name: 'Zone 3',
            desc: 'Boreal Winters',
            temp: '-40°C to -35°C (-40°F to -31°F)',
            cities: 'Saskatoon'
        },
        {
            zone: PlantZone.ZONE_4,
            name: 'Zone 4',
            desc: 'Northern Frost',
            temp: '-35°C to -29°C (-31°F to -20°F)',
            cities: 'Winnipeg,Calgary,Edmonton'
        },
        {
            zone: PlantZone.ZONE_5,
            name: 'Zone 5',
            desc: 'Cool Temperate',
            temp: '-29°C to-23°C (-20°F to -9°F)',
            cities: 'Ottawa'
        },
        {
            zone: PlantZone.ZONE_6,
            name: 'Zone 6',
            desc: 'Mild Temperate',
            temp: '-23°C to -18°C (-9°F to -1°F)',
            cities: 'Halifax,Montreal'
        },
        {
            zone: PlantZone.ZONE_7,
            name: 'Zone 7',
            desc: 'Transitional Climate',
            temp: '-18°C to -12°C (-1°F to 10°F)',
            cities: "St. John's,Toronto"
        },
        {
            zone: PlantZone.ZONE_8,
            name: 'Zone 8',
            desc: 'Warm Temperate',
            temp: '-12°C to -7°C (10°F to 19°F)',
            cities: 'Vancouver'
        },
        {
            zone: PlantZone.ZONE_9,
            name: 'Zone 9',
            desc: 'Subtropical Light',
            temp: '-7°C to -1°C (19°F to 30°F)',
            cities: 'Victoria'
        },
        {
            zone: PlantZone.ZONE_10,
            name: 'Zone 10',
            desc: 'Subtropical',
            temp: '-1.1°C to 4.4°C (30°F and 40°F)',
            cities: ''
        },
        {
            zone: PlantZone.ZONE_11,
            name: 'Zone 11',
            desc: 'Tropical Mild',
            temp: '4.4°C to 10°C (40°F to 50°F)',
            cities: ''
        },
        {
            zone: PlantZone.ZONE_12,
            name: 'Zone 12',
            desc: 'Tropical Warm',
            temp: '10°C to 15°C (50°F to 60°F)',
            cities: ''
        },
        {
            zone: PlantZone.ZONE_13,
            name: 'Zone 13',
            desc: 'Tropical Hot',
            temp: '15°C to 18°C (60°F to 65°F)',
            cities: ''
        }
    ];

}
export class PlantInfo {
    season: PlantSeason;
    transplant: string;
    seed: string;
    nurture: string;
    grow: string;
    harvest: string;
    constructor(season = PlantSeason.SPRING, transplant = '', seed = '', nurture = '', grow = '', harvest = '') {
        this.season = season;
        this.transplant = transplant;
        this.seed = seed;
        this.nurture = nurture;
        this.grow = grow;
        this.harvest = harvest;
    }
}
export class Plant {
    // Properties (data)
    name: string;
    image: number;
    icon: number;
    planting: number;
    seasons: Array<PlantSeason>;
    zones: Array<PlantZone>;
    light: Array<PlantLight>;
    description: string;
    color: string;
    gardening: Array<PlantInfo>

    // Constructor (for initializing properties)
    constructor(name: string, image: number, icon: number, planting: number, seasons: Array<PlantSeason> = [], zones: Array<PlantZone> = [], light: Array<PlantLight> = [], description = '', color = '#000000', gardening: Array<PlantInfo> = []) {
        this.name = name;
        this.image = image;
        this.icon = icon;
        this.planting = planting;
        this.seasons = seasons;
        this.zones = zones;
        this.light = light;
        this.description = description;
        this.color = color;
        this.gardening = gardening;
    }
    // Method (behavior)
    // displayInfo(): void {
    //     console.log(`ID: ${this.id}, Name: ${this.name}`);
        
    // }
}
export default function PlantData(): Array<Plant> {
    return ([
        {
            name: 'Arugula',
            image: require('@/assets/images/plants/arugula.png'),
            icon: require('@/assets/images/plants/arugula-icon.png'),
            planting: require('@/assets/images/plants/arugula-planting.png'),
            seasons: [ PlantSeason.SPRING, PlantSeason.AUTUMN ],
            zones:[ PlantZone.ZONE_3, PlantZone.ZONE_4, PlantZone.ZONE_5, PlantZone.ZONE_6, PlantZone.ZONE_7, PlantZone.ZONE_8, PlantZone.ZONE_9, PlantZone.ZONE_10, PlantZone.ZONE_11 ],
            light:[ PlantLight.FULL_SUN, PlantLight.PART_SUN ],
            description: "Arugula, also known as rocket, rucola, or roquette, is a leafy green vegetable with a distinctive peppery and slightly bitter taste. It's a member of the Brassica family, related to vegetables like cabbage and mustard greens. Arugula is commonly used in salads, as a pizza topping, or in sandwiches, and can also be lightly cooked.",
            color: '#f1f6ee',
            gardening: [
                {
                    season: PlantSeason.SPRING,
                    transplant: '',
                    seed: ' • Arugula 16 per sq/ft',
                    nurture: '',
                    grow: 'Harvest arugula by cutting the outer leaves of each plant, allowing 1/3 of the plant to remain growing for a continuous harvest.',
                    harvest: 'Harvest remaining arugula as mid to end of May approaches. Amend soil by digging in 1-2 cups of organic fertilizer.'
                },
                {
                    season: PlantSeason.AUTUMN,
                    transplant: '',
                    seed: ' • Arugula 16 per sq/ft',
                    nurture: '',
                    grow: 'Harvest arugula by cutting the outer leaves of each plant, allowing 1/3 of the plant to remain growing for a continuous harvest.',
                    harvest: ''
                }
            ]
        },
        {
            name: 'Radishes',
            image: require('@/assets/images/plants/radishes.png'),
            icon: require('@/assets/images/plants/radishes-icon.png'),
            planting: require('@/assets/images/plants/radishes-planting.png'),
            seasons: [ PlantSeason.SPRING, PlantSeason.AUTUMN ],
            zones:[ PlantZone.ZONE_2, PlantZone.ZONE_3, PlantZone.ZONE_4, PlantZone.ZONE_5, PlantZone.ZONE_6, PlantZone.ZONE_7, PlantZone.ZONE_8, PlantZone.ZONE_9, PlantZone.ZONE_10, PlantZone.ZONE_11 ],
            light:[ PlantLight.FULL_SUN, PlantLight.PART_SUN ],
            description: 'Radishes are a versatile root vegetable with a crisp texture and peppery flavor, commonly eaten raw or cooked. They are a member of the mustard family and come in various sizes, colors, and shapes, including the familiar round red radishes and the longer, milder daikon radishes. Radishes are a good source of vitamins C and K, and they are relatively low in calories.',
            color: '#f1f6ee',
            gardening: [
                {
                    season: PlantSeason.SPRING,
                    transplant: 'Root crops (Radishes) prefer to be directly seeded.',
                    seed: ' • Radish 16 per sq/ft',
                    nurture: '',
                    grow: 'Pull radishes out when their shoulders begin to push out of the soil.',
                    harvest: ''
                },
                {
                    season: PlantSeason.AUTUMN,
                    transplant: '',
                    seed: ' • Radish 6 per sq/ft',
                    nurture: 'As radishes germinate, thin seedlings following the spacing of 16 per sq/ft. Thinnings can be saved and eaten as microgreens.',
                    grow: 'Harvest radishes when they are the size of a small golf ball. Root crops can remain in the ground as frost approaches. They will continue to grow slowly. Harvest as needed, when needed.',
                    harvest: ''
                }
            ]
        },
        {
            name: 'Mesclun',
            image: require('@/assets/images/plants/mesclun.png'),
            icon: require('@/assets/images/plants/mesclun-icon.png'),
            planting: require('@/assets/images/plants/mesclun-planting.png'),
            seasons: [ PlantSeason.SPRING, PlantSeason.SUMMER, PlantSeason.AUTUMN ],
            zones:[ PlantZone.ZONE_2, PlantZone.ZONE_3, PlantZone.ZONE_4, PlantZone.ZONE_5, PlantZone.ZONE_6, PlantZone.ZONE_7, PlantZone.ZONE_8, PlantZone.ZONE_9, PlantZone.ZONE_10, PlantZone.ZONE_11 ],
            light:[ PlantLight.FULL_SUN, PlantLight.PART_SUN ],
            description: 'Mesclun, also known as "spring mix", is a blend of various young, tender salad greens. Originating from Provence, France, it typically includes a mix of lettuces, arugula, endive, and chervil, but can also incorporate other greens like spinach, kale, mustard greens, and radicchio. The appeal of mesclun lies in its diverse flavors, textures, and colors, offering a delightful combination of mild, peppery, bitter, and sweet notes. ',
            color: '#f1f6ee',
            gardening: [
                {
                    season: PlantSeason.SPRING,
                    transplant: '',
                    seed: ' • Mesclun Greens 16 per sq/ft',
                    nurture: '',
                    grow: 'Trim mesclun greens with scissors when they are a few inches tall.',
                    harvest: ''
                },
                {
                    season: PlantSeason.SUMMER,
                    transplant: '',
                    seed: ' • Mesclun Greens 16 per sq/ft',
                    nurture: '',
                    grow: 'Salad greens are a "cut and come again" crop, meaning when you harvest them down with a pair of scissors, they will regrow.',
                    harvest: ''
                },
                {
                    season: PlantSeason.AUTUMN,
                    transplant: '',
                    seed: ' • Mesclun Greens 16 per sq/ft',
                    nurture: '',
                    grow: 'Harvest mesclun greens by cutting the outer leaves of each plant, allowing 1/3 of the plant to remain growing for a continuous harvest, or use a pair of scissors and trim down leaves for them to regrow. Continue to harvest mesclun greens until frost.',
                    harvest: ''
                }
            ]
        },
        {
            name: 'Patio Toms',
            image: require('@/assets/images/plants/toms.png'),
            icon: require('@/assets/images/plants/toms-icon.png'),
            planting: require('@/assets/images/plants/toms-planting.png'),
            seasons: [ PlantSeason.SUMMER, PlantSeason.AUTUMN ],
            zones:[ PlantZone.ZONE_3, PlantZone.ZONE_4, PlantZone.ZONE_5, PlantZone.ZONE_6, PlantZone.ZONE_7, PlantZone.ZONE_8, PlantZone.ZONE_9, PlantZone.ZONE_10, PlantZone.ZONE_11 ],
            light:[ PlantLight.FULL_SUN ],
            description: 'Patio tomatoes thrive in containers, patios, and small gardens. They are compact, bush-type plants, often determinate, meaning they produce a full crop all at once. Many varieties are known for their early maturity and abundant yields of flavorful, medium-sized tomatoes. ',
            color: '#f1f6ee',
            gardening: [
                {
                    season: PlantSeason.SUMMER,
                    transplant: 'Select a compact patio or determinate type of tomato. When evening termperatures are above 10°C, transplant seedlings into your garden.\n • Tomato Seedlings 1 per sq/ft',
                    seed: '',
                    nurture: "Pinch 'suckers' off tomatoes to encourage more fruit production.",
                    grow: 'Harvest tomatoes as they ripen.',
                    harvest: 'Tomatoes will continue producing until first frost. Keep the plants pruned to shape. Remove excess leafs and branches, and keep soil clean of dropped fruit.'
                },
                {
                    season: PlantSeason.AUTUMN,
                    transplant: '',
                    seed: '',
                    nurture: 'Continue to allow your tomatoes to produce until the end of the season. In med Sept you can pinch off new yellow flowers to encourage existing fruit to ripen.\n • Pro tip! At end of season, ripen green tomatoes inside a paper bag with a banana.',
                    grow: 'Harvest everything prior to first freeze.',
                    harvest: ''
                }
            ]
        },
        {
            name: 'Basil',
            image: require('@/assets/images/plants/basil.png'),
            icon: require('@/assets/images/plants/basil-icon.png'),
            planting: require('@/assets/images/plants/basil-planting.png'),
            seasons: [ PlantSeason.SUMMER ],
            zones:[ PlantZone.ZONE_4, PlantZone.ZONE_5, PlantZone.ZONE_6, PlantZone.ZONE_7, PlantZone.ZONE_8, PlantZone.ZONE_9, PlantZone.ZONE_10, PlantZone.ZONE_11 ],
            light:[ PlantLight.FULL_SUN, PlantLight.PART_SUN ],
            description: "Basil, belonging to the mint family, is a fragrant herb widely used in culinary applications, particularly in Italian and Mediterranean cuisines. It's known for its aromatic leaves, which can be used fresh or dried to flavor various dishes like pesto, sauces, salads, and soups. Beyond its culinary uses, basil is also recognized for potential health benefits and is available in numerous varieties, each with unique flavors and fragrances. ",
            color: '#f1f6ee',
            gardening: [
                {
                    season: PlantSeason.SUMMER,
                    transplant: 'When evening temperatures are above 10°C:\n• Basil seedlings 4 per sq/ft',
                    seed: '',
                    nurture: 'Pinch the top of your basil plants for fuller plants.',
                    grow: 'Harvest basil by pinching the top leaves off the plant,  where the leaf meets the stem. Continue to harvest basil as needed. Turn basil into a pesto if you have an abundance ready for harvest in the height of the season.',
                    harvest: 'As September approaches, harvest remaining basil.',
                }
            ]
        },
        {
            name: 'Spinach',
            image: require('@/assets/images/plants/spinach.png'),
            icon: require('@/assets/images/plants/spinach-icon.png'),
            planting: require('@/assets/images/plants/spinach-planting.png'),
            seasons: [ PlantSeason.SPRING, PlantSeason.AUTUMN ],
            zones:[ PlantZone.ZONE_3, PlantZone.ZONE_4, PlantZone.ZONE_5, PlantZone.ZONE_6, PlantZone.ZONE_7, PlantZone.ZONE_8, PlantZone.ZONE_9, PlantZone.ZONE_10 ],
            light:[ PlantLight.FULL_SUN, PlantLight.PART_SUN ],
            description: "Spinach is a leafy green vegetable known for its nutritional value and versatility in cooking. It can be eaten raw in salads or cooked in various dishes like soups, stews, or as a side. Spinach is a good source of vitamins A, C, and K, as well as iron, folate, and fiber. ",
            color: '#f1f6ee',
            gardening: [
                {
                    season: PlantSeason.SPRING,
                    transplant: '',
                    seed: ' • Spinach 9 per sq/ft',
                    nurture: '',
                    grow: 'Harvest Spinach by cutting the outer leaves of each plant, allowing 1/3 of the plant to remain grwoing for a continuous harvest. The younger the plant, the more mild it will taste. Harvest everything prior to first freeze.',
                    harvest: 'Spinach will continue producing until freezing.',
                },
                {
                    season: PlantSeason.AUTUMN,
                    transplant: '',
                    seed: ' • Spinach 9 per sq/ft',
                    nurture: '',
                    grow: 'Harvest Spinach by cutting or pinching outer leaves of each plant, allowing 1/3 of the plant to remain grwoing for a continuous harvest. The younger the plant, the more mild it will taste. Harvest everything prior to first freeze.',
                    harvest: 'Spinach will continue producing until freezing. Hearty plants like Spinach can survive over winter in some environments.',
                }
            ]
        },
        {
            name: 'Scallions',
            image: require('@/assets/images/plants/scallions.png'),
            icon: require('@/assets/images/plants/scallions-icon.png'),
            planting: require('@/assets/images/plants/scallions-planting.png'),
            seasons: [ PlantSeason.SPRING, PlantSeason.AUTUMN],
            zones:[ PlantZone.ZONE_6, PlantZone.ZONE_7, PlantZone.ZONE_8, PlantZone.ZONE_9 ],
            light:[ PlantLight.FULL_SUN, PlantLight.PART_SUN ],
            description: "Scallions, also known as green onions, are a type of Allium vegetable with a mild, oniony flavor. They consist of a white bulb and long, slender green stalks, both of which are edible. Scallions are versatile and can be used raw or cooked in a variety of dishes.",
            color: '#f1f6ee',
            gardening: [
                {
                    season: PlantSeason.SPRING,
                    transplant: ' • Scallions 16 per sq/ft',
                    seed: '',
                    nurture: '',
                    grow: 'Harvest scallions when they are the diameter of a pencil.',
                    harvest: 'Harvest scallions as mid to end of May approaches.',
                },
                {
                    season: PlantSeason.AUTUMN,
                    transplant: ' • Scallions 16 per sq/ft',
                    seed: '',
                    nurture: '',
                    grow: 'Harvest scallions when they are the diameter of a pencil.',
                    harvest: '',
                }
            ]
        },
        {
            name: 'Cilantro',
            image: require('@/assets/images/plants/cilantro.png'),
            icon: require('@/assets/images/plants/cilantro-icon.png'),
            planting: require('@/assets/images/plants/cilantro-planting.png'),
            seasons: [ PlantSeason.SPRING, PlantSeason.AUTUMN],
            zones:[ PlantZone.ZONE_2, PlantZone.ZONE_3, PlantZone.ZONE_4, PlantZone.ZONE_5, PlantZone.ZONE_6, PlantZone.ZONE_7, PlantZone.ZONE_8, PlantZone.ZONE_9, PlantZone.ZONE_10, PlantZone.ZONE_11 ],
            light:[ PlantLight.FULL_SUN, PlantLight.PART_SUN ],
            description: "Cilantro, also known as coriander in many parts of the world, is an herb from the Coriandrum sativum plant. It is known for its distinctive, fresh, and slightly citrusy flavor. The leaves and stems are used in cooking, particularly in Latin American, Indian, and Asian dishes. The seeds of the same plant, when dried, are called coriander and are used as a spice. ",
            color: '#f1f6ee',
            gardening: [
                {
                    season: PlantSeason.SPRING,
                    transplant: '',
                    seed: ' • Cilantro 9 per sq/ft',
                    nurture: '',
                    grow: 'Harvest cilantro as needed.',
                    harvest: 'Harvest cilantro as mid to end of May approaches.',
                },
                {
                    season: PlantSeason.AUTUMN,
                    transplant: ' • Cilantro 4 per sq/ft',
                    seed: ' • You can direct seed cilantro as well. It is ready in 40-60 days from seeding. So depending on how many days you have until first frost: seed or transplant accordingly.',
                    nurture: 'To preserve herbs through the late autumn and winter, harvest and put them in ice cube trays with a neutral oil.',
                    grow: 'Harvest cilantro as needed.',
                    harvest: '',
                }
            ]
        },
        {
            name: 'Parsley',
            image: require('@/assets/images/plants/parsley.png'),
            icon: require('@/assets/images/plants/parsley-icon.png'),
            planting: require('@/assets/images/plants/parsley-planting.png'),
            seasons: [ PlantSeason.SPRING, PlantSeason.SUMMER, PlantSeason.AUTUMN],
            zones:[ PlantZone.ZONE_3, PlantZone.ZONE_4, PlantZone.ZONE_5, PlantZone.ZONE_6, PlantZone.ZONE_7, PlantZone.ZONE_8, PlantZone.ZONE_9 ],
            light:[ PlantLight.FULL_SUN, PlantLight.PART_SUN ],
            description: "Parsley is a flowering plant in the family Apiaceae, commonly used as an herb and a vegetable. Native to the Mediterranean, it's now cultivated worldwide and is known for its bright, grassy flavor. There are two main types: curly leaf parsley (often used as a garnish) and flat leaf parsley (also known as Italian parsley, favored for cooking). Parsley is rich in vitamins A, C, and K, and also contains antioxidants and other beneficial compounds. ",
            color: '#f1f6ee',
            gardening: [
                {
                    season: PlantSeason.SPRING,
                    transplant: ' • Parsley 4 per sq/ft',
                    seed: '',
                    nurture: '',
                    grow: 'Harvest parsley as needed.',
                    harvest: '',
                },
                {
                    season: PlantSeason.SUMMER,
                    transplant: ' • Parsley 4 per sq/ft',
                    seed: '',
                    nurture: 'If parsley bolts (begins to flower), remove plants and reseed or transplant new seedlings.',
                    grow: 'Harvest parsley as needed.',
                    harvest: '',
                },
                {
                    season: PlantSeason.AUTUMN,
                    transplant: '',
                    seed: '',
                    nurture: 'To preserve herbs through the late autumn and winter, harvest and put them in ice cube trays with a neutral oil.',
                    grow: 'Harvest parsley as needed.',
                    harvest: '',
                }
            ]
        },
        {
            name: 'Dill',
            image: require('@/assets/images/plants/dill.png'),
            icon: require('@/assets/images/plants/dill-icon.png'),
            planting: require('@/assets/images/plants/dill-planting.png'),
            seasons: [ PlantSeason.SUMMER],
            zones:[ PlantZone.ZONE_2, PlantZone.ZONE_3, PlantZone.ZONE_4, PlantZone.ZONE_5, PlantZone.ZONE_6, PlantZone.ZONE_7, PlantZone.ZONE_8, PlantZone.ZONE_9, PlantZone.ZONE_10, PlantZone.ZONE_11 ],
            light:[ PlantLight.FULL_SUN, PlantLight.PART_SUN ],
            description: "Dill is a fragrant herb with feathery green leaves and a distinct, slightly sweet flavor. It's commonly used in cooking, particularly with fish, potatoes, and yogurt-based sauces. Dill is also known for its potential health benefits, including being a good source of vitamins A and C and antioxidants.",
            color: '#f1f6ee',
            gardening: [
                {
                    season: PlantSeason.SUMMER,
                    transplant: 'Can also transplant dill seedlings.',
                    seed: 'When evening temperatures are above 10°C:\n • Dill 4 per sq/ft\n(Sprinkle a few dill seeds per hole, spacing 4 holes per sq/ft)',
                    nurture: '',
                    grow: 'Pick dill before it starts to flower.',
                    harvest: 'As September approaches, harvest remaining dill.',
                }
            ]
        },
        {
            name: 'Kale',
            image: require('@/assets/images/plants/kale.png'),
            icon: require('@/assets/images/plants/kale-icon.png'),
            planting: require('@/assets/images/plants/kale-planting.png'),
            seasons: [ PlantSeason.SUMMER],
            zones:[ PlantZone.ZONE_5 ],
            light:[ PlantLight.FULL_SUN ],
            description: "Kale is a leafy green vegetable, known for its nutritional value and versatility in cooking. It belongs to the cruciferous vegetable family, which includes broccoli, cabbage, and Brussels sprouts. Kale is available in various types, including curly kale, Lacinato kale (also known as dinosaur kale), and Russian kale, each with slightly different appearances and textures. It can be eaten raw in salads, cooked in various dishes, or even made into kale chips. ",
            color: '#f1f6ee',
            gardening: [
                {
                    season: PlantSeason.SUMMER,
                    transplant: '',
                    seed: '',
                    nurture: '',
                    grow: '',
                    harvest: '',
                }
            ]
        },
        {
            name: 'Lettuce',
            image: require('@/assets/images/plants/kale.png'),
            icon: require('@/assets/images/plants/kale-icon.png'),
            planting: require('@/assets/images/plants/kale-planting.png'),
            seasons: [ PlantSeason.SUMMER],
            zones:[ PlantZone.ZONE_5 ],
            light:[ PlantLight.FULL_SUN ],
            description: "",
            color: '#f1f6ee',
            gardening: [
                {
                    season: PlantSeason.SUMMER,
                    transplant: '',
                    seed: '',
                    nurture: '',
                    grow: '',
                    harvest: '',
                }
            ]
        },
        {
            name: 'Peas',
            image: require('@/assets/images/plants/kale.png'),
            icon: require('@/assets/images/plants/kale-icon.png'),
            planting: require('@/assets/images/plants/kale-planting.png'),
            seasons: [ PlantSeason.SUMMER],
            zones:[ PlantZone.ZONE_5 ],
            light:[ PlantLight.FULL_SUN ],
            description: "",
            color: '#f1f6ee',
            gardening: [
                {
                    season: PlantSeason.SUMMER,
                    transplant: '',
                    seed: '',
                    nurture: '',
                    grow: '',
                    harvest: '',
                }
            ]
        },
        {
            name: 'Carrots',
            image: require('@/assets/images/plants/kale.png'),
            icon: require('@/assets/images/plants/kale-icon.png'),
            planting: require('@/assets/images/plants/kale-planting.png'),
            seasons: [ PlantSeason.SUMMER],
            zones:[ PlantZone.ZONE_5 ],
            light:[ PlantLight.FULL_SUN ],
            description: "",
            color: '#f1f6ee',
            gardening: [
                {
                    season: PlantSeason.SUMMER,
                    transplant: '',
                    seed: '',
                    nurture: '',
                    grow: '',
                    harvest: '',
                }
            ]
        },
        {
            name: 'Beets',
            image: require('@/assets/images/plants/kale.png'),
            icon: require('@/assets/images/plants/kale-icon.png'),
            planting: require('@/assets/images/plants/kale-planting.png'),
            seasons: [ PlantSeason.SUMMER],
            zones:[ PlantZone.ZONE_5 ],
            light:[ PlantLight.FULL_SUN ],
            description: "",
            color: '#f1f6ee',
            gardening: [
                {
                    season: PlantSeason.SUMMER,
                    transplant: '',
                    seed: '',
                    nurture: '',
                    grow: '',
                    harvest: '',
                }
            ]
        },
        {
            name: 'Bush Beans',
            image: require('@/assets/images/plants/kale.png'),
            icon: require('@/assets/images/plants/kale-icon.png'),
            planting: require('@/assets/images/plants/kale-planting.png'),
            seasons: [ PlantSeason.SUMMER],
            zones:[ PlantZone.ZONE_5 ],
            light:[ PlantLight.FULL_SUN ],
            description: "",
            color: '#f1f6ee',
            gardening: [
                {
                    season: PlantSeason.SUMMER,
                    transplant: '',
                    seed: '',
                    nurture: '',
                    grow: '',
                    harvest: '',
                }
            ]
        },
        {
            name: 'Mustard',
            image: require('@/assets/images/plants/kale.png'),
            icon: require('@/assets/images/plants/kale-icon.png'),
            planting: require('@/assets/images/plants/kale-planting.png'),
            seasons: [ PlantSeason.SUMMER],
            zones:[ PlantZone.ZONE_5 ],
            light:[ PlantLight.FULL_SUN ],
            description: "",
            color: '#f1f6ee',
            gardening: [
                {
                    season: PlantSeason.SUMMER,
                    transplant: '',
                    seed: '',
                    nurture: '',
                    grow: '',
                    harvest: '',
                }
            ]
        },
        {
            name: 'Cucumber',
            image: require('@/assets/images/plants/kale.png'),
            icon: require('@/assets/images/plants/kale-icon.png'),
            planting: require('@/assets/images/plants/kale-planting.png'),
            seasons: [ PlantSeason.SUMMER],
            zones:[ PlantZone.ZONE_5 ],
            light:[ PlantLight.FULL_SUN ],
            description: "",
            color: '#f1f6ee',
            gardening: [
                {
                    season: PlantSeason.SUMMER,
                    transplant: '',
                    seed: '',
                    nurture: '',
                    grow: '',
                    harvest: '',
                }
            ]
        },
        {
            name: 'Peppers',
            image: require('@/assets/images/plants/kale.png'),
            icon: require('@/assets/images/plants/kale-icon.png'),
            planting: require('@/assets/images/plants/kale-planting.png'),
            seasons: [ PlantSeason.SUMMER],
            zones:[ PlantZone.ZONE_5 ],
            light:[ PlantLight.FULL_SUN ],
            description: "",
            color: '#f1f6ee',
            gardening: [
                {
                    season: PlantSeason.SUMMER,
                    transplant: '',
                    seed: '',
                    nurture: '',
                    grow: '',
                    harvest: '',
                }
            ]
        }
    ]);
}


//             {
//                 name: 'Arugula',
//                 image: require('@/assets/images/arugula.png'),
//                 icon: require('@/assets/images/arugula-planting.png'),
//                 planting: require('@/assets/images/arugula-planting.png'),
//                 seasons: [ PlantSeason.SPRING, PlantSeason.AUTUMN ],
//                 description: 'Direct seed 16 per sq/ft',
//                 color: '#f1f6ee',
//                 gardening: [
//                     {
//                         season: PlantSeason.SPRING,
//                         transplant: '',
//                         seed: ' • Arugula 16 per sq/ft',
//                         nurture: '',
//                         grow: 'Harvest arugula by cutting the outer leaves of each plant, allowing 1/3 of the plant to remain growing for a continuous harvest.',
//                     },
//                     {
//                         season: PlantSeason.AUTUMN,
//                         transplant: '',
//                         seed: ' • Arugula 16 per sq/ft',
//                         nurture: '',
//                         grow: 'Harvest arugula by cutting the outer leaves of each plant, allowing 1/3 of the plant to remain growing for a continuous harvest.',
//                     }
//                 ]
//             },
//             {
//                 name: 'Patio Toms',
//                 image: require('@/assets/images/toms.png'),
//                 icon: require('@/assets/images/toms.png'),
//                 planting: require('@/assets/images/toms-planting.png'),
//                 seasons: [ PlantSeason.SUMMER, PlantSeason.AUTUMN ],
//                 description: 'Good plant......',
//                 color: '#fbe8e9',
//                 gardening: [
//                     {
//                         season: PlantSeason.SUMMER,
//                         transplant: 'Select a compact patio or determinate type of tomato. When evening termperatures are above 10 C, transplant seedlings into your garden.\n • Tomato Seedlings 1 per sq/ft',
//                         seed: '',
//                         nurture: "Pinch 'suckers' off tomatoes to encourage more fruit production.",
//                         grow: 'Harvest tomatoes as they ripen.',

//                     },
//                     {
//                         season: PlantSeason.AUTUMN,
//                         transplant: 'Select a compact patio or determinate type of tomato. When evening termperatures are above 10 C, transplant seedlings into your garden.\n • Tomato Seedlings 1 per sq/ft',
//                         seed: '',
//                         nurture: "Pinch 'suckers' off tomatoes to encourage more fruit production.",
//                         grow: 'Harvest tomatoes as they ripen.',
//                     }
//                 ]
//             },
//             {
//                 name: 'Radishes',
//                 image: require('@/assets/images/radishes.png'),
//                 icon: require('@/assets/images/radishes.png'),
//                 planting: require('@/assets/images/radishes-planting.png'),
//                 seasons: [ PlantSeason.SPRING, PlantSeason.AUTUMN  ],
//                 description: 'Good plant......',
//                 color: '#fbe8e9',
//                 gardening: [
//                     {
//                         season: PlantSeason.SPRING,
//                         transplant: 'Root crops (Radishes) prefer to be directly seeded.',
//                         seed: ' • Radish 16 per sq/ft',
//                         nurture: '',
//                         grow: 'Pull radishes out when their shoulders begin to push out of the soil (about the size of a small golf ball).',

//                     },
//                     {
//                         season: PlantSeason.AUTUMN,
//                         transplant: 'Root crops (Radishes) prefer to be directly seeded.',
//                         seed: ' • Radish 16 per sq/ft',
//                         nurture: '',
//                         grow: 'Pull radishes out when their shoulders begin to push out of the soil (about the size of a small golf ball).',

//                     }
//                 ]
//             },
//             {
//                 name: 'Parsley',
//                 image: require('@/assets/images/parsley.png'),
//                 icon: require('@/assets/images/parsley.png'),
//                 planting: require('@/assets/images/parsley-planting.png'),
//                 seasons: [ PlantSeason.SPRING, PlantSeason.SUMMER, PlantSeason.AUTUMN ],
//                 description: 'Good plant......',
//                 color: '#eef9db',
//                 gardening: [
//                     {
//                         season: PlantSeason.SPRING,
//                         transplant: ' • Parsley 4 per sq/ft',
//                         seed: '',
//                         nurture: 'If parsley bolts (begins to flower), remove plants and reseed or transplant new seedlings. To preserve fresh herbs through the late autumn and winter, harvest and put them in ice cube trays with a neutral oil.',
//                         grow: 'Harvest Parsley as needed.',

//                     },
//                     {
//                         season: PlantSeason.SUMMER,
//                         transplant: ' • Parsley 4 per sq/ft',
//                         seed: '',
//                         nurture: 'If parsley bolts (begins to flower), remove plants and reseed or transplant new seedlings. To preserve fresh herbs through the late autumn and winter, harvest and put them in ice cube trays with a neutral oil.',
//                         grow: 'Harvest Parsley as needed.',

//                     },
//                     {
//                         season: PlantSeason.AUTUMN,
//                         transplant: ' • Parsley 4 per sq/ft',
//                         seed: '',
//                         nurture: 'If parsley bolts (begins to flower), remove plants and reseed or transplant new seedlings. To preserve fresh herbs through the late autumn and winter, harvest and put them in ice cube trays with a neutral oil.',
//                         grow: 'Harvest Parsley as needed.',

//                     }
//                 ]
//             },
//             {
//                 name: 'Carrots',
//                 image: require('@/assets/images/carrots.png'),
//                 icon: require('@/assets/images/carrots.png'),
//                 planting: require('@/assets/images/carrots-planting.png'),
//                 seasons: [ PlantSeason.SPRING, PlantSeason.SUMMER, PlantSeason.AUTUMN ],
//                 description: 'Good plant......',
//                 color: '#fef6e6',
//                 gardening: [
//                     {
//                         season: PlantSeason.SPRING,
//                         transplant: ' • Parsley 4 per sq/ft',
//                         seed: '',
//                         nurture: 'If parsley bolts (begins to flower), remove plants and reseed or transplant new seedlings. To preserve fresh herbs through the late autumn and winter, harvest and put them in ice cube trays with a neutral oil.',
//                         grow: 'Harvest Parsley as needed.',

//                     },
//                     {
//                         season: PlantSeason.SUMMER,
//                         transplant: ' • Parsley 4 per sq/ft',
//                         seed: '',
//                         nurture: 'If parsley bolts (begins to flower), remove plants and reseed or transplant new seedlings. To preserve fresh herbs through the late autumn and winter, harvest and put them in ice cube trays with a neutral oil.',
//                         grow: 'Harvest Parsley as needed.',

//                     },
//                     {
//                         season: PlantSeason.AUTUMN,
//                         transplant: ' • Parsley 4 per sq/ft',
//                         seed: '',
//                         nurture: 'If parsley bolts (begins to flower), remove plants and reseed or transplant new seedlings. To preserve fresh herbs through the late autumn and winter, harvest and put them in ice cube trays with a neutral oil.',
//                         grow: 'Harvest Parsley as needed.',

//                     }
//                 ]
//             },
//             {
//                 name: 'Peppers',
//                 image: require('@/assets/images/peppers.png'),
//                 icon: require('@/assets/images/peppers.png'),
//                 planting: require('@/assets/images/peppers-planting.png'),
//                 seasons: [PlantSeason.SUMMER ],
//                 description: 'Good plant......',
//                 color: '#fbe8e9',
//                 gardening: [
//                     {
//                         season: PlantSeason.SUMMER,
//                         transplant: ' • Choose your favourite peppers: bell peppers / hot peppers and plant 1 per sq/ft from seedling.',
//                         seed: ' • To maximize space, consider planting cilantro by seed around and under pepper plants.',
//                         nurture: 'Peppers that set after late August will not usually develop or ripen. Pull out the entire bush just before the first frost and hang it upside down in a warm, dry place to ripen hot peppers.',
//                         grow: 'Peppers are edible at any stage of growth, but the flavour will be different. Peppers picked early will usually have less sweetness and more bitterness. Peppers will change colour as they ripen. Harvest peppers as you wish! Pick off remaining peppers as the end of the season approaches. Mulch garden for the winter.',

//                     }
//                 ]
//             },
//             {
//                 name: 'Kale',
//                 image: require('@/assets/images/kale.png'),
//                 icon: require('@/assets/images/kale.png'),
//                 planting: require('@/assets/images/kale-planting.png'),
//                 seasons: [PlantSeason.SPRING, PlantSeason.SUMMER, PlantSeason.AUTUMN ],
//                 description: 'Good plant......',
//                 color: '#eef9db',
//                 gardening: [
//                     {
//                         season: PlantSeason.SPRING,
//                         transplant: ' • Kale 1 per sq/ft',
//                         seed: '',
//                         nurture: 'Spring planted Kale will continue to grow through the summer into the autumn. Pick the bottom leaves, and work your way up. Kale will continue to grow through the winter months. It tastes sweeter in colder temperatures when it turnes starches into sugars.',
//                         grow: '',

//                     },
//                     {
//                         season: PlantSeason.SUMMER,
//                         transplant: ' • Kale 1 per sq/ft',
//                         seed: '',
//                         nurture: 'Spring planted Kale will continue to grow through the summer into the autumn. Pick the bottom leaves, and work your way up. Kale will continue to grow through the winter months. It tastes sweeter in colder temperatures when it turnes starches into sugars.',
//                         grow: '',

//                     },
//                     {
//                         season: PlantSeason.AUTUMN,
//                         transplant: ' • Kale 1 per sq/ft',
//                         seed: '',
//                         nurture: 'Spring planted Kale will continue to grow through the summer into the autumn. Pick the bottom leaves, and work your way up. Kale will continue to grow through the winter months. It tastes sweeter in colder temperatures when it turnes starches into sugars.',
//                         grow: '',

//                     }
//                 ]
//             },
//             {
//                 name: 'Mustard',
//                 image: require('@/assets/images/mustard.png'),
//                 icon: require('@/assets/images/mustard.png'),
//                 planting: require('@/assets/images/mustard-planting.png'),
//                 seasons: [PlantSeason.SPRING],
//                 description: 'Good plant......',
//                 color: '#eef9db',
//                 gardening: [
//                     {
//                         season: PlantSeason.SPRING,
//                         transplant: '',
//                         seed: ' • Mustard Greens 16 per sq/ft',
//                         nurture: '',
//                         grow: 'Harvest mustard greens when they are small 2-4" tall',

//                     }
//                 ]
//             }

//         ]
//     });
// }

/*
            
            Fire Engine Red #CD222B -> #fbe8e9
            , Desert Sand #EEC59E -> #fdf9f5
            , Gamboge #E8A10C -> #fef6e6
            , Army Green #354D0C -> #eef9db,
            Apple #73A753 -> #f1f6ee
             and Flax #E4D57C -> #fcfbf2.

            */
            // {
            //     name: 'Cucumber',
            //     image: require('@/assets/images/cucumber.png'),
            //     icon: require('@/assets/images/cuc.png'),
            //     planting: require('@/assets/images/cucumber.png'),
            //     seasons: [ PlantSeason.SPRING, PlantSeason.SUMMER, PlantSeason.AUTUMN],
            //     description: 'Good plant.',
            //     color: '#3CB043'
            // },
