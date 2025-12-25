
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Amazon': return 'bg-[#232f3e]';
      case 'Flipkart': return 'bg-[#2874f0]';
      case 'Myntra': return 'bg-[#ff3f6c]';
      case 'Ajio': return 'bg-[#2c4152]';
      case 'Meesho': return 'bg-[#f43397]';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-700 transition-all flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-slate-50 p-4 shrink-0">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform"
        />
        <div className="absolute top-2 left-2">
          <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase text-white shadow-sm ${getPlatformColor(product.platform)}`}>
            {product.platform}
          </span>
        </div>
        {product.bestValue && (
          <div className="absolute top-2 right-2">
            <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-1 rounded-md uppercase border border-green-200">
              Best Value
            </span>
          </div>
        )}
        <div className="absolute bottom-2 right-2 flex items-center space-x-1 bg-white/90 backdrop-blur px-2 py-1 rounded-full shadow-sm text-xs font-bold">
           <span className="text-orange-500">★</span>
           <span>{product.rating}</span>
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h4 className="font-bold text-sm text-slate-800 dark:text-white line-clamp-2 mb-1 leading-tight h-10">
          {product.name}
        </h4>
        
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-xs text-slate-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        {/* Multi-Platform Price Comparison Strip */}
        {product.platformPrices && product.platformPrices.length > 0 && (
          <div className="mb-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-2">
            <p className="text-[9px] uppercase font-bold text-slate-400 mb-1 px-1">Other Platforms</p>
            <div className="space-y-1">
              {product.platformPrices.map((pp, i) => (
                <div key={i} className="flex items-center justify-between text-[11px] px-1 group/row">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center">
                    <span className={`w-1 h-1 rounded-full mr-1.5 ${getPlatformColor(pp.platform)}`}></span>
                    {pp.platform}
                  </span>
                  <span className={`font-bold ${pp.price === product.price ? 'text-green-600' : 'text-slate-600 dark:text-slate-300'}`}>
                    ₹{pp.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold">AI Selection Score</span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{product.aiScore}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${product.aiScore > 90 ? 'bg-green-500' : product.aiScore > 80 ? 'bg-teal-500' : 'bg-orange-500'}`}
                  style={{ width: `${product.aiScore}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <button className="flex-1 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors shadow-sm">
              View Offer
            </button>
            <button className="px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
