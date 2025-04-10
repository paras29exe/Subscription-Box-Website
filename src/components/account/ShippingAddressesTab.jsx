// src/account/ShippingAddressesTab.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const ShippingAddressesTab = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Home',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'United States',
      isDefault: true,
    },
    {
      id: 2,
      name: 'Work',
      street: '456 Office Park',
      city: 'Boston',
      state: 'MA',
      zip: '02108',
      country: 'United States',
      isDefault: false,
    },
  ]);
  
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      isDefault: false,
    }
  });
  
  const startAddingAddress = () => {
    reset();
    setIsAddingAddress(true);
    setEditingAddressId(null);
  };
  
  const startEditingAddress = (address) => {
    // Populate form with address data
    Object.entries(address).forEach(([key, value]) => {
      setValue(key, value);
    });
    setEditingAddressId(address.id);
    setIsAddingAddress(false);
  };
  
  const cancelEdit = () => {
    setIsAddingAddress(false);
    setEditingAddressId(null);
    reset();
  };
  
  const onSubmit = (data) => {
    let newId = editingAddressId || Date.now();
    let updatedAddresses;
  
    if (editingAddressId) {
      // Update existing address
      updatedAddresses = addresses.map((addr) =>
        addr.id === editingAddressId ? { ...data, id: editingAddressId } : addr
      );
    } else {
      // Add new address
      const newAddress = { ...data, id: newId };
      updatedAddresses = [...addresses, newAddress];
    }
  
    // If new default address is set, update other addresses
    if (data.isDefault) {
      updatedAddresses = updatedAddresses.map(addr => ({
        ...addr,
        isDefault: addr.id === newId, // Ensure correct ID match
      }));
    }
  
    setAddresses(updatedAddresses);
    cancelEdit(); // Reset form and editing state
  };
  
  
  const deleteAddress = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };
  
  const setDefaultAddress = (id) => {
    setAddresses(addresses.map((addr) => ({
      ...addr,
      isDefault: addr.id === id,
    })));
  };

  return (
    <div>
      <div className="justify-between items-center">
        <h2 className="text-2xl font-semibold">Shipping Addresses</h2>
        
        <button
          onClick={startAddingAddress}
          className="flex items-center ml-auto p-2 text-blue-700 font-medium rounded-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Address
        </button>
      </div>
      
      {(isAddingAddress || editingAddressId) && (
        <div className="bg-gray-50 dark:bg-gray-900 md:p-6 rounded-lg mb-6">
          <h3 className="text-xl font-medium mb-4">
            {editingAddressId ? 'Edit Address' : 'Add New Address'}
          </h3>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Address Name
                </label>
                <input
                  id="name"
                  {...register('name', { required: true })}
                  className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="e.g. Home, Work"
                />
                {errors.name && <span className="text-red-500 text-xs">Required</span>}
              </div>
              
              <div>
                <label htmlFor="street" className="block text-sm font-medium mb-1">
                  Street Address
                </label>
                <input
                  id="street"
                  {...register('street', { required: true })}
                  className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-pink-500 focus:border-pink-500"
                />
                {errors.street && <span className="text-red-500 text-xs">Required</span>}
              </div>
              
              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-1">
                  City
                </label>
                <input
                  id="city"
                  {...register('city', { required: true })}
                  className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-pink-500 focus:border-pink-500"
                />
                {errors.city && <span className="text-red-500 text-xs">Required</span>}
              </div>
              
              <div>
                <label htmlFor="state" className="block text-sm font-medium mb-1">
                  State / Province
                </label>
                <input
                  id="state"
                  {...register('state', { required: true })}
                  className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-pink-500 focus:border-pink-500"
                />
                {errors.state && <span className="text-red-500 text-xs">Required</span>}
              </div>
              
              <div>
                <label htmlFor="zip" className="block text-sm font-medium mb-1">
                  ZIP / Postal Code
                </label>
                <input
                  id="zip"
                  {...register('zip', { required: true })}
                  className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-pink-500 focus:border-pink-500"
                />
                {errors.zip && <span className="text-red-500 text-xs">Required</span>}
              </div>
              
              <div>
                <label htmlFor="country" className="block text-sm font-medium mb-1">
                  Country
                </label>
                <input
                  id="country"
                  {...register('country', { required: true })}
                  className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-pink-500 focus:border-pink-500"
                />
                {errors.country && <span className="text-red-500 text-xs">Required</span>}
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isDefault"
                {...register('isDefault')}
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
              />
              <label htmlFor="isDefault" className="ml-2 block text-sm">
                Set as default shipping address
              </label>
            </div>
            
            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-md transition-colors"
              >
                {editingAddressId ? 'Update Address' : 'Save Address'}
              </button>
              
              <button
                type="button"
                onClick={cancelEdit}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="space-y-4">
        {addresses.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No addresses saved yet.</p>
        ) : (
          addresses.map((address) => (
            <div
              key={address.id}
              className="border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <div className="flex justify-between mb-2">
                <div className="flex items-center">
                  <h4 className="text-lg font-medium">{address.name}</h4>
                  {address.isDefault && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEditingAddress(address)}
                    className="p-1 text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => deleteAddress(address.id)}
                    className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300">{address.street}</p>
              <p className="text-gray-700 dark:text-gray-300">
                {address.city}, {address.state} {address.zip}
              </p>
              <p className="text-gray-700 dark:text-gray-300">{address.country}</p>
              
              {!address.isDefault && (
                <button
                  onClick={() => setDefaultAddress(address.id)}
                  className="mt-2 text-sm text-pink-600 dark:text-pink-400 hover:underline"
                >
                  Set as Default
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShippingAddressesTab;