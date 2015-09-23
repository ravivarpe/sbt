angular.module('starter.home')


.service('UpdateService', function($http, $state, $ionicPopup, httpOperationFact, stringDBrepo, $ionicPlatform) {


    this.update = function() {
        httpOperationFact.sendHttpGetRequest(stringDBrepo.updateService()).then(function(object) {
                console.log(object);
                if (object.isUpdateavailable == "true") {
                    var myPopup = $ionicPopup.show({

                        title: 'Update is available',
                        subTitle: 'Please update',
                        //  scope: $scope,
                        buttons: [{
                            text: 'Cancel',
                            onTap: function(e) {
                                ionic.Platform.exitApp();
                            }
                        }, {
                            text: '<b>Update</b>',
                            type: 'button-positive',
                            onTap: function(e) {
                                window.open(object.url, "_system");
                                ionic.Platform.exitApp();
                            }
                        }]
                    });
                    var deregisterBackButton = $ionicPlatform.registerBackButtonAction(function(e) {}, 401);
                    myPopup.then(function(res) {
                        deregisterBackButton();
                    });
                }

            },
            function(response) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Sorry Internal Server Error',
                    template: ''
                });

            });
    };




});
