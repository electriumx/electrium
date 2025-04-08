
import { Product } from './productData';

// Helper function to create empty reviews array
const createEmptyReviews = () => {
  return [];
};

// Fix accessory format by ensuring 'selected' property exists
const fixAccessoryFormat = (accessory: any): any => {
  return {
    ...accessory,
    selected: accessory.selected === undefined ? false : accessory.selected
  };
};

// Generate a random price between min and max
const randomPrice = (min: number, max: number): number => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};

// Generate a random rating between 3.5 and 5.0
const randomRating = (): number => {
  return parseFloat((Math.random() * 1.5 + 3.5).toFixed(1));
};

// SPEAKERS
export const speakerProducts: Product[] = [
  {
    id: 30001,
    name: "Bose SoundLink Revolve+",
    price: 299.99,
    category: "Speakers",
    brand: "Bose",
    description: "Premium 360° portable Bluetooth speaker with built-in microphone and up to 16 hours of battery life.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.8,
    reviews: createEmptyReviews()
  },
  {
    id: 30002,
    name: "Sonos One (Gen 2)",
    price: 219.99,
    category: "Speakers",
    brand: "Sonos",
    description: "Voice-controlled smart speaker with Amazon Alexa and Google Assistant built-in.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.7,
    reviews: createEmptyReviews()
  },
  {
    id: 30003,
    name: "JBL Charge 5",
    price: 179.99,
    category: "Speakers",
    brand: "JBL",
    description: "Waterproof portable Bluetooth speaker with 20 hours of playtime and built-in powerbank.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.6,
    reviews: createEmptyReviews()
  },
  {
    id: 30004,
    name: "Marshall Stanmore II",
    price: 349.99,
    category: "Speakers",
    brand: "Marshall",
    description: "Classic designed Bluetooth speaker with iconic Marshall details and powerful sound.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.7,
    reviews: createEmptyReviews()
  },
  {
    id: 30005,
    name: "Ultimate Ears MEGABOOM 3",
    price: 199.99,
    category: "Speakers",
    brand: "Ultimate Ears",
    description: "Portable waterproof Bluetooth speaker with 360° sound and 20 hours of battery life.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.5,
    reviews: createEmptyReviews()
  },
  {
    id: 30006,
    name: "Sony SRS-XB43",
    price: 169.99,
    category: "Speakers",
    brand: "Sony",
    description: "Powerful extra bass Bluetooth speaker with built-in lights and waterproof design.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.4,
    reviews: createEmptyReviews()
  },
  {
    id: 30007,
    name: "Harman Kardon Aura Studio 3",
    price: 299.99,
    category: "Speakers",
    brand: "Harman Kardon",
    description: "Elegant 360° ambient lighting Bluetooth speaker with stunning design and rich sound.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.6,
    reviews: createEmptyReviews()
  },
  {
    id: 30008,
    name: "Anker Soundcore Motion+",
    price: 99.99,
    category: "Speakers",
    brand: "Anker",
    description: "Hi-Res Audio Bluetooth speaker with BassUp technology and waterproof design.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.5,
    reviews: createEmptyReviews()
  },
  {
    id: 30009,
    name: "Bang & Olufsen Beosound A1 (2nd Gen)",
    price: 279.99,
    category: "Speakers",
    brand: "Bang & Olufsen",
    description: "Premium portable Bluetooth speaker with Alexa built-in and up to 18 hours of playtime.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.8,
    reviews: createEmptyReviews()
  },
  {
    id: 30010,
    name: "Bose Home Speaker 500",
    price: 349.99,
    category: "Speakers",
    brand: "Bose",
    description: "Smart speaker with voice control and wall-to-wall stereo sound.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.7,
    reviews: createEmptyReviews()
  },
  {
    id: 30011,
    name: "Yamaha MusicCast 20",
    price: 199.99,
    category: "Speakers",
    brand: "Yamaha",
    description: "Wireless speaker with multi-room audio capabilities and voice control support.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.3,
    reviews: createEmptyReviews()
  },
  {
    id: 30012,
    name: "Denon Home 150",
    price: 249.99,
    category: "Speakers",
    brand: "Denon",
    description: "Compact wireless speaker with HEOS Built-in for multi-room audio.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.4,
    reviews: createEmptyReviews()
  },
  {
    id: 30013,
    name: "Klipsch The One II",
    price: 289.99,
    category: "Speakers",
    brand: "Klipsch",
    description: "Mid-century modern design Bluetooth speaker with premium materials and sound.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.6,
    reviews: createEmptyReviews()
  },
  {
    id: 30014,
    name: "Audioengine A2+",
    price: 269.99,
    category: "Speakers",
    brand: "Audioengine",
    description: "Premium powered desktop speakers with built-in DAC and multiple inputs.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.7,
    reviews: createEmptyReviews()
  },
  {
    id: 30015,
    name: "Creative Pebble V3",
    price: 39.99,
    category: "Speakers",
    brand: "Creative",
    description: "Minimalist 2.0 desktop speakers with Bluetooth and USB-C connectivity.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.2,
    reviews: createEmptyReviews()
  }
];

