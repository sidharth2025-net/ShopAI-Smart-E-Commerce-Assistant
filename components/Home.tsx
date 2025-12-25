
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, PLATFORMS, MOCK_PRODUCTS } from '../constants';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/chat?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const getPlatformLogo = (p: string) => {
    switch (p) {
      case 'Amazon': return <span className="text-orange-500 font-black italic">amazon</span>;
      case 'Flipkart': return <span className="text-blue-500 font-black italic">Flipkart</span>;
      case 'Myntra': return <span className="text-pink-500 font-black italic">Myntra</span>;
      case 'Ajio': return <span className="text-slate-800 dark:text-white font-black italic tracking-tighter">AJIO</span>;
      case 'Meesho': return <span className="text-[#f43397] font-black italic">meesho</span>;
      default: return <span>{p}</span>;
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Hero Section */}
      <div className="relative rounded-[2.5rem] overflow-hidden mb-12 bg-indigo-600 p-10 md:p-20 text-center shadow-2xl border-4 border-white dark:border-slate-800">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-500 rounded-full opacity-50 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-teal-400 rounded-full opacity-30 blur-[100px]"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-white/30 text-white text-xs font-black uppercase tracking-widest">
            <span className="w-2 h-2 bg-teal-400 rounded-full mr-3 animate-pulse"></span>
            Real-time Price Engine Active
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-[1.1] tracking-tight">
            Stop Searching. <br /> <span className="text-teal-300">Start Saving.</span>
          </h1>
          <p className="text-indigo-100 text-lg md:text-2xl mb-12 max-w-3xl mx-auto font-medium opacity-90 leading-relaxed">
            AI-powered comparison across every major Indian storefront. We find the lowest price in milliseconds.
          </p>

          <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative group">
            <input 
              type="text" 
              placeholder="What are you looking for today?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-20 md:h-24 pl-10 pr-40 rounded-3xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-8 focus:ring-indigo-500/20 text-xl shadow-2xl transition-all font-medium"
            />
            <button 
              type="submit"
              className="absolute right-4 top-4 bottom-4 px-8 md:px-12 rounded-2xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              Ask AI
            </button>
          </form>
          <div className="mt-8 flex justify-center space-x-6">
            <button onClick={() => navigate('/chat?q=Best camera phone under 30k')} className="text-indigo-100 text-sm font-bold hover:text-white transition-colors">🔥 Camera Phones</button>
            <button onClick={() => navigate('/chat?q=Best noise cancelling headphones')} className="text-indigo-100 text-sm font-bold hover:text-white transition-colors">🎧 Audio Deals</button>
            <button onClick={() => navigate('/chat?q=Mechanical keyboards for office')} className="text-indigo-100 text-sm font-bold hover:text-white transition-colors">⌨️ Keyboards</button>
          </div>
        </div>
      </div>

      {/* Platform Comparison Matrix Visualization */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-extrabold dark:text-white tracking-tight">Deals Across Platforms</h2>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">Live Monitor</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PRODUCTS.slice(0, 3).map((product, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all">
              <div className="flex items-center space-x-4 mb-6">
                 <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-900 p-2 shrink-0">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain" />
                 </div>
                 <div>
                    <h3 className="font-bold text-slate-800 dark:text-white leading-tight mb-1">{product.name}</h3>
                    <div className="flex items-center">
                      <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 dark:bg-indigo-900/40 px-2 py-0.5 rounded mr-2">Top Result</span>
                      <span className="text-xs text-slate-400 font-bold">₹{product.price.toLocaleString()}</span>
                    </div>
                 </div>
              </div>
              
              <div className="space-y-3">
                 {product.platformPrices?.map((pp, pidx) => (
                   <div key={pidx} className="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors cursor-pointer border border-transparent hover:border-indigo-100 dark:hover:border-indigo-800">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm overflow-hidden text-[8px] font-black uppercase">
                          {getPlatformLogo(pp.platform)}
                        </div>
                        <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{pp.platform}</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-sm font-black text-slate-800 dark:text-white">₹{pp.price.toLocaleString()}</span>
                        <span className="text-[10px] font-bold text-teal-600">Available Now</span>
                      </div>
                   </div>
                 ))}
              </div>
              
              <button 
                onClick={() => navigate(`/compare?q=${encodeURIComponent(product.name)}`)} 
                className="w-full mt-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-2xl text-sm font-bold hover:bg-indigo-600 hover:text-white transition-all"
              >
                Detailed Comparison Matrix
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mb-16">
        <h2 className="text-3xl font-extrabold mb-8 dark:text-white tracking-tight">Shopping Universes</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat.id} 
              onClick={() => navigate(`/chat?q=${cat.name}`)}
              className="group flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all border border-slate-100 dark:border-slate-700"
            >
              <span className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-500 drop-shadow-lg">{cat.icon}</span>
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200 tracking-tight">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Dynamic Comparison Banner */}
      <section className="mb-16 rounded-[2.5rem] bg-slate-900 p-10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/20 to-transparent"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-xl text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-4xl font-black mb-4 leading-tight">Can't Decide? <br /> Ask ShopAI to Compare.</h2>
            <p className="text-slate-400 text-lg mb-8">Get a detailed table comparing up to 5 products at once. AI-generated pros, cons, and a final verdict.</p>
            <div className="flex space-x-4 justify-center md:justify-start">
               <button onClick={() => navigate('/chat')} className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black shadow-xl hover:scale-105 transition-all">Launch Assistant</button>
               <button onClick={() => navigate('/compare')} className="px-8 py-4 bg-slate-800 text-white rounded-2xl font-black border border-slate-700 hover:bg-slate-700 transition-all">Go to Dashboard</button>
            </div>
          </div>
          <div className="w-full md:w-80 h-80 bg-slate-800 rounded-[2rem] border border-slate-700 p-6 shadow-2xl relative">
             <div className="absolute inset-0 bg-indigo-600/10 blur-3xl rounded-full"></div>
             <div className="relative space-y-4">
                <div className="h-12 bg-slate-700 rounded-xl w-3/4"></div>
                <div className="h-12 bg-indigo-600 rounded-xl w-full"></div>
                <div className="h-12 bg-slate-700 rounded-xl w-1/2"></div>
                <div className="h-12 bg-slate-700 rounded-xl w-5/6"></div>
                <div className="mt-8 flex justify-center">
                   <div className="w-16 h-16 bg-teal-500 rounded-full animate-bounce flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}/></svg>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
