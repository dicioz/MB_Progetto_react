// /viewmodels/orderViewModel.js
import { useState } from 'react';

const useOrderViewModel = () => {
  const [orderStatus, setOrderStatus] = useState('In attesa');

  const updateOrderStatus = (status) => {
    setOrderStatus(status);
  };

  return {
    orderStatus,
    updateOrderStatus,
  };
};

export default useOrderViewModel;
