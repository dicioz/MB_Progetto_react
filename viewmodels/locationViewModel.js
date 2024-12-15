// Importa le funzioni necessarie da React e dal modello di localizzazione
import { useState, useEffect } from 'react';
import {
  getPermissionsStatus,
  requestLocationPermissions,
  getCurrentLocation,
  setPermissionRequested,
  getPermissionRequestedBefore,
} from '../models/locationModel';

// Hook personalizzato per gestire la localizzazione
const useLocationViewModel = () => {
  // Definizione degli stati utilizzati nel componente
  const [location, setLocation] = useState(null);
  const [showPermissionPopup, setShowPermissionPopup] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [currentView, setCurrentView] = useState('menu');

  // Effetto eseguito al montaggio del componente per verificare i permessi di localizzazione
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        // Controlla se i permessi sono stati richiesti in precedenza
        const permissionRequestedBefore = await getPermissionRequestedBefore();
        const status = await getPermissionsStatus();

        if (status.granted) {
          // Se i permessi sono concessi, imposta lo stato appropriato e ottieni la posizione corrente
          setPermissionGranted(true);
          setCurrentView('menu');
          fetchLocation();
        } else if (permissionRequestedBefore === 'true') {
          // Se i permessi sono stati negati in precedenza, mostra la schermata per abilitare la localizzazione
          setShowPermissionPopup(false);
          setCurrentView('enableLocationScreen');
        } else {
          // Se i permessi non sono stati richiesti, mostra il popup di richiesta permessi
          setShowPermissionPopup(true);
        }
      } catch (error) {
        // Gestione degli errori
        console.error('Errore durante il controllo dei permessi:', error);
      }
    };

    checkPermissions();
  }, []);

  // Funzione per richiedere i permessi di localizzazione all'utente
  const requestPermissions = async () => {
    try {
      // Richiede i permessi
      const { status } = await requestLocationPermissions();
      if (status === 'granted') {
        // Se i permessi sono concessi, aggiorna lo stato e ottieni la posizione
        setPermissionGranted(true);
        setShowPermissionPopup(false);
        setCurrentView('menu');
        await setPermissionRequested();
        fetchLocation();
      } else {
        // Se i permessi sono negati, aggiorna lo stato e mostra la schermata per abilitare la localizzazione
        setPermissionGranted(false);
        setShowPermissionPopup(false);
        setCurrentView('enableLocationScreen');
        await setPermissionRequested();
      }
    } catch (error) {
      // Gestione degli errori
      console.error('Errore durante la richiesta dei permessi:', error);
    }
  };

  // Funzione per ottenere la posizione attuale dell'utente
  const fetchLocation = async () => {
    if (permissionGranted) {
      try {
        // Ottiene le coordinate attuali dell'utente
        const { coords } = await getCurrentLocation();
        setLocation(coords);
      } catch (error) {
        // Gestione degli errori
        console.error('Errore durante l\'ottenimento della posizione:', error);
      }
    }
  };

  // Ritorna gli stati e le funzioni necessari ai componenti
  return {
    location,
    showPermissionPopup,
    requestPermissions,
    currentView,
    setCurrentView,
  };
};

export default useLocationViewModel;