// MONITORS
export const monitorProducts: Product[] = [
  {
    id: 31001,
    name: "Samsung Odyssey G7",
    price: 699.99,
    category: "Monitors",
    brand: "Samsung",
    description: "32-inch WQHD 1000R curved gaming monitor with 240Hz refresh rate and 1ms response time.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.7,
    reviews: createEmptyReviews()
  },
  {
    id: 31002,
    name: "LG UltraGear 27GN950-B",
    price: 799.99,
    category: "Monitors",
    brand: "LG",
    description: "27-inch 4K UHD Nano IPS gaming monitor with 144Hz refresh rate and 1ms response time.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.8,
    reviews: createEmptyReviews()
  },
  {
    id: 31003,
    name: "ASUS ProArt PA32UCX",
    price: 2999.99,
    category: "Monitors",
    brand: "ASUS",
    description: "32-inch 4K HDR professional monitor with mini-LED backlight and Thunderbolt 3.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.9,
    reviews: createEmptyReviews()
  },
  {
    id: 31004,
    name: "Dell UltraSharp U2720Q",
    price: 579.99,
    category: "Monitors",
    brand: "Dell",
    description: "27-inch 4K UHD monitor with USB-C connectivity and InfinityEdge design.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.6,
    reviews: createEmptyReviews()
  },
  {
    id: 31005,
    name: "BenQ PD3200U",
    price: 699.99,
    category: "Monitors",
    brand: "BenQ",
    description: "32-inch 4K UHD designer monitor with CAD/CAM mode and KVM switch.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.5,
    reviews: createEmptyReviews()
  },
  {
    id: 31006,
    name: "Acer Predator X38",
    price: 1699.99,
    category: "Monitors",
    brand: "Acer",
    description: "38-inch UWQHD+ curved gaming monitor with 175Hz refresh rate and NVIDIA G-SYNC.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.7,
    reviews: createEmptyReviews()
  },
  {
    id: 31007,
    name: "ViewSonic VP3268-4K",
    price: 899.99,
    category: "Monitors",
    brand: "ViewSonic",
    description: "32-inch 4K UHD professional monitor with hardware calibration and USB-C.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.4,
    reviews: createEmptyReviews()
  },
  {
    id: 31008,
    name: "MSI Optix MAG342CQR",
    price: 499.99,
    category: "Monitors",
    brand: "MSI",
    description: "34-inch UWQHD curved gaming monitor with 144Hz refresh rate and 1ms response time.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.5,
    reviews: createEmptyReviews()
  },
  {
    id: 31009,
    name: "Gigabyte M32U",
    price: 799.99,
    category: "Monitors",
    brand: "Gigabyte",
    description: "32-inch 4K UHD gaming monitor with 144Hz refresh rate and KVM functionality.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.6,
    reviews: createEmptyReviews()
  },
  {
    id: 31010,
    name: "Philips 329P1H",
    price: 649.99,
    category: "Monitors",
    brand: "Philips",
    description: "32-inch 4K UHD monitor with webcam, USB-C docking, and Windows Hello support.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.3,
    reviews: createEmptyReviews()
  },
  {
    id: 31011,
    name: "HP Z27k G3",
    price: 729.99,
    category: "Monitors",
    brand: "HP",
    description: "27-inch 4K UHD professional monitor with USB-C and color calibration.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.4,
    reviews: createEmptyReviews()
  },
  {
    id: 31012,
    name: "AOC CU34G2X",
    price: 449.99,
    category: "Monitors",
    brand: "AOC",
    description: "34-inch UWQHD curved gaming monitor with 144Hz refresh rate and 1ms response time.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.3,
    reviews: createEmptyReviews()
  },
  {
    id: 31013,
    name: "Lenovo ThinkVision P27h-20",
    price: 549.99,
    category: "Monitors",
    brand: "Lenovo",
    description: "27-inch QHD professional monitor with USB-C docking and factory calibration.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.4,
    reviews: createEmptyReviews()
  },
  {
    id: 31014,
    name: "EIZO ColorEdge CG279X",
    price: 2399.99,
    category: "Monitors",
    brand: "EIZO",
    description: "27-inch WQHD professional monitor with built-in calibration sensor and HDR.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.9,
    reviews: createEmptyReviews()
  },
  {
    id: 31015,
    name: "Samsung Smart Monitor M7",
    price: 399.99,
    category: "Monitors",
    brand: "Samsung",
    description: "32-inch 4K UHD smart monitor with built-in streaming apps and remote work features.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.5,
    reviews: createEmptyReviews()
  }
];

