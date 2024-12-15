import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import useOrderViewModel from '../viewmodels/orderViewModel';

const OrderStatus = () => {
  const { orderStatus, updateOrderStatus, location } = useOrderViewModel();

  if (!location) {
    // Se la posizione non è ancora disponibile, mostra un messaggio di caricamento
    return <Text>Caricamento posizione...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>Stato Ordine: {orderStatus}</Text>
      <Button title="Aggiorna Ordine" onPress={() => updateOrderStatus('In consegna')} />
      <MapView
        style={styles.map}
        region={{
          // Imposta la regione iniziale della mappa sulla posizione corrente
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Marker
          // Posiziona un marker sulla mappa alla posizione corrente
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="La tua posizione"
          description="Posizione attuale"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
  },
  map: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
});

export default OrderStatus;
