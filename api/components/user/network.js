const express = require('express');
const secure = require('./secure');
const response = require('../../../network/response');
const controller = require('./index');
const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', add);
router.put('/', secure('update'), add);

function list (req, res, next)  {
    controller.listUsers()
        .then( list => {
            response.success(req, res, list);
        })
        .catch(next);
};

function get(req, res, next) {
    controller.getUser(req.params.id)
        .then( user => {
            response.success(req, res, user);
        })
        .catch(next);
};

function add(req, res, next) {
    controller.upsertUser(req.body)
        .then( user => {
            response.success(req, res, user, 201);
        })
        .catch(next)
}

module.exports = router;