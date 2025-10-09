export class GardenBuy {
    name: string;
    price: number;
    rating: number;
    reviews: number;
    description: string;
    desc: string;
    constructor(name: string, price = 0.0, rating = 0.0, reviews = 0, description = '', desc = '') {
        this.name = name;
        this.price = price;
        this.rating = rating;
        this.reviews = reviews;
        this.description = description;
        this.desc = desc;
    }
}
export class GardenColor {
    name: string;
    image: number;
    checkout: string;
    dae: number;
    daeImages: any;
    constructor(name: string, image: number, checkout: string, dae: number, daeImages: any) {
        this.name = name;
        this.image = image;
        this.checkout = checkout;
        this.dae = dae;
        this.daeImages = daeImages;
    }
}
export class Garden {
    name: string;
    grid: Array<number>;
    buy: GardenBuy;
    image: number;
    colors: Array<GardenColor>
    constructor(name: string, grid: Array<number>, buy: GardenBuy, image: number, colors: Array<GardenColor>) {
        this.name = name;
        this.grid = grid;
        this.buy = buy;
        this.image = image;
        this.colors = colors;
    }
}
export default function GardenData(): Array<Garden> {
    return ([
        {
            name: 'LowRider',
            grid: [1,3],
            buy: {
                name: 'LowRider Self-Watering Planter',
                price: 339.00,
                rating: 4.8,
                reviews: 24,
                description: "The LowRider is the foundational garden in our self-watering 'Patio and Balcony' series of...",
                desc: "planters. Featuring our patented GardenWell self-watering system, the LowRider frees you from daily maintenance, and grows for success! With optional wheels and a tight footprint that can fit on any balcony or patio, it’s the perfect garden for space-conscious urban dwellers that want a taste of their own food, and a bit of West Coast style.",
            },
            image: require('@/assets/models/low_rider/low-rider.png'),
            colors: [
                {
                    name: 'Raw Cedar',
                    image: require('@/assets/images/RAW_CEDAR.png'),
                    checkout: 'https://lifespace-projects.myshopify.com/cart/31911805157430:1',
                    dae: require('@/assets/models/low_rider/low_rider_raw_1_/low_rider_raw_1_.dae'),
                    daeImages: {
                        "BIRD_LOGO.006.jpg": require('@/assets/models/low_rider/low_rider_raw_1_/BIRD_LOGO.006.jpg'),
                        "Cedar_side.003.jpg": require('@/assets/models/low_rider/low_rider_raw_1_/Cedar_side.003.jpg'),
                        "METAL.006.jpg": require('@/assets/models/low_rider/low_rider_raw_1_/METAL.006.jpg'),
                        "OFF_WHITE.006.jpg": require('@/assets/models/low_rider/low_rider_raw_1_/OFF_WHITE.006.jpg'),
                        "RAW_CEDAR_GRAIN.003.jpg": require('@/assets/models/low_rider/low_rider_raw_1_/RAW_CEDAR_GRAIN.003.jpg'),
                        "RAW_CEDAR_LONG.003.jpg": require('@/assets/models/low_rider/low_rider_raw_1_/RAW_CEDAR_LONG.003.jpg'),
                        "SUB_SYSTEM.006.jpg": require('@/assets/models/low_rider/low_rider_raw_1_/SUB_SYSTEM.006.jpg'),
                    }
                },
                {
                    name: 'Silver Patina',
                    image: require('@/assets/images/SILVER_PATINA.png'),
                    checkout: 'https://lifespace-projects.myshopify.com/cart/31911805157430:1',
                    dae: require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/low_rider_silver_patina_rough_2_.dae'),
                    daeImages: {
                        "BIRD_LOGO.005.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/BIRD_LOGO.005.jpg'),
                        "CEDAR_RAW_LOW.002.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/CEDAR_RAW_LOW.002.jpg'),
                        "METAL.005.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/METAL.005.jpg'),
                        "OFF_WHITE.005.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/OFF_WHITE.005.jpg'),
                        "PATINA_ROUGH_END.002.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/PATINA_ROUGH_END.002.jpg'),
                        "SUB_SYSTEM.005.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/SUB_SYSTEM.005.jpg'),
                        "URBAN_PATINA_RAW_FINAL.002.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/URBAN_PATINA_RAW_FINAL.002.jpg')
                    }
                },
                {
                    name: 'Raven',
                    image: require('@/assets/images/RAVEN_FINISH.png'),
                    checkout: 'https://lifespace-projects.myshopify.com/cart/31911805157430:1',
                    dae: require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/low_rider_silver_patina_rough_2_.dae'),
                    daeImages: {
                        "BIRD_LOGO.005.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/BIRD_LOGO.005.jpg'),
                        "CEDAR_RAW_LOW.002.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/CEDAR_RAW_LOW.002.jpg'),
                        "METAL.005.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/METAL.005.jpg'),
                        "OFF_WHITE.005.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/OFF_WHITE.005.jpg'),
                        "PATINA_ROUGH_END.002.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/PATINA_ROUGH_END.002.jpg'),
                        "SUB_SYSTEM.005.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/SUB_SYSTEM.005.jpg'),
                        "URBAN_PATINA_RAW_FINAL.002.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/URBAN_PATINA_RAW_FINAL.002.jpg')
                    }
                },
                {
                    name: 'Coastal',
                    image: require('@/assets/images/COASTAL_FINISH.png'),
                    checkout: 'https://lifespace-projects.myshopify.com/cart/31911805157430:1',
                    dae: require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/low_rider_silver_patina_rough_2_.dae'),
                    daeImages: {
                        "BIRD_LOGO.005.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/BIRD_LOGO.005.jpg'),
                        "CEDAR_RAW_LOW.002.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/CEDAR_RAW_LOW.002.jpg'),
                        "METAL.005.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/METAL.005.jpg'),
                        "OFF_WHITE.005.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/OFF_WHITE.005.jpg'),
                        "PATINA_ROUGH_END.002.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/PATINA_ROUGH_END.002.jpg'),
                        "SUB_SYSTEM.005.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/SUB_SYSTEM.005.jpg'),
                        "URBAN_PATINA_RAW_FINAL.002.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/URBAN_PATINA_RAW_FINAL.002.jpg')
                    }
                },
                {
                    name: 'Modern Patina',
                    image: require('@/assets/images/MODERN_PATINA.png'),
                    checkout: 'https://lifespace-projects.myshopify.com/cart/31911805157430:1',
                    dae: require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/low_rider_silver_patina_rough_2_.dae'),
                    daeImages: {
                        "BIRD_LOGO.005.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/BIRD_LOGO.005.jpg'),
                        "CEDAR_RAW_LOW.002.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/CEDAR_RAW_LOW.002.jpg'),
                        "METAL.005.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/METAL.005.jpg'),
                        "OFF_WHITE.005.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/OFF_WHITE.005.jpg'),
                        "PATINA_ROUGH_END.002.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/PATINA_ROUGH_END.002.jpg'),
                        "SUB_SYSTEM.005.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/SUB_SYSTEM.005.jpg'),
                        "URBAN_PATINA_RAW_FINAL.002.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/URBAN_PATINA_RAW_FINAL.002.jpg')
                    }
                },
                {
                    name: 'Modern Clear',
                    image: require('@/assets/images/MODERN_CLEAR.png'),
                    checkout: 'https://lifespace-projects.myshopify.com/cart/31911805157430:1',
                    dae: require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/low_rider_silver_patina_rough_2_.dae'),
                    daeImages: {
                        "BIRD_LOGO.005.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/BIRD_LOGO.005.jpg'),
                        "CEDAR_RAW_LOW.002.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/CEDAR_RAW_LOW.002.jpg'),
                        "METAL.005.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/METAL.005.jpg'),
                        "OFF_WHITE.005.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/OFF_WHITE.005.jpg'),
                        "PATINA_ROUGH_END.002.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/PATINA_ROUGH_END.002.jpg'),
                        "SUB_SYSTEM.005.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/SUB_SYSTEM.005.jpg'),
                        "URBAN_PATINA_RAW_FINAL.002.jpg": require('@/assets/models/low_rider/low_rider_silver_patina_rough_2_/URBAN_PATINA_RAW_FINAL.002.jpg')
                    }
                }
            ]
        }
    ]);
}
//         ,
//         {
//             name: 'HighRise',
//             grid: [1,3],
//             buy: {
//                 name: 'HighRise Self-Watering Planter',
//                 price: 439.00,
//                 rating: 4.9,
//                 reviews: 25,
//                 description: 'The HighRise is a self-watering planter that is perfect for small spaces. It features a sleek design and is made from high-quality materials.',
//                 desc: ''
//             },
//             image: require('@/assets/images/highrise.png'),
//             colors: [
//                 {
//                     name: 'Raw Cedar',
//                     checkout: 'https://lifespace-projects.myshopify.com/cart/31911805157430:1',
//                     image: require('@/assets/images/RAW_CEDAR.png'),
//                     dae: require('@/assets/models/high_rise/high_rise_raw_cedar_1_/high_rise_raw_cedar_1_.dae'),
//                     daeImages: {
//                         "BIRD_LOGO.007.jpg": require('@/assets/models/high_rise/high_rise_raw_cedar_1_/BIRD_LOGO.007.jpg'),
//                         "Cedar_side.004.jpg": require('@/assets/models/high_rise/high_rise_raw_cedar_1_/Cedar_side.004.jpg'),
//                         "METAL.007.jpg": require('@/assets/models/high_rise/high_rise_raw_cedar_1_/METAL.007.jpg'),
//                         "OFF_WHITE.007.jpg": require('@/assets/models/high_rise/high_rise_raw_cedar_1_/OFF_WHITE.007.jpg'),
//                         "RAW_CEDAR_GRAIN.004.jpg": require('@/assets/models/high_rise/high_rise_raw_cedar_1_/RAW_CEDAR_GRAIN.004.jpg'),
//                         "RAW_CEDAR_LONG.004.jpg": require('@/assets/models/high_rise/high_rise_raw_cedar_1_/RAW_CEDAR_LONG.004.jpg'),
//                         "SUB_SYSTEM.007.jpg": require('@/assets/models/high_rise/high_rise_raw_cedar_1_/SUB_SYSTEM.007.jpg'),
//                         "HIGH_RISE_LEG_TILED.jpg": require('@/assets/models/high_rise/high_rise_raw_cedar_1_/HIGH_RISE_LEG_TILED.jpg')
//                     }
//                 },
//                 {
//                     name: 'Silver Patina',
//                     image: require('@/assets/images/SILVER_PATINA.png'),
//                     checkout: 'https://lifespace-projects.myshopify.com/cart/31911805157430:1',
//                     dae: require('@/assets/models/high_rise/high_rise_silver_patina_1_/high_rise_silver_patina_1_.dae'),
//                     daeImages: {
//                         "BIRD_LOGO.008.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/BIRD_LOGO.008.jpg'),
//                         "CEDAR_RAW_LOW1.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/CEDAR_RAW_LOW1.jpg'),
//                         "METAL.008.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/METAL.008.jpg'),
//                         "OFF_WHITE.008.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/OFF_WHITE.008.jpg'),
//                         "PATINA_ROUGH_END.003.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/PATINA_ROUGH_END.003.jpg'),
//                         "URBAN_PATINA_RAW_FINAL.003.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/URBAN_PATINA_RAW_FINAL.003.jpg'),
//                         "SUB_SYSTEM.008.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/SUB_SYSTEM.008.jpg'),
//                         "HIGH_RISE_LEG_TILED.001.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/HIGH_RISE_LEG_TILED.001.jpg')
//                     }
//                 },
//                 {
//                     name: 'Raven',
//                     image: require('@/assets/images/RAVEN_FINISH.png'),
//                     checkout: 'https://lifespace-projects.myshopify.com/cart/31911805157430:1',
//                     dae: require('@/assets/models/high_rise/high_rise_silver_patina_1_/high_rise_silver_patina_1_.dae'),
//                     daeImages: {
//                         "BIRD_LOGO.008.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/BIRD_LOGO.008.jpg'),
//                         "CEDAR_RAW_LOW1.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/CEDAR_RAW_LOW1.jpg'),
//                         "METAL.008.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/METAL.008.jpg'),
//                         "OFF_WHITE.008.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/OFF_WHITE.008.jpg'),
//                         "PATINA_ROUGH_END.003.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/PATINA_ROUGH_END.003.jpg'),
//                         "URBAN_PATINA_RAW_FINAL.003.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/URBAN_PATINA_RAW_FINAL.003.jpg'),
//                         "SUB_SYSTEM.008.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/SUB_SYSTEM.008.jpg'),
//                         "HIGH_RISE_LEG_TILED.001.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/HIGH_RISE_LEG_TILED.001.jpg')
//                     }
//                 },
//                 {
//                     name: 'Coastal',
//                     image: require('@/assets/images/COASTAL_FINISH.png'),
//                     checkout: 'https://lifespace-projects.myshopify.com/cart/31911805157430:1',
//                     dae: require('@/assets/models/high_rise/high_rise_silver_patina_1_/high_rise_silver_patina_1_.dae'),
//                     daeImages: {
//                         "BIRD_LOGO.008.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/BIRD_LOGO.008.jpg'),
//                         "CEDAR_RAW_LOW1.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/CEDAR_RAW_LOW1.jpg'),
//                         "METAL.008.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/METAL.008.jpg'),
//                         "OFF_WHITE.008.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/OFF_WHITE.008.jpg'),
//                         "PATINA_ROUGH_END.003.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/PATINA_ROUGH_END.003.jpg'),
//                         "URBAN_PATINA_RAW_FINAL.003.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/URBAN_PATINA_RAW_FINAL.003.jpg'),
//                         "SUB_SYSTEM.008.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/SUB_SYSTEM.008.jpg'),
//                         "HIGH_RISE_LEG_TILED.001.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/HIGH_RISE_LEG_TILED.001.jpg')
//                     }
//                 },
//                 {
//                     name: 'Modern Patina',
//                     image: require('@/assets/images/MODERN_PATINA.png'),
//                     checkout: 'https://lifespace-projects.myshopify.com/cart/31911805157430:1',
//                     dae: require('@/assets/models/high_rise/high_rise_silver_patina_1_/high_rise_silver_patina_1_.dae'),
//                     daeImages: {
//                         "BIRD_LOGO.008.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/BIRD_LOGO.008.jpg'),
//                         "CEDAR_RAW_LOW1.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/CEDAR_RAW_LOW1.jpg'),
//                         "METAL.008.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/METAL.008.jpg'),
//                         "OFF_WHITE.008.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/OFF_WHITE.008.jpg'),
//                         "PATINA_ROUGH_END.003.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/PATINA_ROUGH_END.003.jpg'),
//                         "URBAN_PATINA_RAW_FINAL.003.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/URBAN_PATINA_RAW_FINAL.003.jpg'),
//                         "SUB_SYSTEM.008.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/SUB_SYSTEM.008.jpg'),
//                         "HIGH_RISE_LEG_TILED.001.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/HIGH_RISE_LEG_TILED.001.jpg')
//                     }
//                 },
//                 {
//                     name: 'Modern Clear',
//                     image: require('@/assets/images/MODERN_CLEAR.png'),
//                     checkout: 'https://lifespace-projects.myshopify.com/cart/31911805157430:1',
//                     dae: require('@/assets/models/high_rise/high_rise_silver_patina_1_/high_rise_silver_patina_1_.dae'),
//                     daeImages: {
//                         "BIRD_LOGO.008.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/BIRD_LOGO.008.jpg'),
//                         "CEDAR_RAW_LOW1.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/CEDAR_RAW_LOW1.jpg'),
//                         "METAL.008.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/METAL.008.jpg'),
//                         "OFF_WHITE.008.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/OFF_WHITE.008.jpg'),
//                         "PATINA_ROUGH_END.003.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/PATINA_ROUGH_END.003.jpg'),
//                         "URBAN_PATINA_RAW_FINAL.003.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/URBAN_PATINA_RAW_FINAL.003.jpg'),
//                         "SUB_SYSTEM.008.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/SUB_SYSTEM.008.jpg'),
//                         "HIGH_RISE_LEG_TILED.001.jpg": require('@/assets/models/high_rise/high_rise_silver_patina_1_/HIGH_RISE_LEG_TILED.001.jpg')
//                     }
//                 }
//             ]
//         }
//     ]);

