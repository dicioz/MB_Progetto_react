// /viewmodels/profileViewModel.js
import { useState, useEffect } from 'react';
import {saveProfile, getSid, getUser} from '../models/profileModel';

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

  const updateUserInfo = async (newData) => {
    // Aggiorna i dati utente con i nuovi dati
    console.log('Updating user data with:', newData);
    //aggiorna solamente i dati modificati 
    setUserData((prevData) => ({
      ...prevData,
      ...newData,
    }));

    // dati da inviare al server
    const datasToSave = {
      firtsname: newData.nome,
      lastname: newData.cognome,
      cardFullName: newData.intestatario,
      cardNumber: newData.numero,
      cardExpireMonth: newData.mese_scadenza,
      cardExpireYear: newData.anno_scadenza,
      cardCVV: newData.cvv,
      sid : getSid()
    };

    console.log('Dati da salvare:', datasToSave);
    //salva i dati sul server
    await saveProfile(datasToSave);
    const temp = await getUser();
    console.log('Dati utente aggiornati:', temp);

  };

  return {
    userData,
    updateUserInfo,
  };


};

export default useProfileViewModel;
