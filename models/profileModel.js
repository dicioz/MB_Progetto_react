import React from "react";
import CommunicationController from "./CommunicationController";

let sid = null;
let uid = null;

//chiamata GET
export const getUser = async () => {
    try {
        let endpoint = "user/" + uid;		
        const verb = 'GET';
		const queryParams = {sid: this.sid};
		const bodyParams = {};
		return await CommunicationController.genericRequest(endpoint, verb, queryParams, bodyParams);
    } catch(error) {
        console.error('[getSid] Error during sid fetch:', error);
        throw error;
    }
}

//GET del sid
export const getSid = () => {
    return sid;
}

//chiamata PUT
export const saveProfile = async (profile) => {
    if(!sid || !uid) {
        console.log("sid: ", sid, "uid: ", uid);
        throw new Error('sid or uid not set');
    }
    try {
        //profile[profile.length - 1] = sid;
        console.log("profile: ", profile);
        await CommunicationController.genericRequest("/user", "PUT", uid, profile);
    } catch(error) {
        console.error('[saveProfile] Error during profile save:', error);
        throw error;
    }
}

//chiamata POST
export const register = async () => {
    const endPoint = "user";
    const verb = 'POST';
    const queryParams = {};
    const bodyParams = {};
    try{
        const response = await CommunicationController.genericRequest(endPoint, verb, queryParams, bodyParams);
        sid = response.sid;
        uid = response.uid;
        saveSidUid();
    } catch(error) {
        console.error('[register] Error during registration:', error);
        throw error;
    }
}

//Async Storage
async function saveSidUid() {
	const SIDinStorage = await AsyncStorage.getItem("SID");
    const UIDinStorage = await AsyncStorage.getItem("UID");

	if (SIDinStorage) {
		console.log("SID non ancora salvato", SIDinStorage, typeof SIDinStorage);
	} else {
		console.log("SID già salvato");
		await AsyncStorage.setItem("SID", sid);
	}

    if(UIDinStorage) {
        console.log("UID non ancora salvato", UIDinStorage, typeof UIDinStorage);
    } else {
        console.log("UID già salvato");
        await AsyncStorage.setItem("UID", uid);
    }
}

