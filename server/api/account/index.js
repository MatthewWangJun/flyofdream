'use strict';

var express = require('express');
var controller = require('./account.controller');
var auth=require('../../middleware/auth');
var router = express.Router();


router.post('/register',controller.register);
router.post('/login',controller.login);
router.get('/logout',controller.logout);



module.exports = router;
