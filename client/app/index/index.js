'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('sindex', {
                url   : '/',
                access: {requiredLogin: false},
                views : {
                    'root': {
                        templateUrl: 'app/index/sindex.html',
                        controller : 'IndexCtrl'
                    }
                }
            })
            .state('tindex', {
                url   : '/tindex',
                access: {requiredLogin: false},
                views : {
                    'root': {
                        templateUrl: 'app/index/tindex.html',
                        controller : 'IndexCtrl'
                    }
                }
            })
    });