// KEYBOARDS
export const keyboardProducts: Product[] = [
  {
    id: 32001,
    name: "Logitech G915 TKL",
    price: 229.99,
    category: "Keyboards",
    brand: "Logitech",
    description: "Low-profile tenkeyless wireless mechanical gaming keyboard with LIGHTSPEED technology.",
    imageUrl: "/lovable-uploads/3f391803-44c1-4437-a246-5070b31d60a5.png",
    quantity: 0,
    rating: 4.8,
    reviews: createEmptyReviews()
  },
  {
    id: 32002,
    name: "Keychron K2 V2",
    price: 89.99,
    category: "Keyboards",
    brand: "Keychron",
    description: "75% layout hot-swappable mechanical keyboard with Bluetooth and RGB backlighting.",
    imageUrl: "/lovable-uploads/3f391803-44c1-4437-a246-5070b31d60a5.png",
    quantity: 0,
    rating: 4.7,
    reviews: createEmptyReviews()
  },
  {
    id: 32003,
    name: "Ducky One 3",
    price: 119.99,
    category: "Keyboards",
    brand: "Ducky",
    description: "Full-size hot-swappable mechanical keyboard with PBT double-shot keycaps.",
    imageUrl: "/lovable-uploads/3f391803-44c1-4437-a246-5070b31d60a5.png",
    quantity: 0,
    rating: 4.8,
    reviews: createEmptyReviews()
  },
  {
    id: 32004,
    name: "Razer Huntsman V2",
    price: 189.99,
    category: "Keyboards",
    brand: "Razer",
    description: "Optical gaming keyboard with analog optical switches and doubleshot PBT keycaps.",
    imageUrl: "/lovable-uploads/3f391803-44c1-4437-a246-5070b31d60a5.png",
    quantity: 0,
    rating: 4.7,
    reviews: createEmptyReviews()
  },
  {
    id: 32005,
    name: "SteelSeries Apex Pro",
    price: 199.99,
    category: "Keyboards",
    brand: "SteelSeries",
    description: "Mechanical gaming keyboard with adjustable actuation and OLED smart display.",
    imageUrl: "/lovable-uploads/3f391803-44c1-4437-a246-5070b31d60a5.png",
    quantity: 0,
    rating: 4.8,
    reviews: createEmptyReviews()
  },
  {
    id: 32006,
    name: "Corsair K100 RGB",
    price: 229.99,
    category: "Keyboards",
    brand: "Corsair",
    description: "Optical-mechanical gaming keyboard with iCUE control wheel and per-key RGB lighting.",
    imageUrl: "/lovable-uploads/3f391803-44c1-4437-a246-5070b31d60a5.png",
    quantity: 0,
    rating: 4.7,
    reviews: createEmptyReviews()
  },
  {
    id: 32007,
    name: "GMMK Pro",
    price: 169.99,
    category: "Keyboards",
    brand: "Glorious",
    description: "75% layout gasket-mounted hot-swappable mechanical keyboard with rotary encoder.",
    imageUrl: "/lovable-uploads/3f391803-44c1-4437-a246-5070b31d60a5.png",
    quantity: 0,
    rating: 4.8,
    reviews: createEmptyReviews()
  },
  {
    id: 32008,
    name: "Drop CTRL",
    price: 249.99,
    category: "Keyboards",
    brand: "Drop",
    description: "TKL hot-swappable mechanical keyboard with aluminum frame and RGB lighting.",
    imageUrl: "/lovable-uploads/3f391803-44c1-4437-a246-5070b31d60a5.png",
    quantity: 0,
    rating: 4.6,
    reviews: createEmptyReviews()
  },
  {
    id: 32009,
    name: "Leopold FC900R PD",
    price: 124.99,
    category: "Keyboards",
    brand: "Leopold",
    description: "Full-size mechanical keyboard with PBT double-shot keycaps and sound-dampening mat.",
    imageUrl: "/lovable-uploads/3f391803-44c1-4437-a246-5070b31d60a5.png",
    quantity: 0,
    rating: 4.7,
    reviews: createEmptyReviews()
  },
  {
    id: 32010,
    name: "Varmilo VA87M",
    price: 129.99,
    category: "Keyboards",
    brand: "Varmilo",
    description: "TKL mechanical keyboard with dye-sublimated PBT keycaps and custom themes.",
    imageUrl: "/lovable-uploads/3f391803-44c1-4437-a246-5070b31d60a5.png",
    quantity: 0,
    rating: 4.6,
    reviews: createEmptyReviews()
  },
  {
    id: 32011,
    name: "NuPhy Air75",
    price: 129.99,
    category: "Keyboards",
    brand: "NuPhy",
    description: "Ultra-slim 75% wireless mechanical keyboard with RGB backlighting.",
    imageUrl: "/lovable-uploads/3f391803-44c1-4437-a246-5070b31d60a5.png",
    quantity: 0,
    rating: 4.5,
    reviews: createEmptyReviews()
  },
  {
    id: 32012,
    name: "Microsoft Surface Keyboard",
    price: 99.99,
    category: "Keyboards",
    brand: "Microsoft",
    description: "Slim, wireless keyboard with premium typing experience and aluminum top case.",
    imageUrl: "/lovable-uploads/3f391803-44c1-4437-a246-5070b31d60a5.png",
    quantity: 0,
    rating: 4.4,
    reviews: createEmptyReviews()
  },
  {
    id: 32013,
    name: "Apple Magic Keyboard",
    price: 99.99,
    category: "Keyboards",
    brand: "Apple",
    description: "Slim wireless keyboard with scissor mechanism and rechargeable battery.",
    imageUrl: "/lovable-uploads/3f391803-44c1-4437-a246-5070b31d60a5.png",
    quantity: 0,
    rating: 4.5,
    reviews: createEmptyReviews()
  },
  {
    id: 32014,
    name: "Anne Pro 2",
    price: 89.99,
    category: "Keyboards",
    brand: "Obinslab",
    description: "60% layout wireless mechanical keyboard with RGB backlighting and programmable layers.",
    imageUrl: "/lovable-uploads/3f391803-44c1-4437-a246-5070b31d60a5.png",
    quantity: 0,
    rating: 4.6,
    reviews: createEmptyReviews()
  },
  {
    id: 32015,
    name: "Logitech MX Keys Mini",
    price: 99.99,
    category: "Keyboards",
    brand: "Logitech",
    description: "Compact wireless keyboard with perfect stroke keys and smart illumination.",
    imageUrl: "/lovable-uploads/3f391803-44c1-4437-a246-5070b31d60a5.png",
    quantity: 0,
    rating: 4.7,
    reviews: createEmptyReviews()
  }
];

// SMART HOME
export const smartHomeProducts: Product[] = [
  {
    id: 33001,
    name: "Google Nest Hub (2nd Gen)",
    price: 99.99,
    category: "Smart Home",
    brand: "Google",
    description: "Smart display with Google Assistant, sleep sensing technology and entertainment hub.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.6,
    reviews: createEmptyReviews()
  },
  {
    id: 33002,
    name: "Amazon Echo Show 10",
    price: 249.99,
    category: "Smart Home",
    brand: "Amazon",
    description: "Smart display with motion, premium sound, and built-in Zigbee hub.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.5,
    reviews: createEmptyReviews()
  },
  {
    id: 33003,
    name: "Philips Hue Starter Kit",
    price: 199.99,
    category: "Smart Home",
    brand: "Philips",
    description: "Smart lighting system with bridge and color ambiance bulbs.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.8,
    reviews: createEmptyReviews()
  },
  {
    id: 33004,
    name: "Ecobee SmartThermostat",
    price: 249.99,
    category: "Smart Home",
    brand: "Ecobee",
    description: "Smart thermostat with voice control, SmartSensor, and built-in Alexa.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.7,
    reviews: createEmptyReviews()
  },
  {
    id: 33005,
    name: "Nest Learning Thermostat",
    price: 249.99,
    category: "Smart Home",
    brand: "Google",
    description: "Smart thermostat that learns your schedule and programs itself.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.7,
    reviews: createEmptyReviews()
  },
  {
    id: 33006,
    name: "Ring Video Doorbell Pro 2",
    price: 249.99,
    category: "Smart Home",
    brand: "Ring",
    description: "Advanced video doorbell with 3D motion detection and head-to-toe video.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.5,
    reviews: createEmptyReviews()
  },
  {
    id: 33007,
    name: "Arlo Pro 4 Spotlight Camera",
    price: 199.99,
    category: "Smart Home",
    brand: "Arlo",
    description: "Wire-free 2K HDR security camera with color night vision and built-in spotlight.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.6,
    reviews: createEmptyReviews()
  },
  {
    id: 33008,
    name: "August Wi-Fi Smart Lock",
    price: 229.99,
    category: "Smart Home",
    brand: "August",
    description: "Retrofit smart lock with built-in Wi-Fi and auto-unlock features.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.4,
    reviews: createEmptyReviews()
  },
  {
    id: 33009,
    name: "Eufy RoboVac X8",
    price: 499.99,
    category: "Smart Home",
    brand: "Eufy",
    description: "Robot vacuum with twin-turbine technology, iPath laser navigation, and app control.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.5,
    reviews: createEmptyReviews()
  },
  {
    id: 33010,
    name: "Sonos Beam (Gen 2)",
    price: 449.99,
    category: "Smart Home",
    brand: "Sonos",
    description: "Smart soundbar with Dolby Atmos, voice assistant support, and room-filling sound.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.7,
    reviews: createEmptyReviews()
  },
  {
    id: 33011,
    name: "Lutron Caséta Smart Lighting Starter Kit",
    price: 99.99,
    category: "Smart Home",
    brand: "Lutron",
    description: "Smart lighting control system with bridge, dimmer switches, and remote.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.6,
    reviews: createEmptyReviews()
  },
  {
    id: 33012,
    name: "TP-Link Kasa Smart Plug Mini",
    price: 29.99,
    category: "Smart Home",
    brand: "TP-Link",
    description: "Compact smart plug that works with voice assistants and doesn't block other outlets.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.5,
    reviews: createEmptyReviews()
  },
  {
    id: 33013,
    name: "Chamberlain myQ Smart Garage Control",
    price: 29.99,
    category: "Smart Home",
    brand: "Chamberlain",
    description: "Smart garage door opener that allows remote access and monitoring.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.3,
    reviews: createEmptyReviews()
  },
  {
    id: 33014,
    name: "Eve Energy Smart Plug",
    price: 39.99,
    category: "Smart Home",
    brand: "Eve",
    description: "Thread-enabled smart plug with energy monitoring and HomeKit compatibility.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.4,
    reviews: createEmptyReviews()
  },
  {
    id: 33015,
    name: "Samsung SmartThings Hub",
    price: 129.99,
    category: "Smart Home",
    brand: "Samsung",
    description: "Smart home hub that connects and controls your compatible devices.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.2,
    reviews: createEmptyReviews()
  }
];

