// components/MyCart.jsx
import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/cartContext';
import { NavLink } from 'react-router-dom';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { toast } from 'react-toastify';

const MyCart = ({ }) => {
  const [expandedItem, setExpandedItem] = useState(false);
  const { cart, setCart, removeItem, activeGenre, setActiveGenre } = useCart()


  // List of genres to filter items
  const genreTabs = ['Books', 'Snacks', 'Tech', 'SkinCare'];

  const [boxes, setBoxes] = useState([
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
      isPersonalized: true
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

  const totalPrice = boxes.reduce((sum, box) => sum + box.price , 0);

  const handleRazorpayPayment = () => {
    const options = {
      key: "rzp_test_E7Vb1pOzmgqoWo", // Replace with your Razorpay Key ID
      amount: 19497, // Amount in paise = ₹500
      currency: "INR",
      name: "GetMeABox",
      description: "Test Transaction",
      image: "/favico.png", // Optional: your site logo
      handler: function (response) {
        toast.success(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "Test User",
        email: "testuser@example.com",
        contact: "9999999999",
      },
      notes: {
        subscription_type: "monthly",
      },
      theme: {
        color: "#0f172a", // Tailwind dark slate
      },
    };
  
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  
  return (
    <div className=" rounded-lg border border-gray-600 shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">My Cart</h2>

        {/* Genre tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 scrollbar-hide overflow-x-auto">
          {genreTabs.map((genre, index) => (
            <button
              key={genre}
              disabled={index > 0}
              onClick={() => setActiveGenre(genre.toLowerCase())}
              className={`py-3 md:px-6 px-3 font-medium text-lg disabled:cursor-not-allowed whitespace-nowrap ${activeGenre === genre.toLowerCase()
                ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
            >
              {genre}
              {(index > 0) && <span className="ml-2 text-sm">🔒</span>}
            </button>
          ))}
        </div>

        {boxes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
              Browse Boxes
            </button>
          </div>
        ) : (
          <>

            {/* boxes in the cart */}
            <div className="space-y-6">

              {boxes.map((box) => (
                <div key={box.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                  <div className="flex gap-x-4 flex-wrap md:flex-nowrap">
                    {/* Product image */}
                    <div className="w-[min(25%,120px)] md:w-15% bg-gray-100 dark:bg-gray-700 h-fit rounded-lg overflow-hidden mb-4 md:mb-0">
                      <img src={box.image} alt={box.name} className="w-full aspect-square object-cover" />
                    </div>

                    {/* Product details */}
                    <div className="flex-1 md:ml-4">
                      <div className="flex items-center gap-x-2 justify-between">
                        <h3 className=" font-bold text-gray-800 dark:text-white">
                          {box.name}

                          {box.isPremium && (
                            <p className=" bg-yellow-500 font-bold text-white text-xxs px-1.5 py-0.5 text-center rounded-full">
                              PREMIUM
                            </p>
                          )}
                        </h3>
                        <p className="font-semibold text-xs text-gray-800 dark:text-white">${(box.price * box.quantity).toFixed(2)}</p>
                      </div>

                      <p className="text-gray-600 text-xs dark:text-gray-300 mt-1">{box.description}</p>

                      {/* Personalized items for the current genre */}
                      {box.isPersonalized && (
                         /* <div className="mt-2">
                          <button
                            onClick={() => setExpandedItem(prev => !prev)}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm flex items-center"
                          >
                            {expandedItem ? 'Hide' : 'View'} {activeGenre} items
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                              {expandedItem
                                ? <ChevronUp />
                                : <ChevronDown />
                              }
                            </svg>
                          </button>

                          {expandedItem && ( */

                            <div className="mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg">

                              {
                                cart[activeGenre] && cart[activeGenre].length > 0 ? (
                                  <ul className="space-y-2">
                                    {
                                      cart[activeGenre].map(subItem => (

                                        <li key={subItem.id} className="flex justify-between items-center">

                                          <div className='flex gap-x-4 items-center'>
                                            <div className='w-10 rounded-md '>
                                              <img src={subItem.image} alt="Cover" className='w-full aspect-square rounded-md object-cover' />
                                            </div>
                                            <span className="font-medium text-sm text-gray-800 dark:text-gray-200">
                                              {subItem.name} <span className='text-sm ml-4'> x 1</span>
                                            </span>
                                          </div>

                                          <div className="flex items-center">
                                            <span className="text-sm text-gray-600 dark:text-gray-300 mr-3">${subItem.price.toFixed(2)}</span>
                                            <button
                                              onClick={() => removeItem(subItem.id, activeGenre)}
                                              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm"
                                            >
                                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                              </svg>
                                            </button>
                                          </div>
                                        </li>
                                      ))
                                    }
                                  </ul>
                                ) : (
                                  <p className="text-gray-500 dark:text-gray-400 text-sm">No {activeGenre} in this box</p>
                                )}

                              {/* add more items navlink element which redirect to /customise page */}
                              <NavLink to="/customize"
                                className="text-blue-600 text-xs flex items-center gap-x-2 mt-4 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 ">
                                <Plus className=' w-4' /> Add more items to this box
                              </NavLink>

                            </div>

                        // )}
                        // </div>
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

              <button onClick={handleRazorpayPayment} className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      
    </div>
  );
};

export default MyCart;