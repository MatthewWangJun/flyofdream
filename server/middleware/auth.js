'use strict';
var jwt=require("jsonwebtoken");
var config = require('../config/environment');
module.exports = {
  isSignedIn : function(req, res, next){
    if (req.session.oauth){
      req.user = req.session.oauth;
      return next();
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
    }
};
