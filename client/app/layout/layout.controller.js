/**
 * Created by Secmax on 16/6/7.
 */
'use strict';

angular.module('dleduWebApp')
    .controller('LayoutCtrl', function ($scope,CommonService) {
        $scope.subnav = CommonService.subnav;
        $scope.product = CommonService.product;
    });
