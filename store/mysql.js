//módulo de npm
const mysql = require('mysql');

const config = require('../config');

const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

//Conexión
let connection = {};

function handleConnection() {
    connection = mysql.createConnection(dbConfig);
    connection.connect(err => {
        if (err) {
            console.error('[db] ', err);
            setTimeout(handleConnection, 3000);
        } else {
            console.log('[db] Connected');
        }
    });

    connection.on('error', err => {
        console.error('[db err] ', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleConnection();
        } else {
            throw err;
        }
    })
}

handleConnection(); 

function list(table) {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

module.exports = {
    list
}