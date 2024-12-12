// /viewmodels/profileViewModel.js
import { useState, setPage } from 'react';

const useProfileViewModel = () => {
  const [userData, setUserData] = useState({
    nome: 'Mario',
    cognome: 'Rossi',
    intestatario: 'Mario Rossi',
    numero: '1234567812345678',
    scadenza: '12/23', //da castare ad intero dividendo mese e anno
    cvv: '123',
    uid: 0,
    lastOid: 0,
    orderStatus: 'ON_DELIVERY',
  });

  const updateUserInfo = (newData) => {
    // Aggiorna i dati utente con i nuovi dati
    setUserData({ ...userData, ...newData });

  };

  return {
    userData,
    updateUserInfo,
  };
};

export default useProfileViewModel;
