'use strict';

var path = '/api/web/v1/public/errCode/getMsgByCode',
    RestClient = require('../services/helper/RestClient'),
    Promise = require('bluebird');

var ErrorCode = {
    getErrorSync: function (code) {
        return new Promise(function (resolve, reject) {
            // code.code && (code.code = parseInt(code.code));
            code.code ? code.code = parseInt(code.code): code.code = parseInt(code);
            RestClient.get({
                path: path,
                params: {
                    code: parseInt(code.code),
                    lang: 'zh_cn'
                }
            }).then(function (res) {
                if (res.status.code == 200) {
                    resolve({
                        code: code,
                        message: res.entity.message
                    });
                } else if (res.status.code == 404) {
                    res.entity.message = res.entity.message || code.cause;
                    resolve({code: code.code, cause: code.cause, message: res.entity.message});
                } else {
                    resolve({code: 500, message: '请求服务器时发生意外的错误，请稍后再试或联系管理员。'});
                }
            });
        });
    }
};

module.exports = ErrorCode;
