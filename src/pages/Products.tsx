<lov-code>
import { useState } from 'react';
import ProductFilters from '../components/ProductFilters';
import ProductGrid from '../components/ProductGrid';
import CartSummary from '../components/CartSummary';
import { useLocation } from 'react-router-dom';

const Products = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const location = useLocation();
  
  const products = [
    // Apple Products
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
    image: "https://images.unsplash.com/photo-1588654513454-55c950269216?auto=format&fit=crop&w=800",
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
    name: "Apple Watch Magnetic Fast Charger to USB-C Cable",
    price: 29.00,
    image: "https://images.unsplash.com/photo-1534430206226-3ca46694ef5e?",
    quantity: 0,
    brand: "Apple"
  },
  ];

  // Initialize cart state from localStorage or URL state
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
