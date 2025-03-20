// components/GenreOrders.jsx
import React from 'react';

const GenreOrders = ({ status, genre }) => {
  // Mock data for orders - in a real app, you'd fetch this from an API
  const mockOrders = {
    Books: [
      { id: 1, name: 'Mystery Book Box', date: '2025-03-15', status: 'Pending', price: '$24.99' },
      { id: 2, name: 'Fiction Favorites', date: '2025-03-10', status: 'Completed', price: '$29.99' },
      { id: 3, name: 'Sci-Fi Collection', date: '2025-03-05', status: 'Pending', price: '$34.99' },
    ],
    Snack: [
      { id: 4, name: 'Gourmet Snack Box', date: '2025-03-12', status: 'Pending', price: '$19.99' },
      { id: 5, name: 'Healthy Treats', date: '2025-03-08', status: 'Completed', price: '$24.99' },
    ],
    Tech: [
      { id: 6, name: 'Gadget Box', date: '2025-03-14', status: 'Pending', price: '$49.99' },
      { id: 7, name: 'Tech Essentials', date: '2025-03-07', status: 'Completed', price: '$39.99' },
    ],
    SkinCare: [
      { id: 8, name: 'Luxury Skincare Box', date: '2025-03-13', status: 'Pending', price: '$44.99' },
      { id: 9, name: 'Natural Beauty Box', date: '2025-03-06', status: 'Completed', price: '$34.99' },
    ],
  };

  // Filter orders by status
  const filteredOrders = mockOrders[genre]?.filter(
    order => status === order.status
  ) || [];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{status} {genre} Orders</h2>
      
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">No {status.toLowerCase()} orders in {genre} category.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg text-gray-800 dark:text-white">{order.name}</h3>
                <span className="text-blue-600 dark:text-blue-400 font-semibold">{order.price}</span>
              </div>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Order Date: {order.date}
              </div>
              <div className="mt-4 flex justify-between">
                <span 
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Pending' 
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' 
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}
                >
                  {order.status}
                </span>
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenreOrders;