import * as SQLite from 'expo-sqlite';

// Salva i dati del profilo nel database locale

export default class DBController {
    constructor() {
        this.db = null;
    }

    async openDB() {
        this.db = await SQLite.openDatabaseAsync('usersDB');
        const query = "CREATE TABLE IF NOT EXISTS Users (nome char(20) NOT NULL, cognome char(20) NOT NULL, numeroCarta char(16) NOT NULL, meseScadenza INTEGER NOT NULL, annoScadenza INTEGER NOT NULL, lastOid INTEGER, orderStatus char(20), cvv char(3) NOT NULL, uid INTEGER NOT NULL, PRIMARY KEY(uid));";
        //const query = "CREATE TABLE IF NOT EXISTS Users (ID INTEGER PRIMARY KEY AUTOINCREMENT, nome char(20) NOT NULL, cognome char(20) NOT NULL, );";
        await this.db.execAsync(query);
    }

    async saveUserInDatabase(user) {
        // Mappa correttamente i campi dalla risposta alle colonne del DB
        const userData = [
            user.firstName,      // Mappato a nome
            user.lastName,       // Mappato a cognome
            user.cardNumber,     // Mappato a numeroCarta
            user.cardExpireMonth, // Mappato a meseScadenza
            user.cardExpireYear,  // Mappato a annoScadenza
            user.lastOid !== null ? user.lastOid : 0, // Se lastOid è null, assegna 0
            user.orderStatus || "unknown", // Se orderStatus è null o undefined, usa "unknown"
            user.cardCVV,        // Mappato a cvv
            user.uid             // Mappato a uid
        ];
    
        console.log("user di SaveUserInDatabase: ", userData);
    
        const query = "INSERT INTO Users (nome, cognome, numeroCarta, meseScadenza, annoScadenza, lastOid, orderStatus, cvv, uid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
        try {
            await this.db.runAsync(query, userData);
            console.log("Utente salvato con successo:", userData);
        } catch (error) {
            console.error("[saveUserInDatabase] Errore durante il salvataggio dell'utente:", error);
            throw error;
        }
    }
    

    async getFirstUser() {
        const query = "SELECT * FROM Users";
        const result = await this.db.getFirstAsync(query);
        return result;
    }

    async getAllUsers() {
        const query = "SELECT * FROM Users";
        const result = await this.db.getAllAsync(query);
        return result;
    }
}