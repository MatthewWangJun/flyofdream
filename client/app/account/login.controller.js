'use strict';
angular.module('FlyWebApp')
    .controller('LoginCtrl', function ($scope,AccountService,$state,AuthService) {
        $scope.LoginFn={
            params:{
                email:"",
                password:""
            },
            submit:function () {
                var _this=this;
                AuthService.login(_this.params).$promise
                    .then(function (data) {


                    })
                    .catch(function (error) {
                        //messageService.openMsg("班级添加失败")
                    })
            }
        }
    });
