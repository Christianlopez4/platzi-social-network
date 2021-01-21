const db = {
    'user': [
        {
            id: '1',
            name: 'Christian'
        }
    ]
};

async function list(table) {
    return await db[table];
};

async function get(table, id) {
    let collection = await list(table);
    return collection.filter(item => item.id === id)[0] || null;
};

async function upsert(table, data) {
    if(!db[table]) {
        db[table] = [];
    }
    db[table].push(data);
};

function remove(table, id) {
    return true;
};

async function query(table, q) {
    //Esto es código dummy
    let collection = await list(table);
    let keys = Object.keys(q);
    let key = keys[0];
    return collection.filter(item => item[key] === q[key])[0] || null;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query
}