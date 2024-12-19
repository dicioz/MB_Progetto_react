// /viewmodels/profileViewModel.js
import { useState, useEffect } from 'react';
import { saveProfile, getSid, getUserServer } from '../models/profileModel';
import * as SQLite from 'expo-sqlite';
import DBController from '../models/DBController';


const useProfileViewModel = () => {

  let db = null;

  // Effetto per aprire il database al montaggio del componente, apre il database "userDB" e recupera il primo utente
  useEffect(() => {
    const openDatabase = async () => {
      try {
        db = new DBController();
        await db.openDB("usersDB");
        console.log('Database aperto:', db);
        const temp = await db.getFirstUser();
        setUserData((prevData) => ({ // Aggiorna i dati utente con i dati recuperati
          ...prevData,
          ...temp,
        }));
      }
      catch (error) {
        console.error('Errore durante l\'apertura del database:', error);
      }
    };
    openDatabase();
  }, []);

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


  // Funzione per caricare i dati dal database locale
  const loadUserData = async () => {
    try {
      const firstUser = await DBController.getFirstUser();
      if (firstUser) {
        console.log('Dati caricati dal database:', firstUser);
        setUserData({
          nome: firstUser.firstName || 'Mario',
          cognome: firstUser.lastName || 'Rossi',
          intestatario: firstUser.cardFullName || `${firstUser.firstName} ${firstUser.lastName}`,
          numero: firstUser.cardNumber || '1234567812345678',
          mese_scadenza: firstUser.cardExpireMonth || 12,
          anno_scadenza: firstUser.cardExpireYear || 2023,
          cvv: firstUser.cardCVV || '123',
          uid: firstUser.uid || 0,
          lastOid: firstUser.lastOid || 0,
          orderStatus: firstUser.orderStatus || 'ON_DELIVERY',
        });
      }
    } catch (error) {
      console.error('Errore durante il caricamento dei dati utente dal database:', error);
    }
  };

  // Effetto per caricare i dati al montaggio del componente
  useEffect(() => {
    loadUserData();
  }, []);







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
      firstName: newData.nome,
      lastName: newData.cognome,
      cardFullName: "nome_carta_prova",
      cardNumber: newData.numero,
      cardExpireMonth: newData.mese_scadenza,
      cardExpireYear: newData.anno_scadenza,
      cardCVV: newData.cvv,
      sid: getSid()
    }


    /*
    const datasToSave = {
      firstName: "Marco",
      lastName: "Rossi",
      cardFullName: "Mario Rossi",
      cardNumber: "1234567812345678",
      cardExpireMonth: 12,
      cardExpireYear: 0,
      cardCVV: "123",
      uid: 36984,
      lastOid: 0,
      orderStatus: "ON_DELIVERY",
      sid: "FbZSkBgmJx8WVJaNZEQNgdaDeNTQ6GlSeuJaT9XyMDZwjdLU3Qz5kkla424b8m9u"
    }*/

    console.log('Dati da salvare:', datasToSave);

    // Salva i dati sul server
    try {
      await saveProfile(datasToSave);
      const temp = await getUserServer(); // Recupera i dati aggiornati
      console.log('[ProfileViewModel] Dati utente aggiornati:', temp);
      //console.log('Dati utente aggiornati di userData:', userData);
    } catch (error) {
      console.error('Errore durante il salvataggio:', error);
    }

  };

  return {
    userData,
    updateUserInfo,
  };


};

export default useProfileViewModel;
