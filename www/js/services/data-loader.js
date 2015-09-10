angular.module('starter')


.service('dataLoaderFact', function($ionicLoading) {
    this.show = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>',
            animation: 'fade-in',
            noBackdrop: false,
            maxWidth: 0
        });
    };
    this.hide = function() {
        $ionicLoading.hide();
    };

});
