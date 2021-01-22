const express = require('express');
const secure = require('./secure');
const response = require('../../../network/response');
const controller = require('./index');
const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', add);
router.put('/', secure('update'), add);
//user_follow
router.post('/follow/:id', secure('follow'), follow);
router.get('/followers/:id', following);

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

function follow(req, res, next) {
    controller.followUser(req.user.id, req.params.id)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(next);
}

function following(req, res, next) {
    controller.following(req.params.id)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

module.exports = router;