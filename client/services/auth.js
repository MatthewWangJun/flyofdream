'use strict';

angular.module('FlyWebApp')
    .factory('AuthService', function ($rootScope, $http, $q, AccountService, localStorageService) {

        var AuthService = {
            setUser: function (user) {
                // if (!user.avatar || user.avatar == '' || user.avatar == 'null') {
                //     user.avatar = '../assets/images/default_profile02.jpg';
                // }
                // localStorageService.set('user', user);
                // localStorageService.bind($rootScope, 'user');
                var domain = $window.document.domain.split('.').reverse()[1];
                ////console.log(domain);
                if (domain) {
                    Cookies.set('user', user, {domain: '.' + domain + '.com'});
                    Cookies.set('authorize', true, {domain: '.' + domain + '.com'});
                } else {
                    Cookies.set('user', user);
                    Cookies.set('authorize', true);
                }
                $rootScope.user = user;
            },
            clearUser: function () {
                var domain = $window.document.domain.split('.').reverse()[1];
                if (domain) {
                    Cookies.remove('user', {domain: '.' + domain + '.com'});
                    Cookies.remove('authorize', {domain: '.' + domain + '.com'});
                } else {
                    Cookies.remove('user');
                    Cookies.remove('authorize');
                }
                $rootScope.user = undefined;
            },
            getUser: function () {
                return Cookies.getJSON('user');
            },
            login: function (params) {
                var deferred = $q.defer();
                AccountService.login(params).$promise
                    .then(function (user) {
                        AuthService.setUser(user);
                        localStorageService.cookie.set('authorize','true');
                        deferred.resolve(user);
                        return user;

                    })
                    .catch(function (err) {
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