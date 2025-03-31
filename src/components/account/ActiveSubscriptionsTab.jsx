// src/account/ActiveSubscriptionsTab.jsx
import { useState } from 'react';
import { Package, Calendar, Pause, Play, ChevronDown, ChevronUp, Edit2 } from 'lucide-react';

const ActiveSubscriptionsTab = () => {
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      type: 'Book Lover\'s Box',
      status: 'active',
      nextDelivery: '2025-04-15',
      plan: 'Monthly',
      price: 24.99,
      isExpanded: false,
      items: [
        { name: 'March Collection', description: 'Fantasy novels and bookmarks' },
      ]
    },
    {
      id: 2,
      type: 'Snack Attack Box',
      status: 'paused',
      nextDelivery: 'Paused',
      plan: 'Quarterly',
      price: 39.99,
      isExpanded: false,
      items: [
        { name: 'Winter Collection', description: 'International snacks from Japan and Korea' },
      ]
    }
  ]);
  
  const toggleSubscriptionStatus = (id) => {
    setSubscriptions(subscriptions.map(sub => {
      if (sub.id === id) {
        const newStatus = sub.status === 'active' ? 'paused' : 'active';
        return {
          ...sub,
          status: newStatus,
          nextDelivery: newStatus === 'paused' ? 'Paused' : '2025-04-30'
        };
      }
      return sub;
    }));
  };
  
  const toggleExpand = (id) => {
    setSubscriptions(subscriptions.map(sub => {
      if (sub.id === id) {
        return { ...sub, isExpanded: !sub.isExpanded };
      }
      return sub;
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Active Subscriptions</h2>
      
      {subscriptions.length === 0 ? (
        <div className="text-center py-8">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">No active subscriptions</h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">Browse our subscription options to get started.</p>
          <div className="mt-6">
            <a
              href="/plans"
              className="inline-flex items-center px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-md transition-colors"
            >
              Browse Subscription Plans
            </a>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {subscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <div className="bg-white dark:bg-gray-900 p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div className="flex items-start">
                    <Package className="h-6 w-6 text-pink-600 dark:text-pink-400 mt-1" />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">{subscription.type}</h3>
                      <div className="mt-1 flex items-center">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          subscription.status === 'active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                        }`}>
                          {subscription.status === 'active' ? 'Active' : 'Paused'}
                        </span>
                        <span className="mx-2 text-gray-500 dark:text-gray-400">•</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{subscription.plan}</span>
                        <span className="mx-2 text-gray-500 dark:text-gray-400">•</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">${subscription.price}/box</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex items-center space-x-4">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" />
                      <span>
                        Next: {subscription.nextDelivery === 'Paused' ? 'Paused' : new Date(subscription.nextDelivery).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => toggleSubscriptionStatus(subscription.id)}
                      className={`p-2 rounded-full ${
                        subscription.status === 'active'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                          : 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                      }`}
                      title={subscription.status === 'active' ? 'Pause subscription' : 'Resume subscription'}
                    >
                      {subscription.status === 'active' ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </button>
                    
                    <button
                      onClick={() => toggleExpand(subscription.id)}
                      className="p-2 text-gray-500 dark:text-gray-400"
                      title="Show details"
                    >
                      {subscription.isExpanded ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              {subscription.isExpanded && (
                <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 p-6">
                  <h4 className="font-medium mb-4">Current Box Contents</h4>
                  
                  <div className="space-y-4">
                    {subscription.items.map((item, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-md">
                        <h5 className="font-medium">{item.name}</h5>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex space-x-4">
                    <a
                      href={`/subscriptions/${subscription.id}/edit`}
                      className="inline-flex items-center px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-md transition-colors"
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Manage Subscription
                    </a>
                    
                    <button
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition-colors"
                    >
                      Skip Next Box
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveSubscriptionsTab;