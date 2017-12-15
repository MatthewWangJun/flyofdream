/**
 * Created by Secmax on 2017/2/11.
 */

'use strict';
angular.module("azx.swiper", [])
    .directive('azxSwiper', ['$window','$sce','$timeout', function ($window, $sce, $timeout) {
        return {
            restrict: 'EA',
            template: '' +
            '<div class="swiper-container">' +
            '   <div class="swiper-wrapper">' +
            '       <div class="swiper-slide" ng-repeat="slide in slides">' +
            '           <div class="swiper-bg" style="background: url({{slide.background}}) center center no-repeat;height: 100%; width:100%; background-size: cover;"></div>' +
            '           <div class="slide-content">' +
            '               <div class="slide-box">' +
            '                   <a ng-href="{{slide.url}}" target="_blank"><img class="slide-img" ng-src="{{slide.image}}"></a>' +
            '               </div>' +
            '           </div>' +
            '       </div>' +
            '   </div>' +
            '   <div class="swiper-pagination" ng-show="params.showPagination"></div>' +
            '   <div class="swiper-button-next" ng-show="params.showNavButtons"></div>' +
            '   <div class="swiper-button-prev" ng-show="params.showNavButtons"></div>' +
            '</div>',
            transclude: true,
            scope: {
                fullScreen: '@',
                slides:'='
            },
            link: function (scope, element, attr, ctrl) {

                scope.params = {
                    showNavButtons: true,
                    showPagination: true,
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                    loop: true,
                    // effect: 'fade',
                    spaceBetween: 0,
                    centeredSlides: true,
                    autoplay: 5000,
                    autoplayDisableOnInteraction: false
                };

                var winHeight;
                var imgHeight;
                function onResize(e) {
                    scope.foo = $window.innerWidth;
                    scope.$digest();
                    init();
                }
                function getWindowHeight() {
                    if (window.innerHeight) {
                        winHeight = window.innerHeight;
                    }
                    else if ((document.body) && (document.body.clientHeight)) {
                        winHeight = document.body.clientHeight;
                    }
                    if (document.documentElement && document.documentElement.clientHeight) {
                        winHeight = document.documentElement.clientHeight;
                    }
                    imgHeight = winHeight - 90;
                    if(imgHeight > 600){
                        imgHeight = 600;
                    }
                }

                function setCss() {
                    element.css({
                        height: winHeight - 50 +'px'
                    });
                    $('.slide-img').css({
                        height: imgHeight + 'px'
                    });
                }

                function init() {
                    getWindowHeight();
                    setCss();
                }
                if(scope.fullScreen =='true'){
                    angular.element($window).bind('resize', onResize);
                    init();
                }
                function loadSwiper(){
                    $timeout(function () {
                        var swiper = null;
                        if (angular.isObject(scope.swiper)) {
                            scope.swiper = new Swiper(element[0].firstChild, scope.params);
                            swiper = scope.swiper;
                        } else {
                            swiper = new Swiper(element[0].firstChild, scope.params);
                        }
                        if (!angular.isUndefined(scope.onReady)) {
                            scope.onReady({
                                swiper: swiper
                            });
                        }
                    });
                }
                scope.$watch('slides',function(){
                    console.log(scope.slides);
                    if(scope.slides){
                        /*var ramdon = new Date().getTime();
                        angular.forEach(scope.slides,function(data){
                            data.background = data.background + '?' + ramdon;
                            data.image = data.image + '?' + ramdon;
                        });*/
                        scope.params.showNavButtons =  scope.slides.length > 1;
                        scope.params.showPagination =  scope.slides.length > 1;
                    }else{
                        scope.params.showNavButtons = false;
                        scope.params.showPagination = false;
                    }
                    loadSwiper();
                    // console.log(scope.params.showNavButtons);
                });
            }
        }
    }]);