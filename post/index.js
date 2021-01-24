const express = require('express');
const errors = require('../network/errors');
const config = require('../config.js');
const post = require('./components/post/network');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); 
app.use('/api/post', post);
app.use(errors);

app.listen(config.post.port, () => {
    console.log(`Servicio post escuchando por en puerto ${config.post.port}`);
});