const express = require('express');
const response = require('../../../network/response');
const controller = require('./index');
const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', add);

function list (req, res, next) {
    controller.listPosts()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

function get (req, res, next) {
    controller.getPost(req.params.id)
        .then(post => {
            response.success(req, res, post, 200);
        })
        .catch(next);
}

function add (req, res, next) {
    controller.addPost(req.body)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(next);
}

module.exports = router;