import { useState } from 'react';
import Hero from '../components/Hero';
import ProductFilters from '../components/ProductFilters';
import ProductGrid from '../components/ProductGrid';
import CartSummary from '../components/CartSummary';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  brand: "Apple" | "Samsung" | "Sony" | "Other";
}

const products: Product[] = [
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
  }
];

const Index = () => {
  const [cart, setCart] = useState<Product[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : products;
  });
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const handleQuantityChange = (id: number, quantity: number) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart.filter(item => item.quantity > 0)));
  };

  const filteredProducts = selectedBrand 
    ? products.filter(product => product.brand === selectedBrand)
    : products;

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToProducts = () => {
    const productsSection = document.querySelector('#products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Hero onExploreClick={scrollToProducts} />
      
      <div id="products-section" className="container mx-auto px-4 py-8">
        <ProductFilters 
          selectedBrand={selectedBrand}
          onBrandSelect={setSelectedBrand}
        />
        <ProductGrid 
          products={filteredProducts}
          onQuantityChange={handleQuantityChange}
        />
      </div>
      
      <CartSummary itemCount={itemCount} total={total} />
    </div>
  );
};

export default Index;
