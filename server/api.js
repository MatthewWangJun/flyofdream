'use strict';

module.exports = function(app){
  // Insert routes below
    app.use('/api/account', require('./api/account'));
};
