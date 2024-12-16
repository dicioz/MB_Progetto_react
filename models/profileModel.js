import React from "react";
import CommunicationController from "./CommunicationController";

let sid = null;
let uid = null;

export const getSidUid = async () => {
    try {
        const response = await CommunicationController.genericRequest("/user", "POST", {}, {});
        sid = response.sid;
        uid = response.uid;
    } catch(error) {
        console.error('[getSid] Error during sid fetch:', error);
        throw error;
    }

}

//GET del sid
export const getSid = () => {
    return sid;
}


export const saveProfile = async (profile) => {
    if(!sid || !uid) {
        
    }
    try {
        profile[profile.length - 1] = sid;
        const response = await CommunicationController.genericRequest("/user", "PUT", uid, profile);
    } catch(error) {
        console.error('[saveProfile] Error during profile save:', error);
        throw error;
    }
}


