const TABLE = 'auth';
const auth = require('../../../auth');

module.exports = function (injectedStore) {

    let store = injectedStore;

    if(!store) {
        store = require('../../../store/dummy');
    }

    //Crear un usuario solo para la autenticación
    function  upsert(data) {
        const authData = {
            id: data.id
        }

        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            authData.password = data.password;
        }

        return store.upsert(TABLE, authData);
    }

    async function login(username, password) {
        const data = await store.query(TABLE, {username: username});

        //Valido que la contraseña ingresada sea la que se encuentra almacenada
        if (data.password == password) {
            //generar token
            return auth.sign(data);
        } else {
            throw new Error('Información inválida');
        }
    }

    return {
        upsert,
        login
    }

}