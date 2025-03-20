// components/MyCart.jsx
import React, { useState } from 'react';

const MyCart = () => {
  const [expandedItem, setExpandedItem] = useState(null);
  const [activeGenre, setActiveGenre] = useState('Books');
  
  // List of genres to filter items
  const genreTabs = ['Books', 'Snack', 'Tech', 'SkinCare'];

  const [cartItems, setCartItems] = useState([
    { 
      id: 1, 
      name: 'Random Box', 
      description: 'A surprise selection of items curated across all categories',
      price: 19.99, 
      quantity: 1,
      image: 'https://i1.sndcdn.com/avatars-000349784990-sl1e1v-t240x240.jpg'
    },
    { 
      id: 2, 
      name: 'Semi-Personalized Box', 
      description: 'Curated based on your preferences with items you can review',
      price: 74.99, 
      quantity: 1,
      image: 'https://img.freepik.com/premium-vector/open-3d-gift-box-with-golden-glow-flying-particles-graphic-element-sale-holiday-vector-illustration-eps-10_185386-1647.jpg',
      isPersonalized: true,
      items: {
        Books: [
          { id: 101, name: 'The Great Gatsby', price: 12.99 },
          { id: 102, name: 'Dune', price: 14.99 }
        ],
        Snack: [
          { id: 103, name: 'Organic Trail Mix', price: 8.99 },
          { id: 104, name: 'Chocolate Selection', price: 9.99 }
        ],
        Tech: [
          { id: 105, name: 'Wireless Earbuds', price: 29.99 }
        ],
        SkinCare: [
          { id: 106, name: 'Face Serum', price: 24.99 },
          { id: 107, name: 'Moisturizer', price: 18.99 }
        ]
      }
    },
    { 
      id: 3, 
      name: 'Premium Box', 
      description: 'Our luxury selection featuring premium products and exclusive items',
      price: 99.99, 
      quantity: 1,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPSFBm8pyt9Gervn9H8BLcY7pVbNHY-CFqxQ&s',
      isPremium: true
    }
  ]);

  const removePersonalizedItem = (boxId, itemId) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id === boxId && item.isPersonalized) {
          const updatedItems = {...item.items};
          updatedItems[activeGenre] = updatedItems[activeGenre].filter(subItem => subItem.id !== itemId);
          
          return {
            ...item,
            items: updatedItems
          };
        }
        return item;
      })
    );
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">My Cart</h2>
        
        {/* Genre tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
          {genreTabs.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`py-3 px-6 font-medium text-lg whitespace-nowrap ${
                activeGenre === genre
                  ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
              Browse Boxes
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                  <div className="flex flex-wrap md:flex-nowrap">
                    {/* Product image */}
                    <div className="w-full md:w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mb-4 md:mb-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    
                    {/* Product details */}
                    <div className="flex-1 md:ml-4">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                          {item.name}
                          {item.isPremium && (
                            <span className="ml-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                              PREMIUM
                            </span>
                          )}
                        </h3>
                        <p className="font-semibold text-gray-800 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mt-1">{item.description}</p>
                      
                      {/* Personalized items for the current genre */}
                      {item.isPersonalized && (
                        <div className="mt-2">
                          <button 
                            onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm flex items-center"
                          >
                            {expandedItem === item.id ? 'Hide' : 'View'} {activeGenre} items
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                              {expandedItem === item.id 
                                ? <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                : <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                              }
                            </svg>
                          </button>
                          
                          {expandedItem === item.id && (
                            <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              {item.items[activeGenre] && item.items[activeGenre].length > 0 ? (
                                <ul className="space-y-2">
                                  {item.items[activeGenre].map(subItem => (
                                    <li key={subItem.id} className="flex justify-between items-center">
                                      <span className="font-medium text-gray-800 dark:text-gray-200">{subItem.name}</span>
                                      <div className="flex items-center">
                                        <span className="text-sm text-gray-600 dark:text-gray-300 mr-3">${subItem.price.toFixed(2)}</span>
                                        <button 
                                          onClick={() => removePersonalizedItem(item.id, subItem.id)}
                                          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm"
                                        >
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                          </svg>
                                        </button>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-gray-500 dark:text-gray-400 text-sm">No {activeGenre} items in this box</p>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                      
                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Cart summary */}
            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                <span className="text-gray-800 dark:text-white">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                <span className="text-gray-800 dark:text-white">Free</span>
              </div>
              <div className="flex justify-between font-semibold text-lg mt-4">
                <span className="text-gray-800 dark:text-white">Total</span>
                <span className="text-gray-800 dark:text-white">${totalPrice.toFixed(2)}</span>
              </div>
              
              <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyCart;