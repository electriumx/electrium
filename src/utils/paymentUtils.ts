
export interface TradeInItem {
  id: number;
  name: string;
  value: number;
  selected: boolean;
}

export const getTradeInItems = (): TradeInItem[] => {
  return [
    { id: 1, name: "iPhone 13 Pro Max (Good Condition)", value: 650, selected: false },
    { id: 2, name: "iPhone 13 (Good Condition)", value: 500, selected: false },
    { id: 3, name: "Samsung Galaxy S21 (Good Condition)", value: 450, selected: false },
    { id: 4, name: "Google Pixel 6 Pro (Good Condition)", value: 400, selected: false },
    { id: 5, name: "MacBook Pro 2019 (Good Condition)", value: 800, selected: false },
    { id: 6, name: "iPad Pro 12.9\" 2021 (Good Condition)", value: 650, selected: false },
    { id: 7, name: "Sony PlayStation 5 (Good Condition)", value: 350, selected: false },
    { id: 8, name: "Xbox Series X (Good Condition)", value: 300, selected: false },
    { id: 9, name: "Nintendo Switch OLED (Good Condition)", value: 200, selected: false },
    { id: 10, name: "Apple Watch Series 7 (Good Condition)", value: 180, selected: false },
    { id: 11, name: "Dell XPS 15 (Good Condition)", value: 700, selected: false },
    { id: 12, name: "Samsung Galaxy Tab S8 Ultra (Good Condition)", value: 550, selected: false },
    { id: 13, name: "Bose QuietComfort 45 (Good Condition)", value: 180, selected: false },
    { id: 14, name: "Sony WH-1000XM5 (Good Condition)", value: 200, selected: false },
    { id: 15, name: "Canon EOS R5 Camera (Good Condition)", value: 1800, selected: false },
    { id: 16, name: "DJI Mavic 3 Drone (Good Condition)", value: 1200, selected: false },
    { id: 17, name: "Microsoft Surface Laptop 4 (Good Condition)", value: 650, selected: false },
    { id: 18, name: "LG 65\" OLED C1 TV (Good Condition)", value: 1100, selected: false },
    { id: 19, name: "Sonos Arc Soundbar (Good Condition)", value: 500, selected: false },
    { id: 20, name: "Dyson V15 Detect Vacuum (Good Condition)", value: 450, selected: false },
    { id: 21, name: "Peloton Bike+ (Good Condition)", value: 1500, selected: false },
    { id: 22, name: "iPhone 14 Pro Max (Good Condition)", value: 850, selected: false },
    { id: 23, name: "Samsung Galaxy S22 Ultra (Good Condition)", value: 750, selected: false },
    { id: 24, name: "MacBook Pro 16\" M1 Max (Good Condition)", value: 2200, selected: false },
    { id: 25, name: "iPad Air 5th Gen (Good Condition)", value: 400, selected: false },
    { id: 26, name: "Sony A7 IV Camera (Good Condition)", value: 1600, selected: false },
    { id: 27, name: "Alienware x17 Gaming Laptop (Good Condition)", value: 1800, selected: false },
    { id: 28, name: "Samsung 49\" Odyssey G9 Monitor (Good Condition)", value: 900, selected: false },
    { id: 29, name: "Apple iMac 27\" 5K (Good Condition)", value: 1100, selected: false },
    { id: 30, name: "Sony Bravia XR A90J 65\" OLED TV (Good Condition)", value: 1700, selected: false },
    { id: 31, name: "Mac Studio M1 Ultra (Good Condition)", value: 3000, selected: false },
    { id: 32, name: "Herman Miller Embody Chair (Good Condition)", value: 900, selected: false },
    { id: 33, name: "ASUS ROG Strix Scar 17 (Good Condition)", value: 1600, selected: false },
    { id: 34, name: "Razer Blade 17 (Good Condition)", value: 1800, selected: false },
    { id: 35, name: "MSI Creator Z16 (Good Condition)", value: 1500, selected: false },
    { id: 36, name: "Lenovo ThinkPad X1 Carbon (Good Condition)", value: 800, selected: false },
    { id: 37, name: "Microsoft Surface Studio 2 (Good Condition)", value: 2000, selected: false },
    { id: 38, name: "ASUS ProArt PA32UCX Monitor (Good Condition)", value: 1800, selected: false },
    { id: 39, name: "Mac Pro 2019 Base Model (Good Condition)", value: 4000, selected: false },
    { id: 40, name: "RED Komodo 6K Camera (Good Condition)", value: 5000, selected: false }
  ];
};
