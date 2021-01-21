const auth = require('../auth');
const TABLE = 'user';

module.exports = function (injectedStore) {

    let store = injectedStore;

    if(!store) {
        store = require('../../../store/dummy');
    }

    function listUsers() {
        return store.list(TABLE);
    }

    function getUser(id) {
        return store.get(TABLE, id);
    }

    async function upsertUser(body) {
        let user = {
            id: body.id,
            name: body.name,
            username: body.username
        }

        if (body.password || body.username) {
            await auth.upsert({
                id: body.id,
                username: body.username,
                password: body.password
            })
        }

        return store.upsert(TABLE, user);
    }

    return {
        listUsers,
        getUser,
        upsertUser
    }
}