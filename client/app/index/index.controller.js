'use strict';
angular.module('dleduWebApp')
    .controller('IndexCtrl', function ($scope,CommonService,$state,$window) {
        console.log(CommonService.browser.versions);
        console.log($state);
        $scope.indexFn={
            product:CommonService.product,
            currentTab:"sindex",
            downloadUrl:{
                ios:"https://itunes.apple.com/us/app/zhi-xin-dian-dian/id1111080344?mt=8",
                android:"https://www.pgyer.com/amCc"
            },
            toDownload:function () {
                var _this=this;
                if(CommonService.browser.versions.mobile){
                    if(CommonService.browser.versions.ios){
                        $window.open(_this.downloadUrl.ios,"_blank");
                    }else {
                        $window.open(_this.downloadUrl.android,"_blank");
                    }
                }else {
                    $window.open(_this.downloadUrl.android,"_blank");
                }
            },
            init:function () {
                var _this=this;
                _this.currentTab=$state.current.name;
                if(_this.currentTab=="tindex"){
                    _this.downloadUrl.ios="https://itunes.apple.com/cn/app/zhi-xin-jiao-shi/id1137526857?mt=8";
                    _this.downloadUrl.android="https://www.pgyer.com/MD7w";
                }
            }
        };
        $scope.indexFn.init();

        /**
         * app teacher :ios https://itunes.apple.com/cn/app/zhi-xin-jiao-shi/id1137526857?mt=8
         *              android https://www.pgyer.com/MD7w
         *
         *      student: ios https://itunes.apple.com/us/app/zhi-xin-dian-dian/id1111080344?mt=8
         *                android https://www.pgyer.com/amCc
         */
    });
