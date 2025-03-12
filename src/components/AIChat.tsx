
import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { products } from '../data/productData';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

interface AIChatProps {
  onClose: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hi there! How can I help you with Electrium products today?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Scroll to the bottom of the messages
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Focus the input field
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI thinking
    setTimeout(() => {
      const botResponse = generateResponse(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot'
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const generateResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    // Handle specific product price inquiries
    const productKeywords = ['how much', 'price', 'cost', 'pricing'];
    const hasProductPriceQuestion = productKeywords.some(keyword => input.includes(keyword));
    
    if (hasProductPriceQuestion) {
      // Look for product names in the query
      const productMatch = products.find(product => 
        input.includes(product.name.toLowerCase()) || 
        (product.brand.toLowerCase() + ' ' + product.name.toLowerCase()).includes(input)
      );
      
      if (productMatch) {
        return `The ${productMatch.name} from ${productMatch.brand} costs $${productMatch.price.toFixed(2)}. Would you like more information about this product?`;
      }
      
      // Check for brand inquiries
      const brandMatches = products.filter(product => 
        input.includes(product.brand.toLowerCase())
      );
      
      if (brandMatches.length > 0) {
        const brandName = brandMatches[0].brand;
        const cheapestProduct = [...brandMatches].sort((a, b) => a.price - b.price)[0];
        const expensiveProduct = [...brandMatches].sort((a, b) => b.price - a.price)[0];
        
        return `${brandName} products range from $${cheapestProduct.price.toFixed(2)} for the ${cheapestProduct.name} to $${expensiveProduct.price.toFixed(2)} for the ${expensiveProduct.name}. What specific ${brandName} product are you interested in?`;
      }
    }
    
    // Check for product information requests by brand
    if (input.includes('iphone') || input.includes('apple')) {
      const appleProducts = products.filter(p => p.brand === 'Apple');
      if (appleProducts.length === 0) return "I'm sorry, we don't have any Apple products in stock at the moment.";
      
      const productNames = appleProducts.map(p => `${p.name} ($${p.price.toFixed(2)})`).join(', ');
      return `We have several Apple products including: ${productNames}. Would you like more information on any specific Apple product?`;
    }
    
    if (input.includes('samsung') || input.includes('galaxy')) {
      const samsungProducts = products.filter(p => p.brand === 'Samsung');
      if (samsungProducts.length === 0) return "I'm sorry, we don't have any Samsung products in stock at the moment.";
      
      const productNames = samsungProducts.map(p => `${p.name} ($${p.price.toFixed(2)})`).join(', ');
      return `We have several Samsung products including: ${productNames}. Would you like more information on any specific Samsung product?`;
    }
    
    if (input.includes('playstation') || input.includes('ps5') || input.includes('ps4') || input.includes('sony')) {
      const playstationProducts = products.filter(p => p.brand === 'PlayStation' || p.brand === 'Sony');
      if (playstationProducts.length === 0) return "I'm sorry, we don't have any PlayStation or Sony products in stock at the moment.";
      
      const productNames = playstationProducts.map(p => `${p.name} ($${p.price.toFixed(2)})`).join(', ');
      return `We have several PlayStation/Sony products including: ${productNames}. Would you like more information on any specific PlayStation product?`;
    }
    
    if (input.includes('game') || input.includes('gaming') || input.includes('play')) {
      const gameProducts = products.filter(p => p.brand === 'PlayStation' || p.brand === 'PC Games');
      if (gameProducts.length === 0) return "I'm sorry, we don't have any gaming products in stock at the moment.";
      
      const productNames = gameProducts.map(p => `${p.name} ($${p.price.toFixed(2)})`).join(', ');
      return `We have several gaming products including: ${productNames}. We have games for PlayStation and PC!`;
    }
    
    if (input.includes('accessory') || input.includes('accessories') || input.includes('headphone') || input.includes('case') || input.includes('charger')) {
      const categories = ['Headphones', 'Cases', 'Chargers', 'Screen Protectors', 'Cables', 'Memory Cards'];
      const categoryMatch = categories.find(cat => input.includes(cat.toLowerCase()));
      
      if (categoryMatch) {
        return `We offer various ${categoryMatch} that can be added to compatible products. You can select them when viewing product details. Would you like to browse our products to see compatible ${categoryMatch}?`;
      }
      
      return `We offer various accessories including Headphones, Cases, Chargers, Screen Protectors, Cables, and Memory Cards. These can be added to compatible products during checkout. Which accessories are you interested in?`;
    }
    
    if (input.includes('discount') || input.includes('sale') || input.includes('deal')) {
      return `We regularly offer discounts through our spin wheel promotion. Visit our products page to try your luck and win discounts of up to 30% on selected brands!`;
    }
    
    if (input.includes('delivery') || input.includes('shipping')) {
      return `We offer free shipping on all orders over $50. Standard delivery takes 3-5 business days, and express delivery is available for an additional fee.`;
    }
    
    if (input.includes('return') || input.includes('warranty')) {
      return `We offer a 30-day return policy on all products. Many of our electronics also come with manufacturer warranties ranging from 1-2 years.`;
    }
    
    if (input.includes('login') || input.includes('account') || input.includes('sign')) {
      return `You can create an account or log in by clicking the "Log In" link in the top right corner of the page. Having an account allows you to track orders, save favorites, and access exclusive deals!`;
    }
    
    if (input.includes('payment') || input.includes('pay') || input.includes('credit card')) {
      return `We accept all major credit cards, PayPal, and Apple Pay. All payment information is securely processed.`;
    }
    
    if (input.includes('wishlist') || input.includes('save for later') || input.includes('favorite')) {
      return `You can add products to your wishlist by clicking the heart icon on any product card. Your wishlist is saved and you can access it anytime from the Wishlist link in the navigation bar.`;
    }
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return 'Hello! How can I help you with your Electrium shopping experience today?';
    }
    
    if (input.includes('thanks') || input.includes('thank you')) {
      return 'You\'re welcome! Is there anything else I can help you with?';
    }
    
    if (input.includes('bye') || input.includes('goodbye')) {
      return 'Thank you for chatting with us! Feel free to return if you have more questions. Have a great day!';
    }
    
    // Default response
    return "I'm not sure I understand. Could you please rephrase your question? You can ask me about our products, their prices, discounts, shipping, returns, or account information.";
  };

  return (
    <div className="fixed top-16 right-4 bg-background border border-border rounded-lg shadow-lg w-80 sm:w-96 z-50 flex flex-col" style={{ height: '400px' }}>
      <div className="p-3 border-b border-border flex justify-between items-center bg-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center">
          <img src="/lovable-uploads/332dd32d-b893-48bd-8da7-73aa4bc107bb.png" alt="Electrium" className="w-6 h-6 mr-2" />
          <h3 className="font-medium">Electrium Assistant</h3>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-primary-foreground/10 rounded-full transition-colors">
          <X size={18} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} chat-bubble-animate`}
          >
            <div 
              className={`max-w-[80%] p-2 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-foreground'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="p-3 border-t border-border flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-background border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button 
          type="submit" 
          className="bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm hover:bg-primary/90 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default AIChat;
