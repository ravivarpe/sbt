angular.module('starter')


.service('dataLoaderFact', function($ionicLoading) {
    this.show = function() {
        $ionicLoading.show({
            // template: '<ion-spinner icon="android"></ion-spinner>',
            template: '<img  style="width:70px; height:70px" src="img/loader.gif">',
            animation: 'fade-in',
            noBackdrop: false,
            maxWidth: 0
        });
    };
    this.hide = function() {
        $ionicLoading.hide();
    };

});
