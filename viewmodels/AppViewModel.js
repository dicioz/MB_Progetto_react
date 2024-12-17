//Nell'AppViewModel.js ho spostato la logica di fetch dei dati
//così facendo App.js non deve capire quale testo mostrare ma solo mostrarlo

import {register} from "../models/profileModel";

export async function fetchData() {

    let user = undefined
    try {
        user = await register();
    } catch (error) {
        return "Error: " + error.message;   
    }
    console.log("user: ", user);
    return "data loaded";
}

