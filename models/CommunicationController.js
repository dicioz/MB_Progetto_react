import React from "react";

const BASE_URL = 'https://develop.ewlab.di.unimi.it/mc/2425'

//chiama API generica con parametri
export default class CommunicationController {

    static async genericRequest(endpoint, verb, queryParams, bodyParams) {
        console.log("genericRequest called");
        //genera URL con parametri
        const queryParamsFormatted = new URLSearchParams(
            queryParams
        ).toString();

        const url = BASE_URL + endpoint + "?" + queryParamsFormatted;

        console.log("sending " + verb + " request to: " + url);
        //configura la richiesta
        let fetchData = {
            method: verb,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };
        if (verb !== "GET") {
            fetchData.body = JSON.stringify(bodyParams);
            //console.log("bodyParams: ", bodyParams);
        }

        //ottiene la risposta
        let httpResponse = await fetch(url, fetchData);
    
        //controlla lo stato della risposta
        const status = httpResponse.status;
        console.log("status: ", status);
        //se la risposta è positiva, deserializza l'oggetto
        if (status === 200) {
            let deserializedObject = await httpResponse.json();
            return deserializedObject;
        } else if (status === 204) {
            console.log("No content");
        } else {
            const message = await httpResponse.text();
            let error = new Error(
                "Error message from the server. HTTP status: " +
                status +
                " " +
                message,
            );
            throw error;
        }
    }

    /*CAPIRE queste 3 funzioni qui sotto vanne messe QUI oppure in ProfileModel.js */

    //chiama API GET generica senza parametri
    static async genericGetRequest(endpoint, queryParams) {
        console.log("genericGetRequest called");
        return await this.genericRequest(endpoint, "GET", queryParams, {});
    }

    //funzione per registrare un nuovo utente
    static async register() {
		const endPoint = "users";
		const verb = 'POST';
		const queryParams = {};
		const bodyParams = {};
		return await CommunicationController.genericRequest(endPoint, verb, queryParams, bodyParams);
	}
	
    //funzione per ottenere le informazioni dell'utente
    static async getUser(uid){
        //uso await altrimenti ritorna una promise -> faccio async il metodo
        let endpoint = "user/" + uid;
        let queryParams = {sid: this.sid};
        console.log("endpoint: ", endpoint, "queryParams: ", queryParams);
        return await this.genericGetRequest(endpoint, queryParams)
    }
}
