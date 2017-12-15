'use strict';

var _ = require('lodash'),
    User = require('../../repository/user/user.js');
 module.exports = {
    saveUser: function (req, res) {
        var user = new User({
            email: req.body.email,
            password: req.body.password
        });

        user.save().then(users => {
            res.status(200).json(users);
        }).catch(function (error) {
            console.log("Error:" + error);
        });
    },

};
