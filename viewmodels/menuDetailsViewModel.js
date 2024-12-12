import { useState, useEffect } from 'react';
import { fetchMenuDetails } from '../models/menuModel';

const useMenuDetailsViewModel = (menuId) => {
  const [menuDetails, setMenuDetails] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!menuId) return; // Se il menuId non è valido, non fare nulla

    const loadMenuDetails = async () => {
      try {
        setLoading(true);
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

  return { menuDetails, loading, error };
};

export default useMenuDetailsViewModel;
