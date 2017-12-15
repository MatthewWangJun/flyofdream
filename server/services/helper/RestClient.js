'use strict';

var rest = require('rest'),
    mime = require('rest/interceptor/mime'),
    _ = require('lodash'),
    Config = require('../../config/environment');

var restClient = rest.wrap(mime);
var Headers = {
    'Accept': 'application/json',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json;charset=UTF-8',
    'User-Agent': 'DLEDU_Web'

};

function request(options) {
    if (!/^\//.test(options.path)) {
        options.path = '/' + options.path;
    }
    var _host = "";
    if (options.host && options.host == 'dd') {
        _host = Config.backend_api.diandian_host;
    } else if (options.host && options.host == 'em') {
        _host = Config.backend_api.em_host;
    } else  if (options.host && options.host == 'pt') {
        _host = Config.backend_api.pt_host;
    } else  if (options.host && options.host == 'hy') {
        _host = Config.backend_api.hy_host;
    } else  if (options.host && options.host == 'io') {
        _host = Config.backend_api.io_host;
    } else {
        _host = Config.backend_api.host
    }

    console.log("[rest client] request path:" + _host + options.path);
    console.log("[rest client] request options:" + JSON.stringify(options));
    options.path = _host + options.path;

    options.headers = _.assign({}, Headers, options.headers);
    if (options.access_token) {
        options.headers = _.assign({}, options.headers, {
            Authorization: "Bearer " + options.access_token

        });
        options.access_token = undefined;
    }
    console.log("[rest client] request headers:" + JSON.stringify(options.headers));
    return restClient(_.assign({
        method: 'GET'
    }, options)).then(function (res) {
        console.log('[rest client] response status code:' + res.status.code);
        console.log('[rest client] response entity:' + JSON.stringify(res.entity));
        return res;
    });
}

module.exports = {
    get: function (options) {
        return request(_.assign({method: 'GET'}, options));
    },
    post: function (options) {
        return request(_.assign({method: 'POST'}, options));
    },
    put: function (options) {
        return request(_.assign({method: 'PUT'}, options));
    },
    delete: function (options) {
        return request(_.assign({method: 'DELETE'}, options));
    }
};
