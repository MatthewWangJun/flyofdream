'use strict';

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    _ = require('lodash');
var API_REGX = /^\/api/,
    MIN_REFRESH_SECONDS = 4 * 40 * 1000; //1 * 60 * 60 * 1000;
var User = require('../repository/user/user.js');
var auth = require('./auth');

module.exports = function (app) {
    app.post('/api/login',
        //passport.authenticate('local', {}),
        function (req, res) {
            console.log(req.body);
            console.log(req.query);
            User.findOne({email:req.body.email})
                .then(user => { // don't ever give out the password or salt
                    if (!user) {
                        return res.status(401).send({msg:"用户不存在！"});
                    }
                   var isSame= user.authenticate(req.body.password);
                    console.log(isSame);
                    if(isSame){
                        var token=  auth.signToken(user._id,user.email);
                        var _oauth   = {
                            access_token:token
                        };
                        console.log(_oauth);
                        req.session.oauth = _oauth;
                        req.session.oauth.timestamp_left = req.session.oauth.expires_in * 1000;
                        req.session.oauth.timestamp = new Date().getTime();
                        res.send(user);
                    }else {
                        res.status(401).send({msg:"密码错误！"});
                    }

                })
                .catch(err => {
                    console.log(err);
                    return res.status(401);
                });



        });
};