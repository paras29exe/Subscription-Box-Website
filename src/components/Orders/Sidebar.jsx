import React, { useState } from 'react';
import { Package, Clock, Check, ShoppingCart } from 'lucide-react';

const Sidebar = ({activeTab, setActiveTab}) => {
  
  // Navigation tabs for the left section
  const navigationTabs = [
    { name: 'My Cart', icon: <ShoppingCart className="mr-2 w-4" /> },
    { name: 'Pending', icon: <Clock className="mr-2 w-4" /> },
    { name: 'Completed', icon: <Check className="mr-2 w-4" /> }
  ];
  
  return (
    <div className="w-full md:w-1/4 h-fit shadow-md rounded-lg p-6 border border-gray-600">
      <h2 className="lg:text-2xl text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
        <Package className="mr-2 text-purple-600" /> My Orders
      </h2>
      
      <div className="space-y-3">
        {navigationTabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`w-full flex items-center font-semibold text-left p-2 lg:p-4 rounded-lg transition-all duration-300 ${
              activeTab === tab.name
                ? 'bg-gradient-to-br from-pink-700 via-purple-600 to-indigo-600 text-white font-medium shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600'
            }`}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;