'use strict';

angular.module('dleduWebApp', [
    'ngSanitize',
    'ngResource',
    'ui.router',
    'ngAnimate',
    'ui.bootstrap',
    'LocalStorageModule',
    'dleduWebAppComponents',
    'dleduWebService',
    'dlFilters',
    'ngDialog',
    'azx.common'
])
    .factory('httpInterceptor', ['$q', '$injector', function ($q, $injector) {
        var _location = $injector.get('$location');
        //配置httpInterceptor
        return {
            'responseError': function (response) {
                if (response.status == 401 || response.data == "该用户id信息不存在!") {
                    var AuthService = $injector.get('AuthService');
                    AuthService.clearUser();
                    _location.$$path != '/login' && (AuthService.navigation(0,'/login'));
                } else if (response.status === 404) {
                    // _window.location.href = '/404';
                } else if (response.status >= 500) {
                    // _window.location.href = '/500';
                }
                return $q.reject(response);
            },
            'response'     : function (response) {
                return response;
            },
            'request'      : function (config) {
                return config;
            },
            'requestError' : function (config) {
                return $q.reject(config);
            }
        };
    }])
    .config(['$urlRouterProvider', '$locationProvider', '$stateProvider', '$httpProvider', 'localStorageServiceProvider',function ($urlRouterProvider, $locationProvider, $stateProvider, $httpProvider, localStorageServiceProvider) {
        console.log('============================');
        console.log($httpProvider.defaults.headers.common);
        //加载拦截器
        $httpProvider.interceptors.push('httpInterceptor');
        //$http请求头配置
        $httpProvider.defaults.headers.get = $httpProvider.defaults.headers.get || {};
        // $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        // $httpProvider.defaults.headers.common["Accept"] = 'text/plain';
        console.log($httpProvider.defaults.headers.common);
        //禁用 IE ajax request caching
        var browser={
            versions: function () {
                var u = navigator.userAgent, app = navigator.appVersion;
                console.log(u);
                return {//移动终端浏览器版本信息
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/)
                    || !!u.match(/AppleWebKit/), //是否为移动终端
                    //ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1,//是否web应该程序，没有头部与底部
                    google: u.indexOf('Chrome') > -1,
                    weixin:u.match(/MicroMessenger/i)=="MicroMessenger"
                };
            }(),
                language: (navigator.browserLanguage || navigator.language).toLowerCase()
        };

        // console.log("language"+ CommonService.browser.language);
        // console.log('是否为Ie'+ CommonService.browser.versions.trident);
        if(browser.versions.trident){
            $httpProvider.defaults.headers.common["Accept"] = 'text/plain';
            $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
            $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
        }

        //localStorageService本地存储配置
        localStorageServiceProvider.setPrefix('aizhixin').setStorageType('localStorage').setNotify(true, true);

        //入口路由配置
        $urlRouterProvider
            .otherwise('/');
        $stateProvider
            .state('base', {
                abstract: true,
                views   : {
                    root: {
                        templateUrl: 'app/layout/layout.html',
                        controller : 'LayoutCtrl'
                    }
                },
                access  : {requiredLogin: false}
            });
        $locationProvider.html5Mode(true);
    }])
    .run(function ($state, $rootScope, AuthService, $window) {
        //判断是否学校域名用户
        var _tempArr = $window.location.hostname.replace('www.','').split(".");
        if(_tempArr.length == 3||_tempArr.length == 4){
            if(_tempArr[0]=="dledutest"||_tempArr[0]=="dledudev"){
                $rootScope.isShowSchoolHead = false;
            }else {
                $rootScope.isShowSchoolHead = true;
            }
        }else{
            $rootScope.isShowSchoolHead = false;
        }
        //站内页面的访问权限验证
        $rootScope.$on("$stateChangeStart", function (evt, toState, toParams, fromState, fromParams) {
            if (toState.access.requiredLogin && !AuthService.authorize()) {
                $window.location.href = '/login';
            }
        });
    });
