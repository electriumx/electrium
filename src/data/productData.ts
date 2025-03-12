export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  brand: "Apple" | "Samsung" | "Sony" | "Google" | "Microsoft" | "Xiaomi" | "Audio" | "Accessories" | "PlayStation" | "PC Games" | "Games" | "All";
}

export const products: Product[] = [
  {
    id: 1,
    name: "MacBook Pro 16",
    price: 2499.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 3,
    name: "iPad Pro",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 4,
    name: "iMac 27-inch",
    price: 1799.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 5,
    name: "Apple Watch Series 9",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1534430206226-3ca46694ef5e?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 6,
    name: "AirPods Pro",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1560529034-2a9988b6ca89?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 7,
    name: "Mac Mini",
    price: 699.99,
    image: "https://images.unsplash.com/photo-1588654444534-526ea14c2d51?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 8,
    name: "Apple TV 4K",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1562440695-5c982f7136a8?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 9,
    name: "HomePod",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1571008813725-93672963b471?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 10,
    name: "AirTag",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1617144574795-ca9917115301?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 11,
    name: "Magic Keyboard",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1588654444534-526ea14c2d51?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 12,
    name: "Magic Mouse",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1588654444534-526ea14c2d51?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 13,
    name: "Apple Pencil",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1611162617474-522a220415fa?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 14,
    name: "Beats Studio Buds",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1614630455724-15c16963516a?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 15,
    name: "MagSafe Charger",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1607962834403-697050018610?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 16,
    name: "Lightning Cable",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1584798845943-49e596bbd64a?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 17,
    name: "USB-C Adapter",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1591798241437-1e3e709110f4?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 18,
    name: "AppleCare+",
    price: 149.00,
    image: "https://images.unsplash.com/photo-1585242985478-51404841d293?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 19,
    name: "Leather Wallet",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1585242985478-51404841d293?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 20,
    name: "Screen Protector",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1585242985478-51404841d293?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 21,
    name: "Samsung Galaxy S24 Ultra",
    price: 1199.99,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Samsung"
  },
  {
    id: 22,
    name: "Samsung Galaxy Book3",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Samsung"
  },
  {
    id: 23,
    name: "Samsung Galaxy Watch 6",
    price: 329.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Samsung"
  },
  {
    id: 24,
    name: "Samsung Galaxy Buds 2 Pro",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1534430206226-3ca46694ef5e?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Samsung"
  },
  {
    id: 25,
    name: "Samsung QLED 8K TV",
    price: 3499.99,
    image: "https://images.unsplash.com/photo-1560529034-2a9988b6ca89?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Samsung"
  },
  {
    id: 26,
    name: "Samsung Soundbar",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1588654513454-55c950269216?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Samsung"
  },
  {
    id: 27,
    name: "Samsung Smart Monitor",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1562440695-5c982f7136a8?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Samsung"
  },
  {
    id: 28,
    name: "Samsung Wireless Charger",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1571008813725-93672963b471?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Samsung"
  },
  {
    id: 29,
    name: "Samsung SSD",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1617144574795-ca9917115301?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Samsung"
  },
  {
    id: 30,
    name: "Samsung microSD Card",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1588654444534-526ea14c2d51?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Samsung"
  },
  {
    id: 31,
    name: "Sony WH-1000XM5",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Sony"
  },
  {
    id: 32,
    name: "Sony A7 IV",
    price: 2499.99,
    image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Sony"
  },
  {
    id: 33,
    name: "Sony Bravia XR OLED",
    price: 2799.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Sony"
  },
  {
    id: 34,
    name: "Sony PlayStation 5",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1534430206226-3ca46694ef5e?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Sony"
  },
  {
    id: 35,
    name: "Sony Alpha 7C",
    price: 1999.99,
    image: "https://images.unsplash.com/photo-1560529034-2a9988b6ca89?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Sony"
  },
  {
    id: 36,
    name: "Sony HT-A7000",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1588654513454-55c950269216?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Sony"
  },
  {
    id: 37,
    name: "Sony Xperia 1 V",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1562440695-5c982f7136a8?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Sony"
  },
  {
    id: 38,
    name: "Sony ZV-1",
    price: 749.99,
    image: "https://images.unsplash.com/photo-1571008813725-93672963b471?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Sony"
  },
  {
    id: 39,
    name: "Sony FE 24-70mm",
    price: 2199.99,
    image: "https://images.unsplash.com/photo-1617144574795-ca9917115301?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Sony"
  },
  {
    id: 40,
    name: "Sony Noise Cancelling",
    price: 229.99,
    image: "https://images.unsplash.com/photo-1588654444534-526ea14c2d51?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Sony"
  },
  {
    id: 41,
    name: "iPhone 15",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 42,
    name: "iPhone 14 Pro",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 43,
    name: "iPhone 14",
    price: 699.99,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 44,
    name: "iPhone SE",
    price: 429.99,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 45,
    name: "iPad Air",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 46,
    name: "iPad mini",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 47,
    name: "MacBook Air 13",
    price: 1099.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 48,
    name: "MacBook Air 15",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 49,
    name: "iMac 24-inch",
    price: 1499.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 50,
    name: "Mac Studio",
    price: 1999.99,
    image: "https://images.unsplash.com/photo-1588654513454-55c950269216?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 51,
    name: "Pro Display XDR",
    price: 4999.99,
    image: "https://images.unsplash.com/photo-1562440695-5c982f7136a8?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 52,
    name: "Apple Watch SE",
    price: 279.99,
    image: "https://images.unsplash.com/photo-1534430206226-3ca46694ef5e?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 53,
    name: "AirPods (3rd generation)",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1560529034-2a9988b6ca89?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 54,
    name: "AirPods Max",
    price: 549.99,
    image: "https://images.unsplash.com/photo-1560529034-2a9988b6ca89?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 55,
    name: "HomePod mini",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1571008813725-93672963b471?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 56,
    name: "iPod touch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1571008813725-93672963b471?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 57,
    name: "Apple Watch Band",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1534430206226-3ca46694ef5e?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 58,
    name: "Apple USB-C Charge Cable",
    price: 29.00,
    image: "https://images.unsplash.com/photo-1584798845943-49e596bbd64a?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 59,
    name: "Apple World Travel Adapter Kit",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1591798241437-1e3e709110f4?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 60,
    name: "Apple Polishing Cloth",
    price: 19.00,
    image: "https://images.unsplash.com/photo-1585242985478-51404841d293?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 61,
    name: "Apple Leather Case",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1585242985478-51404841d293?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 62,
    name: "Apple Screen Cleaning Kit",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1585242985478-51404841d293?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 63,
    name: "Apple Smart Folio",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 64,
    name: "Apple Smart Keyboard Folio",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1588654444534-526ea14c2d51?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 65,
    name: "Apple Magic Trackpad",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1588654444534-526ea14c2d51?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 66,
    name: "Apple Thunderbolt 4",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1591798241437-1e3e709110f4?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 67,
    name: "Apple USB-C to Lightning Adapter",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1584798845943-49e596bbd64a?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 68,
    name: "Apple MagSafe Battery Pack",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1607962834403-697050018610?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 69,
    name: "Apple Pencil Tips",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1611162617474-522a220415fa?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 70,
    name: "Apple AirPods Charging Case",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1560529034-2a9988b6ca89?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 71,
    name: "Apple Watch Magnetic Charging Cable",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1534430206226-3ca46694ef5e?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 72,
    name: "Apple Lightning to 3.5 mm Headphone Jack Adapter",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1584798845943-49e596bbd64a?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 73,
    name: "Apple USB-C to SD Card Reader",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1591798241437-1e3e709110f4?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 74,
    name: "Apple Studio Display Tilt Adapter",
    price: 29.00,
    image: "https://images.unsplash.com/photo-1562440695-5c982f7136a8?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 75,
    name: "Apple iPhone FineWoven Wallet with MagSafe",
    price: 59.00,
    image: "https://images.unsplash.com/photo-1585242985478-51404841d293?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 76,
    name: "Apple iPhone FineWoven Case with MagSafe",
    price: 59.00,
    image: "https://images.unsplash.com/photo-1585242985478-51404841d293?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 77,
    name: "Google Pixel 8 Pro",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Google"
  },
  {
    id: 78,
    name: "Google Pixel 8",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Google"
  },
  {
    id: 79,
    name: "Google Pixel 7a",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Google"
  },
  {
    id: 80,
    name: "Google Pixel Tablet",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Google"
  },
  {
    id: 81,
    name: "Google Pixel Watch 2",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1534430206226-3ca46694ef5e?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Google"
  },
  {
    id: 82,
    name: "Google Nest Hub",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1558227139-ca38566ce9e1?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Google"
  },
  {
    id: 83,
    name: "Google Nest Mini",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1558227139-ca38566ce9e1?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Google"
  },
  {
    id: 84,
    name: "Microsoft Surface Pro 9",
    price: 1099.99,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Microsoft"
  },
  {
    id: 85,
    name: "Microsoft Surface Laptop 5",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Microsoft"
  },
  {
    id: 86,
    name: "Microsoft Surface Studio 2+",
    price: 4499.99,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Microsoft"
  },
  {
    id: 87,
    name: "Xbox Series X",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Microsoft"
  },
  {
    id: 88,
    name: "Xbox Series S",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Microsoft"
  },
  {
    id: 89,
    name: "Xbox Wireless Controller",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1585662841523-9bc81f0db633?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Microsoft"
  },
  {
    id: 90,
    name: "Xiaomi 13 Pro",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Xiaomi"
  },
  {
    id: 91,
    name: "Xiaomi 13T",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Xiaomi"
  },
  {
    id: 92,
    name: "Xiaomi Redmi Note 12",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Xiaomi"
  },
  {
    id: 93,
    name: "Xiaomi Smart Band 8",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1534430206226-3ca46694ef5e?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Xiaomi"
  },
  {
    id: 94,
    name: "Xiaomi Robot Vacuum",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1560009523-cdc4a04098ec?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Xiaomi"
  },
  {
    id: 95,
    name: "Sennheiser HD 660S",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Audio"
  },
  {
    id: 96,
    name: "Bose QuietComfort Ultra",
    price: 429.99,
    image: "https://images.unsplash.com/photo-1567787609199-efa7a1b232b3?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Audio"
  },
  {
    id: 97,
    name: "JBL Flip 6",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Audio"
  },
  {
    id: 98,
    name: "Audio-Technica AT-LP120X",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1630827019766-95468e62174d?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Audio"
  },
  {
    id: 99,
    name: "Anker 65W GaN Charger",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Accessories"
  },
  {
    id: 100,
    name: "Samsung T7 SSD 1TB",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1541406213863-2ff94db0e36e?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Accessories"
  },
  {
    id: 101,
    name: "PlayStation 4 Slim",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Sony"
  },
  {
    id: 102,
    name: "PlayStation 4 Pro",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Sony"
  },
  {
    id: 103,
    name: "PlayStation 5 Digital Edition",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Sony"
  },
  {
    id: 104,
    name: "PlayStation 5 Disc Edition",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Sony"
  },
  {
    id: 105,
    name: "DualSense Wireless Controller",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Sony"
  },
  {
    id: 106,
    name: "PS5 DualSense Charging Station",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Sony"
  },
  {
    id: 107,
    name: "PS5 HD Camera",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Sony"
  },
  {
    id: 108,
    name: "PS5 Media Remote",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Sony"
  },
  {
    id: 109,
    name: "MacBook Pro 14",
    price: 1999.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 110,
    name: "Mac Pro",
    price: 5999.99,
    image: "https://images.unsplash.com/photo-1588654513454-55c950269216?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 111,
    name: "Studio Display",
    price: 1599.99,
    image: "https://images.unsplash.com/photo-1562440695-5c982f7136a8?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 112,
    name: "iPhone 15 Plus",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 113,
    name: "iPhone 15 Pro Max",
    price: 1199.99,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 114,
    name: "iPad 10th Generation",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Apple"
  },
  {
    id: 115,
    name: "Xiaomi Pad 6",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Xiaomi"
  },
  {
    id: 116,
    name: "Xiaomi Watch S3",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1534430206226-3ca46694ef5e?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Xiaomi"
  },
  {
    id: 117,
    name: "Xiaomi Smart TV X",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Xiaomi"
  },
  {
    id: 118,
    name: "Xiaomi Electric Scooter",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1595854341625-f33e06255a43?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Xiaomi"
  },
  {
    id: 119,
    name: "Xiaomi Air Purifier",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1595941069915-4218169fb748?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Xiaomi"
  },
  {
    id: 120,
    name: "Xiaomi Buds 4 Pro",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1560529034-2a9988b6ca89?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Xiaomi"
  },
  {
    id: 121,
    name: "10,000mAh Power Bank",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1609692814858-f7cd2f0afa4f?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Accessories"
  },
  {
    id: 122,
    name: "Wireless Charging Pad",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Accessories"
  },
  {
    id: 123,
    name: "USB-C Hub 8-in-1",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1591798241437-1e3e709110f4?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Accessories"
  },
  {
    id: 124,
    name: "Laptop Stand",
    price: 25.99,
    image: "https://images.unsplash.com/photo-1611258623154-c15b6fbbab5c?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Accessories"
  },
  {
    id: 125,
    name: "Premium HDMI Cable 4K",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1584798845954-9f8d7359d447?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "Accessories"
  },
  {
    id: 126,
    name: "Call of Duty: Modern Warfare III",
    price: 69.99,
    image: "/lovable-uploads/0043f050-6bed-4f97-bb85-96fb6a0dffcd.png",
    quantity: 0,
    brand: "PlayStation"
  },
  {
    id: 127,
    name: "Call of Duty: Black Ops 6",
    price: 69.99,
    image: "/lovable-uploads/9e75b39e-727b-45c3-83f0-144af9271dba.png",
    quantity: 0,
    brand: "PlayStation"
  },
  {
    id: 128,
    name: "Call of Duty: Black Ops Cold War",
    price: 59.99,
    image: "/lovable-uploads/9e75b39e-727b-45c3-83f0-144af9271dba.png",
    quantity: 0,
    brand: "PlayStation"
  },
  {
    id: 129,
    name: "Call of Duty: Vanguard",
    price: 59.99,
    image: "/lovable-uploads/9e75b39e-727b-45c3-83f0-144af9271dba.png",
    quantity: 0,
    brand: "PlayStation"
  },
  {
    id: 130,
    name: "GTA V",
    price: 29.99,
    image: "/lovable-uploads/36503a17-78b8-4912-9fae-5e0b7d358857.png",
    quantity: 0,
    brand: "PlayStation"
  },
  {
    id: 131,
    name: "GTA VI",
    price: 79.99,
    image: "/lovable-uploads/36503a17-78b8-4912-9fae-5e0b7d358857.png",
    quantity: 0,
    brand: "PlayStation"
  },
  {
    id: 132,
    name: "FIFA 24",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "PlayStation"
  },
  {
    id: 133,
    name: "Spider-Man 2",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1608889476518-6628d79bf8a5?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "PlayStation"
  },
  {
    id: 134,
    name: "God of War Ragnarök",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1608889825271-9696283ab804?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "PlayStation"
  },
  {
    id: 135,
    name: "The Last of Us Part II",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1583384990896-778235d9cee9?auto=format&fit=crop&w=800",
    quantity: 0,
    brand: "PlayStation"
  },
  {
    id: 136,
    name: "Call of Duty: Modern Warfare III (PC)",
    price: 69.99,
    image: "/lovable-uploads/0043f050-6bed-4f97-bb85-96fb6a0dffcd.png",
    quantity: 0,
    brand: "PC Games"
  },
  {
    id: 137,
    name: "Call of Duty: Black Ops 6 (PC)",
    price: 69.99,
    image: "/lovable-uploads/9e75b39e-727b-45c3-83f0-144af9271dba.png",
    quantity: 0,
    brand: "PC Games"
  },
  {
    id: 138,
    name: "Call of Duty: Black Ops Cold War (PC)",
    price: 59.99,
    image: "/lovable-uploads/9e75b39e-727b-45c3-83f0-144af9271dba.png",
    quantity: 0,
    brand: "PC Games"
  },
  {
    id: 139,
    name: "Call of Duty: Vanguard (PC)",
    price: 59.99,
    image: "/lovable-uploads/9e75b39e-727b-45c3-83f0-144af9271dba.png",
    quantity: 0,
    brand: "PC Games"
  },
  {
    id: 140,
    name: "GTA V (PC)",
    price: 29.99,
    image: "/lovable-uploads/36503a17-78b8-4912-9fae-5e0b7d358857.png",
    quantity: 0,
    brand: "PC Games"
  },
  {
    id: 141,
    name: "GTA VI (PC)",
    price: 79.99,
    image: "/lovable-uploads/36503a17-78b8-4912-9fae-5e0b7d358857.png",
    quantity: 0,
    brand: "PC Games"
  },
  {
    id: 142,
    name: "Cyberpunk 2077",
    price: 49.99,
    image: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    brand: "PC Games"
  },
  {
    id: 143,
    name: "The Witcher 3: Wild Hunt",
    price: 39.99,
    image: "/lovable-uploads/07224c91-e369-4205-a0c2-458050f508f3.png",
    quantity: 0,
    brand: "PC Games"
  },
  {
    id: 144,
    name: "Red Dead Redemption 2 (PC)",
    price: 59.99,
    image: "/lovable-uploads/b48e7d14-29ab-4227-a09c-eb324e7620d7.png",
    quantity: 0,
    brand: "PC Games"
  },
  {
    id: 145,
    name: "Elden Ring (PC)",
    price: 59.99,
    image: "/lovable-uploads/6e559433-f480-42f6-9f32-9429e4b3b349.png",
    quantity: 0,
    brand: "PC Games"
  }
];
