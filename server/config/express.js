/**
 * Express configuration
 */

'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var passport = require('../middleware/passport');
var securityCode = require('../middleware/securityCode');
var log4js = require('log4js');
log4js.configure(config.log4js);
var requestLog = require('../middleware/request_log');

module.exports = function (app) {


    var env = app.get('env');

    app.set('views', config.root + '/server/views');
    app.set('view engine', 'jade');
    app.use(compression());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(session({
        secret: config.secrets.session,
        store: new RedisStore({
            ttl: config.cache.session.ttl,
            port: config.cache.session.port,
            host: config.cache.session.host,
            pass: config.cache.session.pass,
            db: config.cache.session.db,
            prefix: config.cache.session.prefix
        }),
        cookie           : {
            path  : '/',
            maxAge: 2592000000,
            domain: config.cache.session.domain
        },
        name: 'dledu.sid',
        resave: true,
        saveUninitialized: true
    }));

    app.use(function (req, res, next) {
        if (!req.session) {
            // 如果此处出现问题将严重影响程序使用。
            console.error('[session cache configuration]', JSON.stringify(config.cache.session));
            return res.status(500).send('会话缓存或失效，请联系管理员。');
        }
        next();
    });

    passport(app);
    securityCode.init(app);
    app.use(requestLog);


    if ('production' === env) {
        app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
        app.use(express.static(path.join(config.root, 'public')));
        app.set('appPath', config.root + '/public');
        app.use(morgan('dev'));
    }

    if ('development' === env || 'test' === env) {
        app.use(require('connect-livereload')());
        app.use(express.static(path.join(config.root, '.tmp')));
        app.use(express.static(path.join(config.root, 'client')));
        app.set('appPath', 'client');
        app.use(morgan('dev'));
        app.use(errorHandler()); // Error handler - has to be last
    }
};