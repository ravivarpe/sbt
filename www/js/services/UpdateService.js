angular.module('update.services', ['ionic'])


.service('UpdateService', function($http, $state, $ionicPopup, httpOperationFact, stringDBrepo) {


    this.update = function() {
        httpOperationFact.sendHttpGetRequest(stringDBrepo.updateService()).then(function(object) {
                console.log(object);
                if (object.isUpdateavailable) {
                    var myPopup = $ionicPopup.show({

                        title: 'Update available',
                        subTitle: 'Please update it compulsory',
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
