import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DBController from '../models/DBController';

const useProfileViewModel = () => {
  const db = new DBController(); // Istanza condivisa
  const [userData, setUserData] = useState({
    nome: 'Mario',
    cognome: 'Rossi',
    intestatario: 'Mario Rossi',
    numero: '1234567812345678',
    mese_scadenza: 12,
    anno_scadenza: 2023,
    cvv: '123',
    uid: 0,
    lastOid: 0,
    orderStatus: 'ON_DELIVERY',
  });

  // Effetto per controllare l'inizializzazione del database
  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const isDBInitialized = await AsyncStorage.getItem('isDBInitialized'); // Controlla il flag

        if (!isDBInitialized) {
          console.log('[profileViewModel] Creazione database per la prima volta...');
          await db.openDB(); // Crea il database
          await AsyncStorage.setItem('isDBInitialized', 'true'); // Salva il flag
        } else {
          console.log('[profileViewModel] Database già inizializzato.');
        }

        // Recupera i dati utente dal database
        const user = await db.getFirstUser();
        if (user) {
          console.log('[profileViewModel] Primo utente recuperato:', user);
          setUserData((prevData) => ({
            ...prevData,
            ...user,
          }));
        }
      } catch (error) {
        console.error('Errore durante l\'inizializzazione del database:', error);
        console.log('[profileViewModel] database: ', db);
      }
    };

    initializeDatabase();
  }, []);

  const updateUserInfo = async (newData) => {
    setUserData((prevData) => ({
      ...prevData,
      ...newData,
    }));

    const datasToSave = {
      firstName: newData.nome,
      lastName: newData.cognome,
      cardFullName: "nome_carta_prova",
      cardNumber: newData.numero,
      cardExpireMonth: newData.mese_scadenza,
      cardExpireYear: newData.anno_scadenza,
      cardCVV: newData.cvv,
      sid: getSid(),
    };

    try {
      await saveProfile(datasToSave);
      const temp = await getUserServer();
      console.log('[ProfileViewModel] Dati utente aggiornati GET:', temp);
      console.log('[ProfileViewModel] Dati utente salvati PUT:', datasToSave);
    } catch (error) {
      console.error('Errore durante il salvataggio:', error);
    }
  };

  useEffect(() => {
    console.log("User data updated:", userData);
  }, [userData]);

  return {
    userData,
    updateUserInfo,
  };
};

export default useProfileViewModel;
