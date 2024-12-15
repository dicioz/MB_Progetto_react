import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

// Funzione per ottenere i permessi di localizzazione
export const getPermissionsStatus = async () => {
  return Location.getForegroundPermissionsAsync();
};

// Funzione per richiedere i permessi di localizzazione
export const requestLocationPermissions = async () => {
  return Location.requestForegroundPermissionsAsync();
};

// Funzione per ottenere la posizione corrente
export const getCurrentLocation = async () => {
  return Location.getCurrentPositionAsync();
};

// Funzione per salvare lo stato di richiesta dei permessi
export const setPermissionRequested = async () => {
  await AsyncStorage.setItem('locationPermissionRequested', 'true');
};

// Funzione per verificare se i permessi sono stati richiesti in precedenza
export const getPermissionRequestedBefore = async () => {
  return AsyncStorage.getItem('locationPermissionRequested');
};
