
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Message, Product, Platform } from './types';
import Home from './components/Home';
import AIChat from './components/AIChat';
import Comparison from './components/Comparison';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import SplashScreen from './components/SplashScreen';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <Navbar 
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode} 
          cartCount={cartCount} 
        />
        <main className="pt-20 pb-10 container mx-auto px-4 max-w-7xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<AIChat />} />
            <Route path="/compare" element={<Comparison />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
