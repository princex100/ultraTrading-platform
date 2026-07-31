import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import axiosInstance from '../services/axios';
import { useSelector } from 'react-redux';

// --- Sub-components for better JSX readability ---

const ChatHeader = ({ onClose }) => (
  <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
    <div className="flex items-center gap-2">
      <MessageCircle size={20} />
      <h3 className="font-semibold">AI Assistant</h3>
    </div>
    <button onClick={onClose} className="hover:text-gray-200 transition-colors">
      <X size={20} />
    </button>
  </div>
);

const ChatMessage = ({ msg }) => {
  const isUser = msg.sender === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-[80%] p-3 rounded-2xl ${
          isUser 
            ? 'bg-blue-600 text-white rounded-tr-sm' 
            : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-sm'
        }`}
        style={{ whiteSpace: 'pre-wrap' }}
      >
        {msg.text}
      </div>
    </div>
  );
};

const LoadingIndicator = () => (
  <div className="flex justify-start">
    <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-3 rounded-2xl rounded-tl-sm">
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
      </div>
    </div>
  </div>
);

const ChatInput = ({ input, setInput, handleSend, isLoading }) => (
  <div className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
    <form onSubmit={handleSend} className="flex items-center gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
        className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      />
      <button 
        type="submit" 
        disabled={!input.trim() || isLoading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-2 rounded-full transition-colors"
      >
        <Send size={18} />
      </button>
    </form>
  </div>
);

const ChatToggleButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105"
  >
    <MessageCircle size={28} />
  </button>
);


// --- Main Chatbot Component ---

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your AI trading assistant. How can I help you today?", sender: 'ai' }
  ]);
  
  const messagesEndRef = useRef(null);
  
  // Retrieve user to determine if we use the authorized endpoint
  const user = useSelector((state) => state.user.user);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);


  //--------------------------

  const handleSend = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;

    const userMessage = input.trim();
    
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInput('');
    setIsLoading(true);

    try {
      const endpoint = user ? '/chat/authorized-chat' : '/chat';
      const response = await axiosInstance.post(endpoint, { message: userMessage });
      
      if (response.data.success) {
        setMessages(prev => [...prev, { text: response.data.response, sender: 'ai' }]);
      } else {
        setMessages(prev => [...prev, { text: "Sorry, I couldn't process that request.", sender: 'ai' }]);
      }
      
    } catch (error) {
      setMessages(prev => [...prev, { text: "Sorry, I am having trouble connecting to the server.", sender: 'ai' }]);
    } finally {
      setIsLoading(false);
    }
  };


  //-----

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {!isOpen && (
        <ChatToggleButton onClick={() => setIsOpen(true)} />
      )}

      {isOpen && (
        <div className="bg-white dark:bg-gray-800 w-80 sm:w-96 h-[500px] rounded-2xl shadow-2xl flex flex-col border border-gray-200 dark:border-gray-700 overflow-hidden">
          
          <ChatHeader onClose={() => setIsOpen(false)} />

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
            
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} msg={msg} />
            ))}
            
            {isLoading && <LoadingIndicator />}
            
            <div ref={messagesEndRef} />
            
          </div>

          <ChatInput 
            input={input} 
            setInput={setInput} 
            handleSend={handleSend} 
            isLoading={isLoading} 
          />
          
        </div>
      )}
      
    </div>
  );
};

export default Chatbot;
