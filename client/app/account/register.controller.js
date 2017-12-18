'use strict';
angular.module('FlyWebApp')
    .controller('RegisterCtrl', function ($scope,AccountService,$state) {
        $scope.RegisterFn={
            params:{
                email:"",
                password:"",
            },
            submit:function () {
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
