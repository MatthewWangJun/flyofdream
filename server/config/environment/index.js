'use strict';

var path = require('path');
var _ = require('lodash');
function requiredProcessEnv(name) {
    if (!process.env[name]) {
        throw new Error('You must set the ' + name + ' environment variable');
    }
    return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
    env: process.env.NODE_ENV,

    // Root path of server
    root: path.normalize(__dirname + '/../../..'),

    // Server port
    port: process.env.PORT || 9000,

    // Secret for session, you will want to change this and make it an environment variable
    secrets: {
        session: 'dledu-web-secret',
        client_id: 'dleduApp'
    },

    mongo: {
        options: {
            db: {
                safe: true
            }

        },
        uri:  process.env.MONGODB_URI ||
        process.env.MONGOHQ_URL ||
        process.env.OPENSHIFT_MONGODB_DB_URL +
        process.env.OPENSHIFT_APP_NAME ||
        'mongodb://127.0.0.1:27017/flyofdream'
    },
    log4js: {
        appenders: [
            {
                type: 'console'
            },
            {
                type: 'file',
                filename: './logs/access.log',
                maxLogSize: 20480,
                backups: 10,
                category: 'access'
            },
            {
                type: 'file',
                filename: './logs/error.log',
                maxLogSize: 20480,
                backups: 10,
                category: 'error'
            }
        ],
        replaceConsole: true
    },

    cache: {
        session: {
            ttl: 2 * 60 * 60,  // 1小时过期
            host: process.env.SESSION_REDIS_HOST || '172.16.23.32',
            port: process.env.SESSION_REDIS_PORT || 6379,
            pass: process.env.SESSION_REDIS_PASS || '',
            db: process.env.SESSION_REDIS_DB || 0,
            prefix: process.env.SESSION_REDIS_PREFIX || 'dledu_web_session',
            domain: process.env.SESSION_DOMAIN || 'aizhixin.com'
        }
    }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
    all,
    require('./' + process.env.NODE_ENV + '.js') || {});
