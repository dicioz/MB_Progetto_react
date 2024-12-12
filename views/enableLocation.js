// screens/EnableLocationScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EnableLocationScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Per utilizzare questa funzionalità, è necessario abilitare i permessi di localizzazione nelle impostazioni del dispositivo.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
});

export default EnableLocationScreen;
