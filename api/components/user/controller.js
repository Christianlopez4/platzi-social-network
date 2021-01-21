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

    function addUser(user) {
        return store.upsert(TABLE, user);
    }

    return {
        listUsers,
        getUser,
        addUser
    }
}