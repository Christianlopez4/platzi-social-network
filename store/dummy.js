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
    console.log(db);
};

function remove(table, id) {
    return true;
};

module.exports = {
    list,
    get,
    upsert,
    remove
}