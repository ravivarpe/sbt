angular.module('starter')

.directive('ionicButtonClickToggle', function() {

    return {
        restrict: 'A',
        link: function($scope, elem, attrs, ctrl) {

            var currentState = true;

            elem.on('touchstart', function($event) {
                angular.element(elem).removeClass(attrs.onIcon);
                angular.element(elem).addClass(attrs.offIcon);
                console.log("touchstart");
            });

            elem.on('touchend', function($event) {
                angular.element(elem).removeClass(attrs.offIcon);
                angular.element(elem).addClass(attrs.onIcon);
                console.log("touchend");
            });

        }
    };
});
