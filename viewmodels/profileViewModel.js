// /viewmodels/profileViewModel.js
import { useState, setPage } from 'react';
import { useEffect } from "react";

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
    setUserData((prevData) => ({ ...prevData, ...newData })); //Spread operator (...) per aggiornare i dati
    //...prevData: Copia tutte le proprietà dell'oggetto esistente userData nello stato aggiornato.
    //...newData: Sovrascrive solo le proprietà specificate in newData.

    //Essendo asincrono, non puoi fare un console.log subito dopo, ma devi fare un useEffect
    //console.log('User data updated:', userData);

  };

  // useEffect per monitorare i cambiamenti di `userData`
  useEffect(() => {
    console.log("User data updated:", userData);
  }, [userData]); // Questo si attiva ogni volta che `userData` cambia.



  return {
    userData,
    updateUserInfo,
  };
};

export default useProfileViewModel;
