
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-indigo-600 flex flex-col items-center justify-center z-50">
      <div className="relative">
        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl animate-bounce">
          <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-teal-400 rounded-full animate-ping"></div>
      </div>
      <h1 className="text-white text-4xl font-bold mt-8 tracking-tight">ShopAI</h1>
      <p className="text-indigo-100 text-lg mt-2 font-medium">Compare Smart. Buy Better.</p>
      
      <div className="mt-12 flex space-x-2">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-pulse [animation-delay:0.2s]"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-pulse [animation-delay:0.4s]"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
