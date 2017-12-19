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
            .state('about', {
                url   : '/about',
                access: {requiredLogin: false},
                views : {
                    'root': {
                        templateUrl: 'app/index/about.html',
                        controller : 'IndexCtrl'
                    }
                }
            })
            .state('article', {
                url   : '/article',
                access: {requiredLogin: false},
                views : {
                    'root': {
                        templateUrl: 'app/index/article.html',
                        controller : 'IndexCtrl'
                    }
                }
            })
            .state('our', {
                url   : '/our',
                access: {requiredLogin: false},
                views : {
                    'root': {
                        templateUrl: 'app/index/our.html',
                        controller : 'IndexCtrl'
                    }
                }
            })
            .state('contact', {
                url   : '/contact',
                access: {requiredLogin: false},
                views : {
                    'root': {
                        templateUrl: 'app/index/our.html',
                        controller : 'IndexCtrl'
                    }
                }
            })
    });
