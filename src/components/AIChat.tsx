import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { products } from '../data/productData';

const categories = Array.from(new Set(products.map(p => p.category)));
const brandsByCategory: Record<string, string[]> = {};

products.forEach(product => {
  if (!brandsByCategory[product.brand]) {
    brandsByCategory[product.brand] = [];
  }
  
  if (!brandsByCategory[product.brand].includes(product.category)) {
    brandsByCategory[product.brand].push(product.category);
  }
});

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
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');

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
    
    const productKeywords = ['how much', 'price', 'cost', 'pricing', 'how much is', 'what is the price'];
    const hasProductPriceQuestion = productKeywords.some(keyword => input.includes(keyword));
    
    if (hasProductPriceQuestion) {
      const productMatch = products.find(product => 
        input.includes(product.name.toLowerCase()) || 
        (product.brand.toLowerCase() + ' ' + product.name.toLowerCase()).includes(input)
      );
      
      if (productMatch) {
        const originalPrice = productMatch.price.toFixed(2);
        const discountPercentage = productMatch.discount || 0;
        const discountedPrice = discountPercentage > 0 ? 
          (productMatch.price * (1 - discountPercentage/100)).toFixed(2) : 
          originalPrice;
        
        if (discountPercentage > 0) {
          return `The ${productMatch.name} from ${productMatch.brand} regularly costs $${originalPrice}, but it's currently on sale for $${discountedPrice} (${discountPercentage}% off). It's in the ${productMatch.category} category. Would you like to know more about its features?`;
        } else {
          return `The ${productMatch.name} from ${productMatch.brand} costs $${originalPrice}. It's in the ${productMatch.category} category. Would you like to see similar products or know more about its features?`;
        }
      }
      
      const brandMatches = products.filter(product => 
        input.includes(product.brand.toLowerCase())
      );
      
      if (brandMatches.length > 0) {
        const brandName = brandMatches[0].brand;
        const cheapestProduct = [...brandMatches].sort((a, b) => a.price - b.price)[0];
        const expensiveProduct = [...brandMatches].sort((a, b) => b.price - a.price)[0];
        
        return `${brandName} products range from $${cheapestProduct.price.toFixed(2)} for the ${cheapestProduct.name} to $${expensiveProduct.price.toFixed(2)} for the ${expensiveProduct.name}. We have ${brandMatches.length} ${brandName} products available. What specific ${brandName} product or category are you interested in?`;
      }
      
      const categoryKeywords = categories.map(cat => cat.toLowerCase());
      const categoryMatch = categoryKeywords.find(cat => input.includes(cat));
      
      if (categoryMatch) {
        const category = categories.find(cat => cat.toLowerCase() === categoryMatch);
        if (category) {
          const categoryProducts = products.filter(p => p.category === category);
          if (categoryProducts.length > 0) {
            const cheapest = [...categoryProducts].sort((a, b) => a.price - b.price)[0];
            const mostExpensive = [...categoryProducts].sort((a, b) => b.price - a.price)[0];
            
            return `We have ${categoryProducts.length} ${category} products available, ranging from the ${cheapest.name} at $${cheapest.price.toFixed(2)} to the ${mostExpensive.name} at $${mostExpensive.price.toFixed(2)}. Would you like to see our top-rated ${category} products?`;
          }
        }
      }
      
      return "I couldn't find specific pricing information for that product. Could you be more specific about which product, brand, or category you're interested in?";
    }
    
    for (const brand of Object.keys(brandsByCategory)) {
      if (input.includes(brand.toLowerCase())) {
        const brandProducts = products.filter(p => p.brand === brand);
        if (brandProducts.length === 0) return `I'm sorry, we don't have any ${brand} products in stock at the moment.`;
        
        const productsByCategory = {};
        brandProducts.forEach(p => {
          if (!productsByCategory[p.category]) {
            productsByCategory[p.category] = [];
          }
          productsByCategory[p.category].push(p);
        });
        
        let response = `We have several ${brand} products including: `;
        const categories = Object.keys(productsByCategory);
        
        categories.forEach((category, i) => {
          const categoryProducts = productsByCategory[category];
          const exampleProducts = categoryProducts.slice(0, 2).map(p => `${p.name} ($${p.price.toFixed(2)})`).join(', ');
          
          response += `${category}: ${exampleProducts}${i < categories.length - 1 ? '; ' : '.'}`;
        });
        
        response += ` Would you like more information on any specific ${brand} product or category?`;
        
        return response;
      }
    }
    
    for (const category of categories) {
      if (input.includes(category.toLowerCase())) {
        const categoryProducts = products.filter(p => p.category === category);
        if (categoryProducts.length === 0) return `I'm sorry, we don't have any ${category} products in stock at the moment.`;
        
        const topRated = [...categoryProducts].sort((a, b) => b.rating - a.rating).slice(0, 3);
        const topRatedText = topRated.map(p => `${p.brand} ${p.name} (rated ${p.rating}/5 by ${p.reviews} customers)`).join(', ');
        
        return `We have ${categoryProducts.length} ${category} products available. Our top-rated ${category} products are: ${topRatedText}. Would you like information about a specific brand or model?`;
      }
    }
    
    if (input.includes('accessory') || input.includes('accessories') || input.includes('headphone') || input.includes('case') || input.includes('charger')) {
      const categories = ['Headphones', 'Cases', 'Chargers', 'Screen Protectors', 'Cables', 'Memory Cards'];
      const categoryMatch = categories.find(cat => input.includes(cat.toLowerCase()));
      
      if (categoryMatch) {
        const accessoryProducts = products.filter(p => p.category === categoryMatch);
        if (accessoryProducts.length > 0) {
          const topAccessories = accessoryProducts.slice(0, 3).map(p => `${p.brand} ${p.name} ($${p.price.toFixed(2)})`).join(', ');
          return `We offer various ${categoryMatch} including ${topAccessories}. Many products also have compatible accessories you can add during checkout. Would you like to see our full range of ${categoryMatch}?`;
        }
        
        return `We offer various ${categoryMatch} that can be added to compatible products. You can select them when viewing product details. Would you like to browse our products to see compatible ${categoryMatch}?`;
      }
      
      return `We offer various accessories including Headphones, Cases, Chargers, Screen Protectors, Cables, and Memory Cards. These can be added to compatible products during checkout. Which accessories are you interested in?`;
    }
    
    if (input.includes('discount') || input.includes('sale') || input.includes('deal') || input.includes('offer')) {
      const discountedProducts = products.filter(p => p.discount && p.discount > 0);
      
      if (discountedProducts.length > 0) {
        const topDeals = discountedProducts
          .sort((a, b) => (b.discount || 0) - (a.discount || 0))
          .slice(0, 3)
          .map(p => `${p.brand} ${p.name} (${p.discount}% off)`);
          
        return `We currently have ${discountedProducts.length} products on sale! Our best deals include: ${topDeals.join(', ')}. You can also try your luck with our spin wheel promotion to win discounts of up to 30% on selected brands!`;
      }
      
      return `We regularly offer discounts through our spin wheel promotion. Visit our products page to try your luck and win discounts of up to 30% on selected brands!`;
    }
    
    if (input.includes('delivery') || input.includes('shipping')) {
      return `We offer free shipping on all orders over $50. Standard delivery takes 3-5 business days, and express delivery (1-2 business days) is available for an additional $9.99. International shipping is also available to select countries, with rates calculated at checkout.`;
    }
    
    if (input.includes('return') || input.includes('warranty')) {
      return `We offer a 30-day return policy on all products in new condition with original packaging. Most electronics come with manufacturer warranties ranging from 1-2 years. Extended warranty options are available at checkout for many products. Would you like more details about our return process?`;
    }
    
    if (input.includes('login') || input.includes('account') || input.includes('sign')) {
      return `You can create an account or log in by clicking the "Log In" link in the top right corner of the page. Having an account allows you to track orders, save favorites, manage your wishlist, receive personalized recommendations, and access exclusive deals!`;
    }
    
    if (input.includes('payment') || input.includes('pay') || input.includes('credit card') || input.includes('checkout')) {
      return `We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All payment information is securely processed using industry-standard encryption. We also offer financing options on purchases over $500 through Affirm.`;
    }
    
    if (input.includes('wishlist') || input.includes('save for later') || input.includes('favorite')) {
      return `You can add products to your wishlist by clicking the heart icon on any product card. Your wishlist is saved to your account and you can access it anytime from the Wishlist link in the navigation bar. You'll also receive notifications if items in your wishlist go on sale!`;
    }
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return 'Hello! Welcome to Electrium! How can I help you today? I can assist with product information, pricing, shipping options, or recommend products based on your needs.';
    }
    
    if (input.includes('thanks') || input.includes('thank you')) {
      return 'You\'re welcome! I\'m happy to help. Is there anything else you\'d like to know about our products or services?';
    }
    
    if (input.includes('bye') || input.includes('goodbye')) {
      return 'Thank you for chatting with us! Feel free to return if you have more questions. Have a great day, and don\'t forget to check out our latest deals!';
    }
    
    if (input.includes('compare') || input.includes('difference') || input.includes('better')) {
      return "I'd be happy to help you compare products! Could you specify which products or brands you'd like to compare? I can provide information on features, pricing, and customer ratings to help you make an informed decision.";
    }
    
    if (input.includes('recommend') || input.includes('suggestion') || input.includes('best')) {
      return "I'd be happy to provide recommendations! To give you the best suggestions, could you tell me more about what you're looking for? For example, which category of product, your budget range, or any specific features that are important to you?";
    }
    
    return "I'm not sure I understand. Could you please rephrase your question? You can ask me about our products, their prices, features, discounts, shipping, returns, or account information.";
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
