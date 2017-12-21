'use strict';

angular.module('FlyWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('login', {
                url   : '/login',
                access: {requiredLogin: false},
                // parent: 'base',
                views : {
                    'root': {
                        templateUrl: 'app/account/loginAndRegister.html',
                        controller : 'LoginCtrl'
                    }
                }

            })
    });
