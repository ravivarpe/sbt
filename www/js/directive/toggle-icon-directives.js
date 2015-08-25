angular.module('starter')




.directive('ionicExpandArrowSwitcher', function() {

    return {
        restrict: 'AE',
        require: 'ngModel',
        link: function($scope, elem, attrs, ctrl) {

            var currentState = true;

            elem.on('click', function() {
                // console.log('You clicked me!');

                if (currentState === true) {
                    // console.log('It is on!');
                    angular.element(elem).removeClass(attrs.onIcon);
                    angular.element(elem).addClass(attrs.offIcon);
                } else {
                    // console.log('It is off!');
                    angular.element(elem).removeClass(attrs.offIcon);
                    angular.element(elem).addClass(attrs.onIcon);
                }

                currentState = !currentState;

                $scope.$apply(function(scope) {
                    ctrl.$setViewValue(!ctrl.$viewValue);
                });

            });


        }
    };
});