//     /*
    

//     ,
//         {
//             name: 'Canopy',
//             dae: require('@/assets/models/high_rise/high_rise_silver_patina_1_/high_rise_silver_patina_1_.dae'),
//             image: require('@/assets/images/canopy.png')
//         },
//         {
//             name: 'Artifex',
//             dae: require('@/assets/models/high_rise/high_rise_silver_patina_1_/high_rise_silver_patina_1_.dae'),
//             image: require('@/assets/images/Artifex.png')
//         },
//         {
//             name: 'Garden Box',
//             dae: require('@/assets/models/high_rise/high_rise_silver_patina_1_/high_rise_silver_patina_1_.dae'),
//             image: require('@/assets/images/garden_box.png')
//         },
//         {
//             name: 'Elevated Artifex',
//             dae: require('@/assets/models/high_rise/high_rise_silver_patina_1_/high_rise_silver_patina_1_.dae'),
//             image: require('@/assets/images/elevated-artifex.png')
//         }
    
    
    
    
//     */








// }
// {
    //   'name': 'LowRider',
    //   obj: require('@/assets/models/low_rider_raw_1_.obj'),
    //   mtl: require('@/assets/models/low_rider_raw_1_.mtl'),
    //   image: require('@/assets/images/low-rider.png')



//       {
//       name: 'Raw Cedar',
//       file: 'low_rider_raw_1_',
//       image: require('@/assets/images/RAW_CEDAR.png')
//     },
//     {
//       name: 'Silver Patina',
//       file: 'low_rider_raw_1_',
//       image: require('@/assets/images/SILVER_PATINA.png')
//     },
//     {
//       name: 'Raven',
//       file: 'low_rider_raw_1_',
//       image: require('@/assets/images/RAVEN_FINISH.png')
//     },
//     {
//       name: 'Coastal',
//       file: 'low_rider_raw_1_',
//       image: require('@/assets/images/COASTAL_FINISH.png')
//     },
//     {
//       name: 'Modern Patina',
//       file: 'low_rider_raw_1_',
//       image: require('@/assets/images/MODERN_PATINA.png')
//     },
//     {
//       name: 'Modern Clear',
//       file: 'low_rider_raw_1_',
//       image: require('@/assets/images/MODERN_CLEAR.png')
//     }
//     },
//     {
//       name: 'LowRider Raven',
//       obj: require('@/assets/models/low_rider_raven_finish.obj'),
//       mtl: require('@/assets/models/low_rider_raven_finish.mtl'),
//       image: require('@/assets/images/low-rider.png')
//     },
//     {
//       name: 'HighRise',
//       obj: require('@/assets/models/high_rise_raw_cedar_1_.obj'),
//       mtl: require('@/assets/models/high_rise_raw_cedar_1_.mtl'),
//       image: require('@/assets/images/highrise.png')
//     },
//     {
//       name: 'Canopy',
//       obj: require('@/assets/models/low_rider_raw_1_.obj'),
//       mtl: require('@/assets/models/low_rider_raw_1_.mtl'),
//       image: require('@/assets/images/canopy.png')
//     },
//     {
//       name: 'Artifex',
//       obj: require('@/assets/models/low_rider_raw_1_.obj'),
//       mtl: require('@/assets/models/low_rider_raw_1_.mtl'),
//       image: require('@/assets/images/Artifex.png')
//     },
//     {
//       name: 'Garden Box',
//       obj: require('@/assets/models/low_rider_raw_1_.obj'),
//       mtl: require('@/assets/models/low_rider_raw_1_.mtl'),
//       image: require('@/assets/images/garden_box.png')
//     },
//     {
//       name: 'Elevated Artifex',
//       obj: require('@/assets/models/low_rider_raw_1_.obj'),
//       mtl: require('@/assets/models/low_rider_raw_1_.mtl'),
//       image: require('@/assets/images/elevated-artifex.png')
//     }