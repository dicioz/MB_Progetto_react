import * as SQLite from 'expo-sqlite';

// Salva i dati del profilo nel database locale

export default class DBController {
    constructor() {
        this.db = null;
    }

    async openDB() {
        if (!this.db) {
            console.log("[DBController] Inizializzazione del database...");
            this.db = SQLite.openDatabase('usersDB'); // Apri o crea il database
    
            const query = `
                CREATE TABLE IF NOT EXISTS Users (
                    nome CHAR(20) NOT NULL,
                    cognome CHAR(20) NOT NULL,
                    numeroCarta CHAR(16) NOT NULL,
                    meseScadenza INTEGER NOT NULL,
                    annoScadenza INTEGER NOT NULL,
                    lastOid INTEGER,
                    orderStatus CHAR(20),
                    cvv CHAR(3) NOT NULL,
                    uid INTEGER NOT NULL PRIMARY KEY
                );
            `;

            return new Promise((resolve, reject) => {
                this.db.transaction((tx) => {
                    tx.executeSql(
                        query, // La query SQL da eseguire
                        [],    // Parametri della query (nessuno in questo caso)
                        () => {
                            console.log("[DBController] Tabella creata o già esistente.");
                            resolve(); // Indica che l'operazione è completata con successo
                        },
                        (_, error) => {
                            console.error("[DBController] Errore durante la creazione della tabella:", error);
                            reject(error); // Rifiuta la Promise in caso di errore
                        }
                    );
                });
            });
            
        } else {
            console.log("[DBController] Database già aperto.");
        }
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
    
        //const query = "INSERT INTO Users (nome, cognome, numeroCarta, meseScadenza, annoScadenza, lastOid, orderStatus, cvv, uid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";


        //COLAESCE serve per fare l'update di un campo solo se il campo passato è diverso da null
        //excluded è il valore passato alla query
        //Users è il valore attuale del db
        //quindi se excluded.nome è diverso da null allora Users.nome = excluded.nome
        //in pratica la query fa l'update solo dei campi passati diversi da null e dove l'uid è uguale
        const query = `
        INSERT INTO Users (nome, cognome, numeroCarta, meseScadenza, annoScadenza, lastOid, orderStatus, cvv, uid)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(uid) DO UPDATE SET
            nome = COALESCE(excluded.nome, Users.nome),
            cognome = COALESCE(excluded.cognome, Users.cognome),
            numeroCarta = COALESCE(excluded.numeroCarta, Users.numeroCarta),
            meseScadenza = COALESCE(excluded.meseScadenza, Users.meseScadenza),
            annoScadenza = COALESCE(excluded.annoScadenza, Users.annoScadenza),
            lastOid = COALESCE(excluded.lastOid, Users.lastOid),
            orderStatus = COALESCE(excluded.orderStatus, Users.orderStatus),
            cvv = COALESCE(excluded.cvv, Users.cvv);
    `;

        try {
            await this.db.runAsync(query, userData);
            console.log("Utente salvato con successo:", userData);
        } catch (error) {
            console.error("[saveUserInDatabase] Errore durante il salvataggio dell'utente:", error);
            throw error;
        }
    }
    


    async getFirstUser() {
        console.log("[DBController] Getting first user");
        const query = 'SELECT * FROM Users LIMIT 1'; // Recupera solo il primo utente
        return new Promise((resolve, reject) => {
            this.db.transaction(
                (tx) => {
                    tx.executeSql(
                        query,
                        [],
                        (_, { rows }) => {
                            if (rows.length > 0) {
                                resolve(rows.item(0)); // Restituisce il primo risultato
                            } else {
                                resolve(null); // Nessun risultato
                            }
                        },
                        (_, error) => {
                            console.error("Errore durante l'esecuzione della query:", error);
                            reject(error);
                            return false; // Interrompe la transazione in caso di errore
                        }
                    );
                }
            );
        });
    }
    
    
    async getAllUsers() {
        console.log("Getting all users");
        const query = 'SELECT * FROM Users';
        try {
            const result = await this.db.getAllAsync(query);
            console.log("result", result);
            return result.value;
        } catch (err) {
            console.log(err);
        }
    }
}