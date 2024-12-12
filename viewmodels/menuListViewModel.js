import { useState, useEffect } from 'react';
import { fetchMenus } from '../models/menuModel';

const useMenuViewModel = () => {
  const [menus, setMenus] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const loadMenus = async () => {
      try {
        setLoading(true);
        const data = await fetchMenus(); 
        setMenus(data); 
      } catch (err) {
        setError(err.message || 'Errore durante il caricamento dei menù');
      } finally {
        setLoading(false);
      }
    };

    loadMenus();
  }, []);

  return { menus, loading, error };
};

export default useMenuViewModel;