// SMARTWATCHES
export const smartwatchProducts: Product[] = [
  {
    id: 34001,
    name: "Apple Watch Series 7",
    price: 399.99,
    category: "Smartwatches",
    brand: "Apple",
    description: "Advanced smartwatch with always-on Retina display, ECG, and blood oxygen sensor.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.8,
    reviews: createEmptyReviews()
  },
  {
    id: 34002,
    name: "Samsung Galaxy Watch 4",
    price: 249.99,
    category: "Smartwatches",
    brand: "Samsung",
    description: "Wear OS powered smartwatch with body composition analysis and advanced health monitoring.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.6,
    reviews: createEmptyReviews()
  },
  {
    id: 34003,
    name: "Garmin Fenix 7",
    price: 699.99,
    category: "Smartwatches",
    brand: "Garmin",
    description: "Premium multisport GPS watch with advanced training features and touchscreen.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.7,
    reviews: createEmptyReviews()
  },
  {
    id: 34004,
    name: "Fitbit Sense",
    price: 299.99,
    category: "Smartwatches",
    brand: "Fitbit",
    description: "Advanced health smartwatch with EDA, ECG, and skin temperature sensors.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.5,
    reviews: createEmptyReviews()
  },
  {
    id: 34005,
    name: "Garmin Venu 2",
    price: 399.99,
    category: "Smartwatches",
    brand: "Garmin",
    description: "GPS smartwatch with advanced health monitoring and AMOLED display.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.6,
    reviews: createEmptyReviews()
  },
  {
    id: 34006,
    name: "Fossil Gen 6",
    price: 299.99,
    category: "Smartwatches",
    brand: "Fossil",
    description: "Wear OS smartwatch with Snapdragon 4100+ and fast charging technology.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.3,
    reviews: createEmptyReviews()
  },
  {
    id: 34007,
    name: "Amazfit GTR 3 Pro",
    price: 229.99,
    category: "Smartwatches",
    brand: "Amazfit",
    description: "High-end smartwatch with AMOLED display, 150+ sports modes, and voice assistant.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.4,
    reviews: createEmptyReviews()
  },
  {
    id: 34008,
    name: "Huawei Watch GT 3",
    price: 249.99,
    category: "Smartwatches",
    brand: "Huawei",
    description: "Elegant smartwatch with up to 14 days battery life and accurate health monitoring.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.5,
    reviews: createEmptyReviews()
  },
  {
    id: 34009,
    name: "TicWatch Pro 3 Ultra",
    price: 299.99,
    category: "Smartwatches",
    brand: "Mobvoi",
    description: "Wear OS smartwatch with dual-layer display and Snapdragon 4100 processor.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.3,
    reviews: createEmptyReviews()
  },
  {
    id: 34010,
    name: "Polar Vantage V2",
    price: 499.99,
    category: "Smartwatches",
    brand: "Polar",
    description: "Premium multisport watch with training load, recovery tracking, and performance tests.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.6,
    reviews: createEmptyReviews()
  },
  {
    id: 34011,
    name: "Suunto 9 Peak",
    price: 569.99,
    category: "Smartwatches",
    brand: "Suunto",
    description: "Ultra-thin, durable multisport GPS watch with long battery life and advanced metrics.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.5,
    reviews: createEmptyReviews()
  },
  {
    id: 34012,
    name: "Withings ScanWatch",
    price: 279.99,
    category: "Smartwatches",
    brand: "Withings",
    description: "Hybrid smartwatch with ECG, SpO2, and clinically validated health monitoring.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.4,
    reviews: createEmptyReviews()
  },
  {
    id: 34013,
    name: "Coros Vertix 2",
    price: 699.99,
    category: "Smartwatches",
    brand: "Coros",
    description: "Adventure GPS watch with 1.4\" touchscreen, 60-day battery life, and dual-frequency GPS.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.7,
    reviews: createEmptyReviews()
  },
  {
    id: 34014,
    name: "Skagen Falster Gen 6",
    price: 295.99,
    category: "Smartwatches",
    brand: "Skagen",
    description: "Minimalist Wear OS smartwatch with Snapdragon 4100+ and fast charging.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.2,
    reviews: createEmptyReviews()
  },
  {
    id: 34015,
    name: "OnePlus Watch",
    price: 159.99,
    category: "Smartwatches",
    brand: "OnePlus",
    description: "Smartwatch with 14-day battery life, 5ATM + IP68 rating, and 110+ workout types.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.1,
    reviews: createEmptyReviews()
  }
];

