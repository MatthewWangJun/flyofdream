'use strict';

angular.module('dleduWebAppComponents')
  .controller('signinmodelCtrl', function ($scope, AuthService,$rootScope) {
    $scope.form = {};
    var _mail_regex = /\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/,
      _phone_regex = /^(0|86|17951)?(13[0-9]|15[0-9]|17[6789]|18[0-9]|14[57])[0-9]{8}$/;
    $scope.$watch('form.username', function(value){
      $scope.signInForm.username.$setValidity('customError',
        true//_mail_regex.test(value) || _phone_regex.test(value)
      );
    });

    $scope.keyPressHandle = function($event){
      if($event.keyCode == 13){
        if($scope.form.username && $scope.form.password){
          $scope.signIn();
        }
      }
    };

    $scope.signIn = function() {
      $scope.signInError = '';
      $scope.processing = true;
      AuthService.signIn($scope.form.username, $scope.form.password)
        .then(function (user) {
          $scope.processing = false;
          $("#modal").modal('hide');
          $rootScope.$broadcast('loginSuccess');
        })
        .catch(function (err) {
          $scope.processing = false;
          $scope.signInError = '登录失败, 用户名或密码错误';
        });
    };
  });
