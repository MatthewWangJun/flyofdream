'use strict';

var log4js = require('log4js'),
  accessLogger = log4js.getLogger('access'),
  errorLogger = log4js.getLogger('error');

module.exports = {
  access: function(log){
    accessLogger.info(log);
  },
  error: function(log){
    errorLogger.error(log);
  }
};
