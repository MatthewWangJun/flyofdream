'use strict';

angular.module('FlyWebApp')
    .factory('CommonService', function (ngDialog,$http) {
        return {
            product: {
                name: '知新点点',
                version: 'v0.0.0.1'
            },
            subnav: {
                index: 0,
                navs: [
                    {menu: '首页', path: '/'},
                    {menu: '个人中心', path: '/userCenter'},
                    {menu: '账号设置', path: '/account'}
                    // {menu: '消息', path:'/'}
                ]
            },
            isMSIE789: function () {
                return navigator.appName == 'Microsoft Internet Explorer' && /MSIE [7-9]/.test(navigator.appVersion);
            },
            browser:{
                versions: function () {
                    var u = navigator.userAgent, app = navigator.appVersion;
                    console.log(u);
                    return {//移动终端浏览器版本信息
                        trident: u.indexOf('Trident') > -1, //IE内核
                        presto: u.indexOf('Presto') > -1, //opera内核
                        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                        mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/) && u.indexOf('QIHU') && u.indexOf('QIHU') > -1 && u.indexOf('Chrome') < 0,  //是否为移动终端
                        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),  //ios终端
                        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                        iPad: u.indexOf('iPad') > -1, //是否iPad
                        webApp: u.indexOf('Safari') == -1,//是否web应该程序，没有头部与底部
                        google: u.indexOf('Chrome') > -1,
                        weixin:u.match(/MicroMessenger/i)=="MicroMessenger"
                    };
                }(),
                language: (navigator.browserLanguage || navigator.language).toLowerCase()
            },
            msgDialog:function(message,type) {
                var _class = 'text-info';
                if(type == 1){
                    _class = 'text-success';
                }else if(type == 2){
                    _class = 'text-warning';
                }else if(type == 3){
                    _class = 'text-danger';
                }else{
                    _class = 'text-info';
                }
                ngDialog.open({
                    template: '<span class="'+_class+'">' + message + '</span>',
                    plain   : true
                });
                setTimeout(function () {
                    ngDialog.closeAll();
                }, 1500);
            },
        }
    });
