'use strict';

angular.module('FlyWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('index', {
                url   : '/',
                access: {requiredLogin: false},
                views : {
                    'root': {
                        templateUrl: 'app/index/index.html',
                        controller : 'IndexCtrl'
                    }
                }
            })

    });
