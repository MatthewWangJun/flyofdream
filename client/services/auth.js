'use strict';

angular.module('FlyWebApp.auth')
    .factory('AuthService', function ($rootScope, $http, $q, AccountService, localStorageService) {

        var AuthService = {
            setUser: function (user) {
                if (!user.avatar || user.avatar == '' || user.avatar == 'null') {
                    user.avatar = '../assets/images/default_profile02.jpg';
                }
                localStorageService.set('user', user);
                localStorageService.bind($rootScope, 'user');
            },
            clearUser: function () {
                $rootScope.user = undefined;
                localStorageService.remove('user');
                localStorageService.cookie.remove('authorize');
            },
            getUser: function () {
                var _user = localStorageService.get('user');
                // 新旧接口过渡使用此方法解决新旧接口同属性字段名不同的问题。
                _user.organId = _user.organId || _user.orgId;
                return _user;
            },
            login: function (params) {
                var deferred = $q.defer();
                AccountService.login(params)
                    .success(function (user) {
                        AuthService.setUser(user);
                        localStorageService.cookie.set('authorize','true');
                        deferred.resolve(user);
                        return user;

                    })
                    .error(function (err) {
                        deferred.reject(err);
                    });
                return deferred.promise;
            },
            logout: function (redirectUrl) {
                AuthService.clearUser();
                location.href = redirectUrl || '/';
                AccountService.signOut();
            },
            refreshUser: function () {
                var deferred = $q.defer();
                if (AuthService.authorize()) {
                    AccountService.get()
                        .success(function (user) {
                            AuthService.setUser(user);
                            deferred.resolve(user);
                        })
                        .error(function (e) {
                            AuthService.clearUser();
                            deferred.reject(err);
                        });
                } else {
                    location.href = "/"
                }
                return deferred.promise;
            },
            authorize: function () {
                return localStorageService.cookie.get('authorize');
            }
        };
        return AuthService;
    });