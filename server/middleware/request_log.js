'use strict';
/*
* 访问日志
* */

var logger = require('../common/logger'),
  util = require('util');

var api_path = /^\/api/;

module.exports = function(req, res, next){
  if(!api_path.test(req.url)){
    next();
    return;
  }

  var t = new Date();
  logger.access(util.format('\n\nStarted', t.toISOString(), req.method, req.url, req.ip));

  res.on('finish', function () {
    var duration = ((new Date()) - t);
    logger.access(util.format('Completed', res.statusCode, '(' + duration + 'ms)'));
  });

  next();
};
