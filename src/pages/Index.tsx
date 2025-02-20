
import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Premium Laptop",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800",
    quantity: 0
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800",
    quantity: 0
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800",
    quantity: 0
  },
  {
    id: 4,
    name: "Developer Laptop",
    price: 1599.99,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800",
    quantity: 0
  },
  {
    id: 5,
    name: "Coding Workstation",
    price: 2499.99,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800",
    quantity: 0
  },
  {
    id: 6,
    name: "iMac Pro",
    price: 1999.99,
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800",
    quantity: 0
  },
  {
    id: 7,
    name: "Office Chair",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800",
    quantity: 0
  },
  {
    id: 8,
    name: "Drone Camera",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&w=800",
    quantity: 0
  },
  {
    id: 9,
    name: "Landscape Print",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800",
    quantity: 0
  },
  {
    id: 10,
    name: "Cat Portrait",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800",
    quantity: 0
  }
];

const Index = () => {
  const [cart, setCart] = useState<Product[]>(products);

  const handleQuantityChange = (id: number, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    );
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-medium text-gray-900 mb-4">Our Products</h1>
          <p className="text-gray-600">Select your favorite items</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard
              key={product.id}
              {...product}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>
        
        <Cart total={total} itemCount={itemCount} />
      </div>
    </div>
  );
};

export default Index;
