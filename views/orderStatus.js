import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import useOrderViewModel from '../viewmodels/orderViewModel';

const OrderStatus = () => {
  const { orderStatus, updateOrderStatus, location, getOrderStatusViewModel, sid} = useOrderViewModel();
  const [statusResult, setStatusResult] = useState(null);
  // Nuovo useEffect basato su sid e oid
  useEffect(() => {
    let isMounted = true;
    const fetchStatus = async () => {
      try {
        const result = await getOrderStatusViewModel();
        if (isMounted) {
          setStatusResult(result);
          if (result.status === 'COMPLETED') {
            clearInterval(interval);
          }
        }
      } catch (error) {
        console.error('Error fetching order status:', error);
      }
    };
    fetchStatus();

    const interval = setInterval(fetchStatus, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  if (!location) {
    return <Text>Caricamento posizione...</Text>;
  }

  if (!statusResult) {
    return <Text>Caricamento stato ordine...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>Stato Ordine: {statusResult.status}</Text>
      <Button title="Aggiorna Ordine" onPress={() => updateOrderStatus('In consegna')} />
      <MapView
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="La tua posizione"
          description="Posizione attuale"
        />
        <Marker 
          coordinate={{
            latitude: statusResult.currentPosition.lat,
            longitude: statusResult.currentPosition.lng,
          }}
          title="Posizione ordine"
          description="Posizione attuale dell'ordine"
        >
          <Image
            source={require('../assets/drone.webp')}
            style={{ width: 40, height: 40, borderRadius: 5 }}
          />
        </Marker>
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
