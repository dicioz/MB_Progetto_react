// /viewmodels/profileViewModel.js
import { useState, setPage } from 'react';

const useProfileViewModel = () => {
  const [userData, setUserData] = useState({
    nome: 'Mario',
    cognome: 'Rossi',
    intestatario: 'Mario Rossi',
    numero: '1234567812345678',
    mese_scadenza: '12',
    anno_scadenza: '2023',
    cvv: '123',
    uid: 0,
    lastOid: 0,
    orderStatus: 'ON_DELIVERY',
  });

  const updateUserInfo = (newData) => {
    // Aggiorna i dati utente con i nuovi dati
    console.log('Updating user data with:', newData);
    //aggiorna solamente i dati modificati 
    setUserData((prevData) => ({ ...prevData, ...newData }));
    console.log('User data updated:', userData);

  };

  return {
    userData,
    updateUserInfo,
  };
};

export default useProfileViewModel;
