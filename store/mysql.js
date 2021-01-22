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

function get(table, id) {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id = ${id}`, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function insert(table, data) {
    return new Promise( (resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

async function upsert(table, data) {
    let row =[];

    if(data.id) {
        row = await get(table, data.id);
    }

    if (row.length === 0) {
        return insert(table, data);
    } else {
        return update(table, data);
    }
    /*
    let user = get(table, data.id);
    if (user) {
        return update(table, data);
    } else {
        return insert(table, data);
    }
    */
}

function update(table, data) {
    return new Promise( (resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function query(table, q) {
    return new Promise ((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ?`, q, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res[0] || null);
            }
        })
    })
}

module.exports = {
    list,
    get,
    upsert,
    query
}