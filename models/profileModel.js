import React from "react";
import CommunicationController from "./CommunicationController";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

let sid = null;
let uid = null;

// Chiamata GET per ottenere l'utente
export const getUser = async () => {
  try {
    if (!uid) {
      throw new Error("UID non è stato impostato.");
    }
    const endpoint = `/user/${uid}`;
    const verb = "GET";
    const queryParams = { sid: sid };
    const bodyParams = {}; // GET non dovrebbe avere bodyParams
    return await CommunicationController.genericRequest(endpoint, verb, queryParams, bodyParams);
  } catch (error) {
    console.error("[getUser] Errore durante il recupero dell'utente:", error);
    throw error;
  }
};

// Funzione per ottenere il SID
export const getSid = () => {
  return sid;
};

// Chiamata PUT per salvare il profilo
export const saveProfile = async (profile) => {
  if (!sid || !uid) {
    console.log("SID: ", sid, "UID: ", uid);
    throw new Error("SID o UID non sono impostati.");
  }
  try {
    const endpoint = "/user/" + uid;
    const verb = "PUT";
    const queryParams = {};
    console.log("Profilo da salvare: ", profile);
    await CommunicationController.genericRequest(endpoint, verb, queryParams, profile);
  } catch (error) {
    console.error("[saveProfile] Errore durante il salvataggio del profilo:", error);
    throw error;
  }
};

// Chiamata POST per la registrazione
export const register = async () => {
  const endpoint = "/user";
  const verb = "POST";
  const queryParams = {};
  const bodyParams = {};

  try {
    const storedSID = await AsyncStorage.getItem("SID");
    const storedUID = await AsyncStorage.getItem("UID");

    if (storedSID && storedUID) {
      console.log("SID e UID già presenti nello storage.");
      sid = storedSID;
      uid = storedUID;
      return;
    }

    console.log("Registrazione in corso...");
    const response = await CommunicationController.genericRequest(endpoint, verb, queryParams, bodyParams);
    sid = response.sid;
    uid = response.uid;
    //casto uid da number a string per evitare problemi con AsyncStorage
    uid = uid.toString();

    await saveSidUid();
    console.log("Registrazione completata con SID:", sid, "e UID:", uid);
  } catch (error) {
    console.error("[register] Errore durante la registrazione:", error);
    throw error;
  }
};

// Funzione per salvare SID e UID in AsyncStorage
async function saveSidUid() {
  try {
    if (sid) {
      await AsyncStorage.setItem("SID", sid);
      console.log("SID salvato nello storage:", sid);
    }

    if (uid) {
      await AsyncStorage.setItem("UID", uid);
      console.log("UID salvato nello storage:", uid);
    }
  } catch (error) {
    console.error("[saveSidUid] Errore durante il salvataggio in AsyncStorage:", error);
  }
}
