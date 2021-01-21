const auth = require('../../../auth');

//action: acción a ejecutar
module.exports = function checkAuth(action) {
    function middleware(req, res, next) {
        switch (action) {
            case 'update':
                const owner = req.body.id;
                //el usuerio q generó el token es el mismo que queremos comprobar
                auth.check.own(req, owner);
                next();
                break;
        
            default:
                next();
                break;
        }
    }

    return middleware;
}