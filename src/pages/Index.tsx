
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
  }
];

const Index = () => {
  const [cart, setCart] = useState<Product[]>(products);

  const handleQuantityChange = (id: number, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
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
