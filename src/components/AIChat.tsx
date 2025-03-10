
import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const userMessage = { id: Date.now().toString(), text: message, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    // Simulate AI response (in a real app, you would call an API here)
    setTimeout(() => {
      const responses = [
        "I can help you find the right product for your needs. What are you looking for?",
        "We have great discounts today! Have you tried the spin wheel?",
        "Our Apple products are very popular. Would you like to see some options?",
        "I recommend checking our PlayStation and PC Games section for the latest titles.",
        "Is there anything specific you'd like to know about our products?",
        "We offer free shipping on orders over $100. Let me know if you have any questions!"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [
        ...prev, 
        { id: Date.now().toString(), text: randomResponse, isUser: false }
      ]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-20 left-4 w-80 md:w-96 h-96 bg-card border border-border rounded-lg shadow-xl z-50 flex flex-col">
      <div className="p-3 border-b border-border flex justify-between items-center bg-card">
        <h3 className="font-semibold">AI Assistant</h3>
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
            } rounded-lg p-3 max-w-[80%]`}
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
