/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV == 'development') {
    var fs = require('fs'),
        path = require('path');
    if (fs.existsSync(path.join(__dirname, './config/local.env.js'))) {
        var localENV = require('./config/local.env.js');
        for (var key in localENV) {
            process.env[key] = localENV[key];
        }
    }
}

var express = require('express');
var config = require('./config/environment');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function (err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});
// Setup server
var app = express();
var server = require('http').createServer(app);
var fs = require('fs');
var _log_path = './logs';
if (!fs.existsSync(_log_path)) {
    fs.mkdirSync(_log_path);
}
require('./config/express')(app);
require('./api')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
