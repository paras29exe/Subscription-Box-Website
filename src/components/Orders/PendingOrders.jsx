// components/PendingOrders.jsx
import React from 'react';

const PendingOrders = () => {
  // This component is actually not needed since we're handling
  // the display logic in the GenreOrders component
  // It's included here for completeness
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Pending Orders</h2>
      <p>Please select a genre to view pending orders.</p>
    </div>
  );
};

export default PendingOrders;
