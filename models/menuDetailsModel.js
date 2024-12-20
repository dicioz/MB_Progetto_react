import React from "react";
import CommunicationController from "./CommunicationController";
import { getSid } from "./profileModel";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const orderMenu = async (mid, location) => { // mid = menuID
  try {
    const sid = await AsyncStorage.getItem('SID');
    console.log('sid: ', sid);
    if (!sid) {
      throw new Error('SID non trovato');
    }
    const body = { sid: sid, deliveryLocation: { lat: location.latitude, lng: location.longitude } };
    const response = await CommunicationController.genericRequest(`/menu/${mid}/buy`, 'POST', null, body);
    console.log('response: ', response);
    return response;
  } catch (error) {
    console.error('Error during menu request: ', error);
    throw error;
  }
};