import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

const useLocationViewModel = () => {
  const [location, setLocation] = useState(null);
  const [showPermissionPopup, setShowPermissionPopup] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [currentView, setCurrentView] = useState('menu'); // Stato per le schermate

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const permissionRequestedBefore = await AsyncStorage.getItem('locationPermissionRequested');
        const status = await Location.getForegroundPermissionsAsync();

        if (status.granted) { //Controlla se i permessi di localizzazione sono già stati concessi dall'utente.
          setPermissionGranted(true);
          setCurrentView('menu'); // Torna al menu principale
          getLocation();
        } else if (permissionRequestedBefore === 'true') { //Controlla se i permessi sono stati richiesti in precedenza ma non concessi
          setShowPermissionPopup(false);
          setCurrentView('enableLocationScreen'); // Mostra schermata per abilitare i permessi
        } else {
          setShowPermissionPopup(true); // Mostra pop-up per la prima richiesta
        }
      } catch (error) {
        console.error('Errore durante il controllo dei permessi:', error);
      }
    };

    checkPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();  
      if (status === 'granted') { //se utente concede i permessi, aggiorna lo stato interno per indicare che i permessi sono stati approvati.
        setPermissionGranted(true);
        setShowPermissionPopup(false);
        setCurrentView('menu'); // Torna al menu principale
        await AsyncStorage.setItem('locationPermissionRequested', 'true');
        getLocation();
      } else {
        setPermissionGranted(false);
        setShowPermissionPopup(false);
        setCurrentView('enableLocationScreen'); // Mostra schermata per abilitare i permessi
        await AsyncStorage.setItem('locationPermissionRequested', 'true');
      }
    } catch (error) {
      console.error('Errore durante la richiesta dei permessi:', error);
    }
  };

  const getLocation = async () => {
    if (permissionGranted) {
      try {
        const { coords } = await Location.getCurrentPositionAsync();  // Ottiene la posizione corrente dell'utente
        setLocation(coords);
      } catch (error) {
        console.error("Errore durante l'ottenimento della posizione:", error);
      }
    }
  };

  return {
    location,
    showPermissionPopup,
    requestPermissions,
    currentView,
    setCurrentView, // Esposto per consentire cambi di schermata
  };
};

export default useLocationViewModel;
