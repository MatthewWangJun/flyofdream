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
                        templateUrl: 'app/account/login.html',
                        controller : 'LoginCtrl'
                    }
                }

            })
            .state('register', {
                url   : '/register',
                access: {requiredLogin: false},
                // parent: 'base',
                views : {
                    'root': {
                        templateUrl: 'app/account/register.html',
                        controller : 'RegisterCtrl'
                    }
                }
            })

    });
