// src/account/PaymentHistoryTab.jsx
import { useState } from 'react';
import { Download, CreditCard, Eye } from 'lucide-react';

const PaymentHistoryTab = () => {
  const [payments, setPayments] = useState([
    {
      id: 'INV-2025-00123',
      date: '2025-03-15',
      amount: 24.99,
      status: 'paid',
      method: 'Visa ending in 4242',
      items: [
        { name: 'Book Lover\'s Box - March 2025', price: 24.99 }
      ]
    },
    {
      id: 'INV-2025-00101',
      date: '2025-02-15',
      amount: 24.99,
      status: 'paid',
      method: 'Visa ending in 4242',
      items: [
        { name: 'Book Lover\'s Box - February 2025', price: 24.99 }
      ]
    },
    {
      id: 'INV-2025-00054',
      date: '2025-01-15',
      amount: 64.98,
      status: 'paid',
      method: 'Visa ending in 4242',
      items: [
        { name: 'Book Lover\'s Box - January 2025', price: 24.99 },
        { name: 'Snack Attack Box - Winter 2025', price: 39.99 }
      ]
    }
  ]);
  
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'card',
      brand: 'Visa',
      last4: '4242',
      expMonth: 12,
      expYear: 2026,
      isDefault: true
    }
  ]);
  
  const [activeTab, setActiveTab] = useState('transactions');
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return (
          <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
            Paid
          </span>
        );
      case 'pending':
        return (
          <span className="px-2 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
            Pending
          </span>
        );
      case 'failed':
        return (
          <span className="px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100">
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'transactions'
              ? 'text-pink-600 dark:text-pink-400 border-b-2 border-pink-600 dark:border-pink-400'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          }`}
          onClick={() => setActiveTab('transactions')}
        >
          Transaction History
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'methods'
              ? 'text-pink-600 dark:text-pink-400 border-b-2 border-pink-600 dark:border-pink-400'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          }`}
          onClick={() => setActiveTab('methods')}
        >
          Payment Methods
        </button>
      </div>
      
      {activeTab === 'transactions' && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Transaction History</h2>
          
          {payments.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No payment history available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Invoice
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {payments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {payment.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {formatDate(payment.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        ${payment.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(payment.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {payment.method}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            className="text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300"
                            title="View Invoice"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
                            title="Download Invoice"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'methods' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Payment Methods</h2>
            
            <button
              className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-md transition-colors"
            >
              Add Payment Method
            </button>
          </div>
          
          {paymentMethods.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No payment methods saved.</p>
          ) : (
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <CreditCard className="h-8 w-8 text-gray-600 dark:text-gray-300" />
                      <div className="ml-4">
                        <div className="flex items-center">
                          <h4 className="text-lg font-medium">{method.brand}</h4>
                          {method.isDefault && (
                            <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          •••• {method.last4} | Expires {method.expMonth}/{method.expYear}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
                      >
                        Edit
                      </button>
                      {!method.isDefault && (
                        <button
                          className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
                        >
                          Set Default
                        </button>
                      )}
                      <button
                        className="px-3 py-1 text-sm text-red-600 dark:text-red-400 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900 border border-red-200 dark:border-red-800 rounded transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentHistoryTab;