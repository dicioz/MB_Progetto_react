// /views/OrderStatus.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import useOrderViewModel from '../viewmodels/orderViewModel';

const OrderStatus = () => {
  const { orderStatus, updateOrderStatus } = useOrderViewModel();

  return (
    <View>
      <Text>Stato Ordine: {orderStatus}</Text>
      <Button title="Aggiorna Ordine" onPress={() => updateOrderStatus('In consegna')} />
    </View>
  );
};

export default OrderStatus;
