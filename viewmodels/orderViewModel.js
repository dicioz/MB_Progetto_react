import { useState, useEffect } from 'react';
import useLocationViewModel from './locationViewModel';

const useOrderViewModel = () => {
  const [orderStatus, setOrderStatus] = useState('In attesa');
  // Utilizza il ViewModel della localizzazione per ottenere la posizione
  const { location, fetchLocation } = useLocationViewModel();

  useEffect(() => {
    // Verifica se la posizione è disponibile, altrimenti la recupera
    if (!location) {
      fetchLocation();
    }
    // L'array di dipendenze include 'location' e 'fetchLocation'
  }, [location, fetchLocation]);

  const updateOrderStatus = (status) => {
    // Aggiorna lo stato dell'ordine
    setOrderStatus(status);
  };

  return {
    orderStatus,
    updateOrderStatus,
    location,
  };
};

export default useOrderViewModel;
