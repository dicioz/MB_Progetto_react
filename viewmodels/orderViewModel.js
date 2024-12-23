import { useState, useEffect } from 'react';
import useLocationViewModel from './locationViewModel';
import getOrderStatus from '../models/orderStatusModel';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useOrderViewModel = () => {
  const [orderStatus, setOrderStatus] = useState('In attesa');
  const [sid, setSid] = useState(null);
  const [oid, setOid] = useState(null);

  // Utilizza il ViewModel della localizzazione per ottenere la posizione
  const { location, fetchLocation } = useLocationViewModel();

  useEffect(() => {
    /*     const fetchSidAndOid = async () => {
          const sidValue = await AsyncStorage.getItem("SID");
          const oidValue = await AsyncStorage.getItem("OID");
          setSid(sidValue);
          setOid(oidValue);
        }; 
    
        fetchSidAndOid();*/
    // Verifica se la posizione è disponibile, altrimenti la recupera


    if (!location) {
      fetchLocation();
    }
    // L'array di dipendenze include 'location' e 'fetchLocation'
  }, []);

  const updateOrderStatus = (status) => {
    setOrderStatus(status);
  };

  const getOrderStatusViewModel = async () => {
    /* if (!oid || !sid) {
      console.error('OID o SID mancanti. Impossibile ottenere stato ordine.');
      return null;
    } */
    try {
      const sid = await AsyncStorage.getItem("SID");
      const oid = await AsyncStorage.getItem("OID");
      const status = await getOrderStatus(oid, sid);
      console.log(status);
      return status;
    } catch (error) {
      console.error('Error fetching order status:', error);
      throw error;
    }
  };

  return {
    orderStatus,
    updateOrderStatus,
    location,
    getOrderStatusViewModel,
    sid
  };
};

export default useOrderViewModel;
