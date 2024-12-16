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
      
      {/* Sezione in alto con messaggio e bottone */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Il tuo ordine è {orderStatus}
        </Text>
        <Button
          title="Aggiorna Ordine"
          onPress={() => updateOrderStatus('In consegna')}
          style={styles.updateButton}
        />
      </View>

      {/* Mappa */}
      <MapView
        style={styles.map}
        showsUserLocation={true}  // Mostra la posizione dell'utente sulla mappa con un pallino blu
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
  header: {
    flexDirection: 'row', // Posiziona la scritta e il bottone sulla stessa riga
    justifyContent: 'space-between', // Distribuisce lo spazio tra gli elementi
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f2f2f2', // Colore di sfondo della sezione header
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1, // Occupa lo spazio rimanente nella riga
  },
  /*  Ho sostituito con un codice più compatto
  map: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },*/
  map: {
    marginTop: 100,
    ...StyleSheet.absoluteFillObject
    },
});

export default OrderStatus;
