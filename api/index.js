const express = require('express');
const config = require('../config.js');
const user = require('./components/user/network.js');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); 
app.use('/api/user', user);

app.listen(config.api.port, () => {
    console.log(`API escuchando por en puerto ${config.api.port}`);
});