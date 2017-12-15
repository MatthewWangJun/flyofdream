'use strict';

var express = require('express');
var controller = require('./account.controller');

var router = express.Router();


router.post('/saveUser', controller.saveUser);



module.exports = router;
