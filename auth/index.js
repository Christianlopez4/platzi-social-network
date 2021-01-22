//npm i jsonwebtoken
const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.jwt.secret;
const error = require('../utils/error');

function sign(data) {
    return jwt.sign({data}, secret);
}

const check = {
    own: function (req, owner) {
        const decoded = decodeHeader(req);
        //comprobar si es o no propio
        if (decoded.id !== owner) {
            throw error('No puedes hacer esto', 401);
        }
    },
    logged: function (req) {
        const decoded = decodeHeader(req);
    }
}

//Recupera el token ingresado
function getToken(auth) {
    if (!auth) {
        throw new Error('No viene token');
    } else {
        let token = auth.replace('Bearer ', '');
        return token;
    }
}

function verify(token) {
    return jwt.verify(token, secret);
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded.data;
    return decoded.data;
}

module.exports = {
    sign,
    check
}