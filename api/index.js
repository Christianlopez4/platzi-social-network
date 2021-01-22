const express = require('express');
const config = require('../config.js');

//Componentes
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const post = require('./components/post/network');
const errors = require('../network/errors');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');

const swaggerDoc = require('./swagger.json');

const app = express();

app.use(bodyParser.json()); 
app.use('/api/user', user);
app.use('/api/auth/login', auth);
app.use('/api/post', post);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

//Debe ser el último middleware
app.use(errors);

app.listen(config.api.port, () => {
    console.log(`API escuchando por en puerto ${config.api.port}`);
});