// GAMING GEAR
export const gamingGearProducts: Product[] = [
  {
    id: 35001,
    name: "Razer Basilisk V3",
    price: 69.99,
    category: "Gaming Gear",
    subcategory: "Mice",
    brand: "Razer",
    description: "Customizable gaming mouse with 11 programmable buttons and Razer Chroma RGB.",
    imageUrl: "/lovable-uploads/d25b7839-e5c3-40e7-b085-79d316d78dcf.png",
    quantity: 0,
    rating: 4.7,
    reviews: createEmptyReviews()
  },
  {
    id: 35002,
    name: "Logitech G Pro X Superlight",
    price: 149.99,
    category: "Gaming Gear",
    subcategory: "Mice",
    brand: "Logitech",
    description: "Ultra-lightweight wireless gaming mouse with HERO 25K sensor.",
    imageUrl: "/lovable-uploads/d25b7839-e5c3-40e7-b085-79d316d78dcf.png",
    quantity: 0,
    rating: 4.8,
    reviews: createEmptyReviews()
  },
  {
    id: 35003,
    name: "SteelSeries Arctis Pro Wireless",
    price: 329.99,
    category: "Gaming Gear",
    subcategory: "Headsets",
    brand: "SteelSeries",
    description: "Premium wireless gaming headset with dual-wireless technology and Hi-Res audio.",
    imageUrl: "/lovable-uploads/d1307e35-8834-4230-b1d0-9aa18e7760f7.png",
    quantity: 0,
    rating: 4.7,
    reviews: createEmptyReviews()
  },
  {
    id: 35004,
    name: "Logitech G Pro X Mechanical Keyboard",
    price: 149.99,
    category: "Gaming Gear",
    subcategory: "Keyboards",
    brand: "Logitech",
    description: "Tournament-grade TKL mechanical keyboard with swappable switches.",
    imageUrl: "/lovable-uploads/3f391803-44c1-4437-a246-5070b31d60a5.png",
    quantity: 0,
    rating: 4.6,
    reviews: createEmptyReviews()
  },
  {
    id: 35005,
    name: "Razer Kraken V3 Pro HyperSense",
    price: 199.99,
    category: "Gaming Gear",
    subcategory: "Headsets",
    brand: "Razer",
    description: "Wireless gaming headset with haptic feedback technology and THX Spatial Audio.",
    imageUrl: "/lovable-uploads/d1307e35-8834-4230-b1d0-9aa18e7760f7.png",
    quantity: 0,
    rating: 4.5,
    reviews: createEmptyReviews()
  },
  {
    id: 35006,
    name: "HyperX Alloy Origins Core",
    price: 89.99,
    category: "Gaming Gear",
    subcategory: "Keyboards",
    brand: "HyperX",
    description: "TKL RGB mechanical gaming keyboard with aircraft-grade aluminum body.",
    imageUrl: "/lovable-uploads/3f391803-44c1-4437-a246-5070b31d60a5.png",
    quantity: 0,
    rating: 4.6,
    reviews: createEmptyReviews()
  },
  {
    id: 35007,
    name: "Glorious Model O Wireless",
    price: 79.99,
    category: "Gaming Gear",
    subcategory: "Mice",
    brand: "Glorious",
    description: "Ultra-lightweight (69g) wireless gaming mouse with honeycomb shell.",
    imageUrl: "/lovable-uploads/d25b7839-e5c3-40e7-b085-79d316d78dcf.png",
    quantity: 0,
    rating: 4.7,
    reviews: createEmptyReviews()
  },
  {
    id: 35008,
    name: "Corsair MM700 RGB",
    price: 59.99,
    category: "Gaming Gear",
    subcategory: "Mousepads",
    brand: "Corsair",
    description: "Extended RGB mouse pad with USB passthrough and micro-woven cloth surface.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.5,
    reviews: createEmptyReviews()
  },
  {
    id: 35009,
    name: "Astro A50 Wireless",
    price: 299.99,
    category: "Gaming Gear",
    subcategory: "Headsets",
    brand: "Astro",
    description: "Wireless gaming headset with base station, Dolby Audio, and 15+ hour battery life.",
    imageUrl: "/lovable-uploads/d1307e35-8834-4230-b1d0-9aa18e7760f7.png",
    quantity: 0,
    rating: 4.6,
    reviews: createEmptyReviews()
  },
  {
    id: 35010,
    name: "Elgato Stream Deck MK.2",
    price: 149.99,
    category: "Gaming Gear",
    subcategory: "Streaming",
    brand: "Elgato",
    description: "Customizable LCD key controller for streamers with 15 programmable keys.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.8,
    reviews: createEmptyReviews()
  },
  {
    id: 35011,
    name: "NZXT Function MiniTKL",
    price: 129.99,
    category: "Gaming Gear",
    subcategory: "Keyboards",
    brand: "NZXT",
    description: "Compact mechanical keyboard with hot-swappable switches and per-key RGB.",
    imageUrl: "/lovable-uploads/3f391803-44c1-4437-a246-5070b31d60a5.png",
    quantity: 0,
    rating: 4.4,
    reviews: createEmptyReviews()
  },
  {
    id: 35012,
    name: "Audeze Penrose",
    price: 299.99,
    category: "Gaming Gear",
    subcategory: "Headsets",
    brand: "Audeze",
    description: "Wireless gaming headset with planar magnetic drivers and broadcast-quality microphone.",
    imageUrl: "/lovable-uploads/d1307e35-8834-4230-b1d0-9aa18e7760f7.png",
    quantity: 0,
    rating: 4.5,
    reviews: createEmptyReviews()
  },
  {
    id: 35013,
    name: "Endgame Gear XM1r",
    price: 59.99,
    category: "Gaming Gear",
    subcategory: "Mice",
    brand: "Endgame Gear",
    description: "Ultra-lightweight gaming mouse with Kailh GM 8.0 switches and PixArt PAW3370 sensor.",
    imageUrl: "/lovable-uploads/d25b7839-e5c3-40e7-b085-79d316d78dcf.png",
    quantity: 0,
    rating: 4.6,
    reviews: createEmptyReviews()
  },
  {
    id: 35014,
    name: "Logitech G733 Lightspeed",
    price: 129.99,
    category: "Gaming Gear",
    subcategory: "Headsets",
    brand: "Logitech",
    description: "Wireless gaming headset with LIGHTSPEED technology, colorful design, and Blue VO!CE technology.",
    imageUrl: "/lovable-uploads/d1307e35-8834-4230-b1d0-9aa18e7760f7.png",
    quantity: 0,
    rating: 4.6,
    reviews: createEmptyReviews()
  },
  {
    id: 35015,
    name: "Razer Goliathus Extended Chroma",
    price: 59.99,
    category: "Gaming Gear",
    subcategory: "Mousepads",
    brand: "Razer",
    description: "Soft extended gaming mouse mat with RGB lighting around the perimeter.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.5,
    reviews: createEmptyReviews()
  }
];

// Combine all product categories
export const additionalCategoryProducts: Product[] = [
  ...speakerProducts,
  ...monitorProducts,
  ...keyboardProducts,
  ...smartHomeProducts,
  ...smartwatchProducts,
  ...gamingGearProducts
];
