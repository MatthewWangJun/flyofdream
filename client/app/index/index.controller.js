'use strict';
angular.module('FlyWebApp')
    .controller('IndexCtrl', function ($scope, CommonService, $state, $window, $timeout) {
        console.log(CommonService.browser.versions);
        console.log($state);
        $scope.indexFn = {
            product: CommonService.product,

            init: function () {
                $timeout(function () {
                    $('.flexslider').flexslider({
                        animation: "slide",
                        start: function (slider) {
                            $('body').removeClass('loading');
                        }
                    });
                    $(".scroll").click(function (event) {
                        event.preventDefault();

                        $('html,body').animate({scrollTop: $(this.hash).offset().top}, 1000);

                    });
                    $().UItoTop({easingType: 'easeOutQuart'});
                })

            }
        };


        $scope.indexFn.init();
    });
