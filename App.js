import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuList from './views/menuList';
import MenuDetails from './views/menuDetails';
import OrderStatus from './views/orderStatus';
import Profile from './views/profile';
import modifyProfile from './views/modifyProfile';

// Stack Navigator per il menù
const MenuStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();


const MenuStackScreen = () => (
  //menuStack è il nome dello stack
  //screeen è una singola pagina
  <MenuStack.Navigator>
    <MenuStack.Screen name="MenuList" component={MenuList} options={{ title: 'Menù' }} />
    <MenuStack.Screen name="MenuDetails" component={MenuDetails} options={{ title: 'Dettagli Menù' }} />
  </MenuStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="ProfileMain" component={Profile} options={{ title: 'Profilo' }} />
    <ProfileStack.Screen name="ModifyProfile" component={modifyProfile} options={{ title: 'Modifica Profilo' }} />  
  </ProfileStack.Navigator>
)

// Tab Navigator
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            //Ogni tab mostra un'icona che cambia in base alla schermata (route.name)
            if (route.name === 'Menu') {
              iconName = 'food'; //icona mostrata nella tab derivante dal pacchetto MaterialCommunityIcons
            } else if (route.name === 'Order') {
              iconName = 'truck-delivery';
            } else if (route.name === 'Profile') {
              iconName = 'account';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6200ee', //Colore dell'icona attiva
          tabBarInactiveTintColor: 'gray',//colore dell'icona inattiva
        })}
      >
        {/* Tab.Screen è una singola tab, name è utilizzato in route.name */}
        <Tab.Screen name="Menu" component={MenuStackScreen} options={{ headerShown: false }} />{/*headerShown: false nasconde l'header*/}
        <Tab.Screen name="Order" component={OrderStatus} options={{ title: 'Stato Ordine' }} /*usiamo title per definire il titolo da visualizzare nell'intestazione (barra in alto) della schermata -> da order cambia a Stato.*/ />
        <Tab.Screen name="Profile" component={ProfileStackScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
