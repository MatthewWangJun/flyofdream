/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');


module.exports = function (app) {

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets|user)/*')
        .get(errors[404]);


    // Home router
    app.route('/*')
        .get(function (req, res) {
            res.sendfile(app.get('appPath') + '/index.html');
        });
};

