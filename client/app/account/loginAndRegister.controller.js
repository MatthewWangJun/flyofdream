'use strict';
angular.module('FlyWebApp')
    .controller('LoginCtrl', function ($scope,AccountService,$state,AuthService) {
        $scope.LoginFn={
            toggle:"login",
            loginParams:{
                email:"",
                password:""
            },
            registerParams:{
                email:"",
                password:"",
                userName:""
            },
            login:function () {
                var _this=this;
                AuthService.login(_this.loginParams)
                    .then(function (data) {
                        console.log(data);
                        $state.go("index");

                    })
                    .catch(function (error) {
                        console.log(error);
                        //messageService.openMsg("班级添加失败")
                    })
            },
            register:function () {
                var _this=this;
                AccountService.register(_this.params).$promise
                    .then(function (data) {

                        console.log(data)
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            }
        }
    });
