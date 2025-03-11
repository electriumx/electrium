
import { useState, useRef, useEffect } from 'react';
import { X, MessageCircle, Bot } from 'lucide-react';
import { products } from '../data/productData';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

interface AIChatProps {
  onClose: () => void;
}

const AIChat = ({ onClose }: AIChatProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello! How can I help you with our products today?', isUser: false }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getProductInfo = (query: string) => {
    // Search for product information based on the query
    const queryLower = query.toLowerCase();
    const matchedProducts = products.filter(product => 
      product.name.toLowerCase().includes(queryLower) || 
      product.brand.toLowerCase().includes(queryLower)
    );

    if (matchedProducts.length > 0) {
      const product = matchedProducts[0];
      return `${product.name} by ${product.brand} is available for $${product.price.toFixed(2)}. It's one of our top products. Would you like more details?`;
    }
    
    return null;
  };

  const getBrandInfo = (query: string) => {
    const queryLower = query.toLowerCase();
    const brands = [...new Set(products.map(p => p.brand))];
    const matchedBrand = brands.find(brand => brand.toLowerCase().includes(queryLower));
    
    if (matchedBrand) {
      const brandProducts = products.filter(p => p.brand === matchedBrand);
      return `We have ${brandProducts.length} products from ${matchedBrand}. They are known for their quality and innovation. Would you like to see them?`;
    }
    
    return null;
  };

  const generateResponse = (userMessage: string) => {
    const userMessageLower = userMessage.toLowerCase();
    
    // Check for product information
    const productResponse = getProductInfo(userMessageLower);
    if (productResponse) return productResponse;
    
    // Check for brand information
    const brandResponse = getBrandInfo(userMessageLower);
    if (brandResponse) return brandResponse;
    
    // Handle general questions
    if (userMessageLower.includes('discount') || userMessageLower.includes('sale')) {
      return "We regularly offer discounts! You can try our Spin Wheel for a chance to win a discount on your favorite brands.";
    }
    
    if (userMessageLower.includes('shipping') || userMessageLower.includes('delivery')) {
      return "We offer free shipping on orders over $100. Standard delivery takes 3-5 business days.";
    }
    
    if (userMessageLower.includes('return') || userMessageLower.includes('refund')) {
      return "Our return policy allows returns within 30 days of purchase. Please contact our support team for assistance with returns or refunds.";
    }
    
    if (userMessageLower.includes('payment') || userMessageLower.includes('pay')) {
      return "We accept all major credit cards, PayPal, and Apple Pay. All transactions are secure and encrypted.";
    }

    if (userMessageLower.includes('login') || userMessageLower.includes('account')) {
      return "You can create an account or log in from the top navigation bar. Having an account allows you to track orders and leave product reviews.";
    }
    
    // Default responses
    const responses = [
      "I'd be happy to help you find the right product for your needs. What are you looking for?",
      "Our inventory includes the latest electronics from top brands. Is there a specific category you're interested in?",
      "Have you tried our Spin Wheel for discounts? It's a great way to save on your purchase!",
      "I recommend checking our Apple and Samsung sections for the latest smartphones and tablets.",
      "Is there anything specific you'd like to know about our products or services?",
      "Our customer satisfaction is our priority. Let me know how I can assist you further."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const userMessage = { id: Date.now().toString(), text: message, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    // Generate AI response
    setTimeout(() => {
      const response = generateResponse(userMessage.text);
      
      setMessages(prev => [
        ...prev, 
        { id: Date.now().toString(), text: response, isUser: false }
      ]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-20 left-4 w-80 md:w-96 h-96 bg-card border border-border rounded-lg shadow-xl z-50 flex flex-col">
      <div className="p-3 border-b border-border flex justify-between items-center bg-card">
        <div className="flex items-center gap-2">
          <Bot size={18} className="text-primary" />
          <h3 className="font-semibold">AI Assistant</h3>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X size={18} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`${
              msg.isUser 
                ? 'ml-auto bg-primary text-primary-foreground' 
                : 'mr-auto bg-muted'
            } rounded-lg p-3 max-w-[80%] chat-bubble-animate`}
          >
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="mr-auto bg-muted rounded-lg p-3 max-w-[80%] flex space-x-1">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="border-t border-border p-3 flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-background rounded-l-md px-3 py-2 text-sm focus:outline-none border border-input focus:ring-1"
        />
        <button 
          type="submit" 
          disabled={isLoading}
          className="bg-primary text-primary-foreground px-4 rounded-r-md hover:bg-primary/90 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default AIChat;
