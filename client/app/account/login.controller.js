'use strict';
angular.module('dleduWebApp')
    .controller('LoginCtrl', function ($scope,AccountService,$state,$window) {
        $scope.LoginFn={
            params:{
                email:"",
                password:""
            },
            submit:function () {
                var _this=this;
                AccountService.login(_this.params).$promise
                    .then(function (data) {


                    })
                    .catch(function (error) {
                        //messageService.openMsg("班级添加失败")
                    })
            }
        }
    });
