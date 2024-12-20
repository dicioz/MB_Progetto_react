import { useState, useEffect } from 'react';
import useLocationViewModel from './locationViewModel'; 
import getOrderStatus from '../models/orderStatusModel';

const useOrderViewModel = () => {
  const [orderStatus, setOrderStatus] = useState('In attesa');
  const [sid, setSid] = useState(null);
  const [oid, setOid] = useState(null);

  // Utilizza il ViewModel della localizzazione per ottenere la posizione
  const { location, fetchLocation } = useLocationViewModel();

  useEffect(() => {
    const fetchSidAndOid = async () => {
      const sidValue = await getSid();
      const oidValue = await AsyncStorage.getItem('OID');
      setSid(sidValue);
      setOid(oidValue);
    };
    fetchSidAndOid();
  }, []);

  useEffect(() => {
    // Verifica se la posizione è disponibile, altrimenti la recupera
    if (!location) {
      fetchLocation();
    }
    // L'array di dipendenze include 'location' e 'fetchLocation'
  }, [location, fetchLocation]);

  const updateOrderStatus = (status) => {
    setOrderStatus(status);
  };

  const getOrderStatusViewModel = async () => {
    try {
      const status = await getOrderStatus(oid, sid);
      console.log(status);
    } catch (error) {
      console.error('Error fetching order status:', error);
      throw error;
    }
  };

  return {
    orderStatus,
    updateOrderStatus,
    location,
    getOrderStatusViewModel
  };
};

export default useOrderViewModel;
