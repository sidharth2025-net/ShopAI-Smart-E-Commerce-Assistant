
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Message, Product } from '../types';
import { searchProducts } from '../services/geminiService';
import ProductCard from './ProductCard';

const AIChat: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get('q');
  
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: "Hi! I'm your ShopAI assistant. What are you looking to buy today? I can help you find the best prices across Amazon, Flipkart, Meesho, and more!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialQuery) {
      handleSendMessage(initialQuery);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: Message = { role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const result = await searchProducts(text);
      const assistantMsg: Message = {
        role: 'assistant',
        content: result.answer,
        products: result.products,
        timestamp: new Date(),
        suggestions: ['Show cheaper options', 'Compare top two', 'Check ratings']
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
      {/* Chat Header */}
      <div className="px-6 py-4 bg-indigo-600 flex items-center justify-between text-white">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold">ShopAI Assistant</h3>
            <p className="text-[10px] text-indigo-100 uppercase tracking-widest font-bold">Online & Thinking</p>
          </div>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-4 rounded-2xl ${
                msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-slate-100 dark:bg-slate-800 dark:text-white rounded-tl-none'
              }`}>
                <p className="text-sm md:text-base whitespace-pre-wrap">{msg.content}</p>
              </div>
              
              {msg.products && msg.products.length > 0 && (
                <div className="mt-4 flex space-x-4 overflow-x-auto pb-4 snap-x">
                  {msg.products.map(product => (
                    <div key={product.id} className="min-w-[280px] md:min-w-[320px] snap-center">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              )}

              {msg.suggestions && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {msg.suggestions.map(s => (
                    <button 
                      key={s}
                      onClick={() => handleSendMessage(s)}
                      className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:border-indigo-500 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              
              <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tight">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none flex space-x-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
          className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition-all"
        >
          <button type="button" className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
          <input 
            type="text" 
            placeholder="Ask anything (e.g., 'Cheapest monitor on Amazon')"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-transparent focus:outline-none dark:text-white"
          />
          <button 
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className={`p-3 rounded-xl flex items-center justify-center transition-all ${
              inputValue.trim() && !isLoading ? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700' : 'bg-slate-100 text-slate-400'
            }`}
          >
            <svg className="w-5 h-5 rotate-90" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIChat;
