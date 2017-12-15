'use strict';
angular.module('dleduWebApp')
    .controller('RegisterCtrl', function ($scope,AccountService,$state) {
        $scope.RegisterFn={
            params:{
                email:"",
                password:"",
            },
            submit:function () {
                var _this=this;
                AccountService.saveUser(_this.params).$promise
                    .then(function (data) {


                    })
                    .catch(function (error) {
                        //messageService.openMsg("班级添加失败")
                    })
            }
        }

    });
