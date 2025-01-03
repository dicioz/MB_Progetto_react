//Questo codice implementa a logica per recuperare una lista di menù tramite la funzione fetchMenus e gestire il relativo stato

import { useState, useEffect } from 'react';
import { fetchMenuDetails } from '../models/menuModel';
import { orderMenu } from '../models/menuDetailsModel';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useMenuDetailsViewModel = (menuId) => {
  const [menuDetails, setMenuDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!menuId) return; // Se il menuId non è valido, non fare nulla

    const loadMenuDetails = async () => {
      try {
        setLoading(true); //setLoading aggiorna lo stato della variabile loading ed è utilizzata per rappresentare lo stato di caricamento (loading) durante il fetch dei dati.
        const details = await fetchMenuDetails(menuId);
        setMenuDetails(details);
      } catch (err) {
        setError(err.message || 'Errore durante il caricamento dei dettagli');
      } finally {
        setLoading(false);
      }
    };

    loadMenuDetails();
  }, [menuId]);



  const order = async (mid, location) => {
    console.log(await AsyncStorage.getItem('UID'));
    try {
      if (mid && location) {
        console.log('menuID: ', mid);
        console.log('location order: ', location);
        const response = await orderMenu(mid, location);
        return response;
      }
    } catch (error) {
      console.error('Error during menu order: ', error);
      throw error;
    }
  };


  return {order, menuDetails, loading, error };
};

export default useMenuDetailsViewModel;
