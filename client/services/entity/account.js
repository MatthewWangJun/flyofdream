'use strict';

angular.module('dleduWebService')
  .factory('AccountService', function ($resource) {
    return {
        saveUser: function (params) {
            var user = $resource('api/account/saveUser');
            return user.save(params);
        },
        findUser:function (params) {
            var user = $resource('api/login');
            return user.save(params);
        }
    }
  });
