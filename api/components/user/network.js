const express = require('express');
const response = require('../../../network/response');
const controller = require('./index');
const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', add);

function list (req, res)  {
    controller.listUsers()
        .then( list => {
            response.success(req, res, list);
        })
        .catch( err => {
            response.error(req, res, err.message);
        });
};

function get(req, res) {
    controller.getUser(req.params.id)
        .then( user => {
            response.success(req, res, user);
        })
        .catch( err => {
            response.error(req, res, err.message);
        });
};

function add(req, res) {
    controller.upsertUser(req.body)
        .then( user => {
            response.success(req, res, user, 201);
        })
        .catch( err => {
            response.error(req, res, err.message);
        })
}

module.exports = router;