
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../types';
import { searchProducts, getDetailedComparison } from '../services/geminiService';

const Comparison: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [products, setProducts] = useState<Product[]>([]);
  const [aiVerdict, setAiVerdict] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performComparison = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setAiVerdict('');
    
    try {
      const result = await searchProducts(searchQuery);
      if (result.products.length === 0) {
        setError("I couldn't find products to compare for that request. Try being more specific!");
        setProducts([]);
      } else {
        setProducts(result.products);
        // Get a deeper analysis for the comparison
        const verdict = await getDetailedComparison(result.products);
        setAiVerdict(verdict);
      }
    } catch (err) {
      setError("Failed to fetch comparison data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      performComparison(initialQuery);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query });
    performComparison(query);
  };

  const maxPrice = products.length > 0 ? Math.max(...products.map(p => p.price)) : 1;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold dark:text-white mb-4 tracking-tight">AI Comparison Engine</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg mb-8">
          Ask ShopAI to compare any set of products across Amazon, Flipkart, Myntra, and more.
        </p>
        
        <form onSubmit={handleSearch} className="relative group">
          <input 
            type="text" 
            placeholder="e.g., 'Compare best OLED monitors under 30k' or 'M2 vs M3 MacBook Air'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-16 pl-6 pr-32 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-xl transition-all text-lg dark:text-white"
          />
          <button 
            type="submit"
            disabled={isLoading}
            className="absolute right-2 top-2 bottom-2 px-6 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all flex items-center space-x-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/></svg>
                <span>Analyze</span>
              </>
            )}
          </button>
        </form>
      </div>

      {error && (
        <div className="mb-8 p-6 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl text-red-600 dark:text-red-400 text-center">
          {error}
        </div>
      )}

      {products.length > 0 ? (
        <div className="space-y-8">
          {/* Visual Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">Price Distribution</h3>
              <div className="h-48 flex items-end justify-around pb-6 relative">
                 <div className="absolute left-0 bottom-6 right-0 h-px bg-slate-100 dark:bg-slate-700"></div>
                 {products.map((p, idx) => (
                   <div key={idx} className="flex flex-col items-center group relative w-full">
                      <div className="flex items-end space-x-1 h-32 w-full justify-center">
                        <div 
                          className="w-6 bg-indigo-600 rounded-t-sm transition-all duration-700" 
                          style={{ height: `${(p.price / maxPrice) * 100}%` }}
                        >
                          <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap z-20 pointer-events-none transition-opacity">
                            ₹{p.price.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <span className="mt-2 text-[10px] font-bold text-slate-400 truncate w-16 text-center">{p.platform}</span>
                   </div>
                 ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">AI Confidence Scores</h3>
              <div className="space-y-4">
                {products.map((p, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="dark:text-white truncate pr-4">{p.name}</span>
                      <span className="text-indigo-600 dark:text-indigo-400">{p.aiScore}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${p.aiScore > 90 ? 'bg-green-500' : p.aiScore > 80 ? 'bg-indigo-500' : 'bg-orange-500'}`} 
                        style={{ width: `${p.aiScore}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Verdict Summary */}
          {aiVerdict && (
            <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/></svg>
                  </div>
                  <h2 className="text-xl font-bold uppercase tracking-widest">AI Comparison Insight</h2>
                </div>
                <div className="prose prose-invert max-w-none text-indigo-50 leading-relaxed whitespace-pre-wrap">
                  {aiVerdict}
                </div>
              </div>
            </div>
          )}

          {/* Comparison Table */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-700">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/50">
                    <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-400 w-1/4">Specs & Deals</th>
                    {products.map(p => (
                      <th key={p.id} className="p-6 w-1/3 min-w-[250px]">
                        <div className="flex flex-col items-center">
                          <div className="w-24 h-24 bg-white rounded-2xl p-2 shadow-sm mb-4">
                            <img src={p.imageUrl} alt={p.name} className="w-full h-full object-contain" />
                          </div>
                          <h3 className="text-sm font-bold text-slate-800 dark:text-white text-center line-clamp-2 h-10 leading-tight">{p.name}</h3>
                          <div className="flex items-center mt-2 px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full">
                            <span className="text-[10px] text-slate-500 dark:text-slate-300 font-bold uppercase tracking-tighter">{p.platform}</span>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  <tr>
                    <td className="p-6 font-bold text-slate-500 dark:text-slate-400 text-sm">Best Price</td>
                    {products.map(p => (
                      <td key={p.id} className="p-6">
                        <span className="text-2xl font-black text-slate-900 dark:text-white">₹{p.price.toLocaleString()}</span>
                        {p.originalPrice && (
                          <div className="flex items-center space-x-2">
                             <span className="text-xs text-slate-400 line-through">₹{p.originalPrice.toLocaleString()}</span>
                             <span className="text-[10px] font-bold text-green-500">Save ₹{(p.originalPrice - p.price).toLocaleString()}</span>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-6 font-bold text-slate-500 dark:text-slate-400 text-sm">Platform Matrix</td>
                    {products.map(p => (
                      <td key={p.id} className="p-6">
                        <div className="space-y-2">
                          {p.platformPrices?.map((pp, idx) => (
                            <div key={idx} className="flex items-center justify-between text-[11px] p-2 bg-slate-50 dark:bg-slate-900/40 rounded-lg border border-slate-100 dark:border-slate-800 hover:border-indigo-300 transition-colors">
                              <span className="font-bold text-slate-500 uppercase">{pp.platform}</span>
                              <span className="font-black text-slate-800 dark:text-slate-200">₹{pp.price.toLocaleString()}</span>
                            </div>
                          ))}
                          {!p.platformPrices && <span className="text-slate-400 italic text-xs">Single Store Deal</span>}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-6 font-bold text-slate-500 dark:text-slate-400 text-sm">AI Verdict</td>
                    {products.map(p => (
                      <td key={p.id} className="p-6">
                        {p.bestValue ? (
                          <div className="p-4 rounded-xl bg-teal-500 text-white flex items-start space-x-2">
                            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            <span className="text-sm font-bold">Best Value Choice</span>
                          </div>
                        ) : (
                          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 text-sm">
                            Solid Alternative
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-6 font-bold text-slate-500 dark:text-slate-400 text-sm">Pros</td>
                    {products.map(p => (
                      <td key={p.id} className="p-6">
                        <ul className="space-y-1">
                          {p.pros.map((pro, i) => (
                            <li key={i} className="flex items-start text-xs text-slate-600 dark:text-slate-300">
                              <span className="text-green-500 mr-2">✓</span> {pro}
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-6 font-bold text-slate-500 dark:text-slate-400 text-sm">Cons</td>
                    {products.map(p => (
                      <td key={p.id} className="p-6">
                        <ul className="space-y-1">
                          {p.cons.map((con, i) => (
                            <li key={i} className="flex items-start text-xs text-slate-500 dark:text-slate-400">
                              <span className="text-red-400 mr-2">✕</span> {con}
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : !isLoading && (
        <div className="bg-slate-100 dark:bg-slate-800/50 rounded-[2.5rem] p-12 text-center border-4 border-dashed border-slate-200 dark:border-slate-800">
           <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
             <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/></svg>
           </div>
           <h3 className="text-2xl font-bold dark:text-white mb-2">Ready to Compare?</h3>
           <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-8">
             Enter a query above to see prices, features, and AI-powered value scores side-by-side.
           </p>
           <div className="flex flex-wrap justify-center gap-3">
              {['iPhone 15 vs S23', 'Best 4K TV under 50k', 'Mechanical Keyboards'].map(hint => (
                <button 
                  key={hint} 
                  onClick={() => { setQuery(hint); performComparison(hint); }}
                  className="px-4 py-2 bg-white dark:bg-slate-700 rounded-full text-sm font-bold text-indigo-600 dark:text-indigo-400 shadow-sm hover:shadow-md transition-all"
                >
                  "{hint}"
                </button>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default Comparison;
