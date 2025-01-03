import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DBController from '../models/DBController';

const useProfileViewModel = () => {


  // Effetto per aprire il database al montaggio del componente, apre il database "userDB" e recupera il primo utente
/*   useEffect(() => {
    const openDatabase = async () => {
      try {
        db = new DBController();
        db.openDB("usersDB");
        console.log('Database aperto:', db);
        const temp = await db.getFirstUser();
        setUserData((prevData) => ({ // Aggiorna i dati utente con i dati recuperati
          ...prevData,
          ...temp,
        }));
      }
      catch (error) {
        throw error;
      }
    };
    openDatabase();
  }, []); */

  const [userData, setUserData] = useState({
    nome: '',
    cognome: '',
    intestatario: '',
    numero: '',
    mese_scadenza: 0,
    anno_scadenza: 0,
    cvv: '',
    uid: 0,
    lastOid: 0,
    orderStatus: '',
  });


// Funzione per caricare i dati dal database locale
  const loadUserData = async () => {
    let db = null;
    try {
      db = new DBController();
      await db.openDB();
      console.log('Database aperto:', db);
      const firstUser = await db.getFirstUser();
      if (firstUser) {
        console.log('Dati caricati dal database:', firstUser);
        console.log('Nome 1:', firstUser.nome);
        setUserData({
          nome: firstUser.nome || '',
          cognome: firstUser.cognome || '',
          intestatario: firstUser.nome + " " + firstUser.cognome,
          numero: firstUser.numeroCarta || '',
          mese_scadenza: firstUser.meseScadenza || 0,
          anno_scadenza: firstUser.annoScadenza || 0,
          cvv: firstUser.cvv || '',
          uid: firstUser.uid || 0,
          lastOid: firstUser.lastOid || 0,
          orderStatus: firstUser.orderStatus || '',
        });
      }
    } catch (error) {
      console.error('Errore durante il caricamento dei dati utente dal database:', error);
    }
  };

    initializeDatabase();
  }, []);


  const updateUserInfo = async (newData) => {
    setUserData((prevData) => ({
      ...prevData,
      ...newData,
    }));

    console.log('(profileViewModel) sid: ', await getSid());

    // dati da inviare al server
    const datasToSave = {
      firstName: newData.nome,
      lastName: newData.cognome,
      cardFullName: "nome_carta_prova",
      cardNumber: newData.numero,
      cardExpireMonth: newData.mese_scadenza,
      cardExpireYear: newData.anno_scadenza,
      cardCVV: newData.cvv,
      sid: await getSid()
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
