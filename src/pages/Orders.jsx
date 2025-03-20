// Orders.jsx
import React, { useState } from 'react';
import PendingOrders from '../components/Orders/PendingOrders';
import CompletedOrders from '../components/Orders/CompletedOrders';
import MyCart from '../components/Orders/MyCart';
import GenreOrders from '../components/Orders/GenreOrders';
import Sidebar from '../components/Orders/SideBar';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('My Cart');
  const [activeGenre, setActiveGenre] = useState('Books');


  // Genre tabs for the right section
  const genreTabs = ['Books', 'Snack', 'Tech', 'SkinCare'];

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Section - Navigation Tabs */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Right Section - Content Area */}
      <div className="w-full md:w-3/4 p-6">
        {/* Show different content based on active tab */}
        {activeTab === 'My Cart' ? (
          <MyCart />
        ) : (
          <div>
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
              {genreTabs.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setActiveGenre(genre)}
                  className={`py-3 px-6 font-medium text-lg whitespace-nowrap ${activeGenre === genre
                      ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                >
                  {genre}
                </button>
              ))}
            </div>

            {/* Display orders based on active tab and genre */}
            <GenreOrders
              status={activeTab}
              genre={activeGenre}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;