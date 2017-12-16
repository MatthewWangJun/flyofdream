'use strict';

var _ = require('lodash'),
    User = require('../model/user.js');
module.exports = {
    saveUser: function (user) {
        return user.save(user);
    },
    findUserByEmail(email){
        return User.findOne({email:email});
    },
    findUserById(id){
        return User.findOne({_id:id}, '-salt -password');
    }

};