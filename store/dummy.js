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
    db[table].push(data);
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