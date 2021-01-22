const TABLE = 'auth';
const bcrypt = require('bcrypt');
const auth = require('../../../auth');

module.exports = function (injectedStore) {

    let store = injectedStore;

    if(!store) {
        store = require('../../../store/dummy');
    }

    //Crear un usuario solo para la autenticación
    async function  upsert(data) {
        const authData = {
            id: data.id
        }

        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            //Haseha la password para que en lugar de guardarla en limpio la guarde hasheada
            //Num de veces que se ejecute el algoritmo
            authData.password = await bcrypt.hash(data.password, 5);
        }

        return store.upsert(TABLE, authData);
    }
    
    async function login(username, password) {
        const data = await store.query(TABLE, {username: username});
        //compara con los sistemas de criptografía y cifrado si las passwords son la misma, sin comparar texto plano
        return await bcrypt.compare(password, data.password)
            .then( sonIguales => {
                //Valido que la contraseña ingresada sea la que se encuentra almacenada
                if (sonIguales == true) {
                    //generar token
                    return auth.sign(data);
                } else {
                    throw new Error('Información inválida');
                }
            })

    }

    return {
        upsert,
        login
    }

}