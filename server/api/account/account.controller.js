'use strict';

var _ = require('lodash'),
    UserService = require("../../services/userService"),
    User = require('../../model/user.js');
var auth = require('../../middleware/auth');
module.exports = {
    register: function (req, res) {
        var user = new User({
            email: req.body.email,
            password: req.body.password,
            userName: req.body.userName
        });

        UserService.saveUser(user).then(users => {
            res.status(200).json(users);
        }).catch(function (error) {
            res.status(409).send(error);
        });
    },
    login: function (req, res) {
        console.log(req.body.email);
        UserService.findUserByEmail(req.body.email)
            .then(user => {
                if (!user) {
                    return res.status(401).send({msg: "用户不存在！"});
                }
                var isSame = user.authenticate(req.body.password);
                if (isSame) {
                    var token = auth.signToken(user._id, user.email);
                    UserService.findUserById(user._id).then(user => {
                        var _oauth = {
                            access_token: token,
                            user: user
                        };
                        console.log(_oauth);
                        req.session.oauth = _oauth;
                        req.session.oauth.timestamp_left = req.session.oauth.expires_in * 1000;
                        req.session.oauth.timestamp = new Date().getTime();
                        res.send(user);
                    }).catch(function (error) {
                        res.status(401).send({msg: "登陆失败！"});
                    });

                } else {
                    res.status(401).send({msg: "密码错误！"});
                }

            })
            .catch(err => {
                console.log(err);
                return res.status(401);
            });

    },
    logout: function (req, res) {
        delete req.session.oauth;
        return res.status(200).send({msg: "用户退出登陆！"});
    }

};
