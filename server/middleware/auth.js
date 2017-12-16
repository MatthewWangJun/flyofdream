'use strict';
var jwt=require("jsonwebtoken");
var config = require('../config/environment');
module.exports = {
  isSignedIn : function(req, res, next){
    if (req.session.oauth){
      var token=req.session.oauth.access_token;
        console.log(req.session);
        console.log(token);
        jwt.verify(token,  config.secrets.session, function(err, decoded) {
            if (err) {
                return res.status(401).send('Unauthorized');
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    }else{
      console.log('===============================');
      console.log(req.session);
      console.log(req.session.oauth);
        res.status(401).send('Unauthorized');
    }

  },
  signToken:function(id, email) {
        return jwt.sign({ _id: id, email: email }, config.secrets.session, {
            expiresIn: 60 * 60 * 5
        });
    },
  logout: function (req, res) {
      delete req.session.oauth;
      console.log(req.user)
      res.send('ok');


  },
};
