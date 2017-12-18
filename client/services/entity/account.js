'use strict';

angular.module('FlyWebApp')
  .factory('AccountService', function ($resource) {
    return {
        register: function (params) {
            var user = $resource('api/account/register');
            return user.save(params);
        },
        login:function (params) {
            var user = $resource('api/account/login');
            return user.save(params);
        }
    }
  });
