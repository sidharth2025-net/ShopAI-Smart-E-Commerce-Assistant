
import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10 mb-12">
        <div className="relative">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-indigo-100 overflow-hidden border-4 border-white shadow-xl">
             <img src="https://picsum.photos/seed/user123/200/200" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <button className="absolute -bottom-2 -right-2 p-3 bg-indigo-600 text-white rounded-2xl shadow-lg border-4 border-white">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/></svg>
          </button>
        </div>
        
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-extrabold dark:text-white mb-2">Alex Thompson</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mb-4">Premium Shopper Since 2024</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="bg-white dark:bg-slate-800 px-6 py-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <span className="block text-2xl font-black text-indigo-600 dark:text-indigo-400">12</span>
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Saved Items</span>
            </div>
            <div className="bg-white dark:bg-slate-800 px-6 py-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <span className="block text-2xl font-black text-teal-600">₹4.2k</span>
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Est. Savings</span>
            </div>
            <div className="bg-white dark:bg-slate-800 px-6 py-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <span className="block text-2xl font-black text-orange-600">5</span>
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Comparisons</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-xl font-bold mb-6 flex items-center dark:text-white">
            <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/></svg>
            Wishlist & Alerts
          </h2>
          <div className="space-y-4">
            {[1,2].map(i => (
              <div key={i} className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center space-x-4 shadow-sm group">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-700 rounded-xl overflow-hidden p-2">
                  <img src={`https://picsum.photos/seed/wish${i}/100/100`} alt="Product" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold dark:text-white line-clamp-1">Logitech MX Master 3S</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">₹8,499</span>
                    <span className="text-[10px] bg-red-100 text-red-600 px-1.5 rounded font-bold">Price Drop!</span>
                  </div>
                </div>
                <button className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </button>
              </div>
            ))}
            <button className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 font-bold hover:bg-slate-50 transition-colors">
              + Browse More Products
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-6 flex items-center dark:text-white">
            <svg className="w-5 h-5 mr-2 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/></svg>
            Recent History
          </h2>
          <div className="space-y-4">
            {['Gaming Mice under 2k', 'Best iPhone 15 deals', 'Comparison: S24 vs S23'].map((item, i) => (
              <div key={i} className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-between shadow-sm">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item}</span>
                <button className="text-indigo-600 text-xs font-bold hover:underline">Re-run</button>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl text-white">
             <h3 className="text-lg font-bold mb-2">Upgrade to Pro</h3>
             <p className="text-indigo-100 text-sm mb-4">Get unlimited comparisons, priority price alerts, and exclusive coupons.</p>
             <button className="px-6 py-2 bg-white text-indigo-600 rounded-xl font-bold text-sm shadow-lg">
                Go Premium
             </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
