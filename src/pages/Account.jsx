import { useState } from 'react';
import ProfileTab from '../components/account/ProfileTab';
import ShippingAddressesTab from '../components/account/ShippingAddressesTab';
import ActiveSubscriptionsTab from '../components/account/ActiveSubscriptionsTab';
import PaymentHistoryTab from '../components/account/PaymentHistoryTab';
import AccountSidebar from '../components/account/AccountSidebar';

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'shipping':
        return <ShippingAddressesTab />;
      case 'subscriptions':
        return <ActiveSubscriptionsTab />;
      case 'payments':
        return <PaymentHistoryTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className="flex items-center justify-center  bg-opacity-90 dark:bg-opacity-80 backdrop-blur-md">
      <div className="container max-lg:max-w-none p-6">        
        <div className="flex flex-col md:flex-row md:gap-2 md2:gap-6 gap-4">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <AccountSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          
          {/* Main Content */}
          <div className="w-full md:w-3/4 md:backdrop-blur-lg rounded-xl md:p-6 md:shadow-lg md:border md:border-black/30 md:dark:border-gray-700">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
