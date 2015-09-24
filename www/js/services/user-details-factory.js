angular.module('starter.userSettings')

.factory('userDetailsFact', function(httpOperationFact, stringDBrepo, $ionicHistory, $state) {
    var factoryObj = {};

    factoryObj.setUserPersonalInfo = function(scope) {
        scope.personalInfo.userName = "";
    };


    factoryObj.getPersonalOverviewInfo = function(scope) {
        var response;
        // console.log(stringDBrepo.vBookingStatusCount(uniqueId, month, year));
        httpOperationFact.sendHttpGetRequest(stringDBrepo.vPersonalInfoURL(stringDBrepo.vendorUniqueId))
            .then(function(data) {
                    scope.personalInfo = data;
                    // console.log(data);
                },
                function(response) {
                    console.log('albums retrieval failed.')
                });
    }

    factoryObj.getVendorOverviewInfo = function(scope) {
        var response;
        // console.log(stringDBrepo.vBookingStatusCount(uniqueId, month, year));
        httpOperationFact.sendHttpGetRequest(stringDBrepo.vOverviewInfoURL(stringDBrepo.vendorUniqueId))
            .then(function(data) {
                    scope.overviewInfo = data;

                    if ($ionicHistory.currentStateName() == "vendor-app.subUserSettings")
                        scope.selectedOptionType.value = scope.overviewInfo.pickUpOrDrop;

                    console.log(data);
                },
                function(response) {
                    console.log('albums retrieval failed.')
                });
    }

    factoryObj.getVendorDailySlotsInfo = function(scope) {
        var response;
        // console.log(stringDBrepo.vBookingStatusCount(uniqueId, month, year));
        httpOperationFact.sendHttpGetRequest(stringDBrepo.vDailySlotsInfoURL(stringDBrepo.vendorUniqueId))
            .then(function(data) {
                    scope.vendorSlotInfo = data;
                    console.log(data);
                },
                function(response) {
                    console.log('albums retrieval failed.')
                });
    }


    factoryObj.updatePersonalOverviewInfo = function(scope) {
        var response;
        // console.log(stringDBrepo.vBookingStatusCount(uniqueId, month, year));
        httpOperationFact.sendHttpPutJsonRequest(stringDBrepo.vUpdatePersonalInfoURL(stringDBrepo.vendorUniqueId), scope.personalInfo)
            .then(function(data) {
                    // scope.personalInfo = data;
                    // console.log(data);
                },
                function(response) {
                    console.log('albums retrieval failed.')
                });
    }

    factoryObj.updateVendorOverviewInfo = function(scope) {
        var response;
        console.log(scope.overviewInfo);
        httpOperationFact.sendHttpPutJsonRequest(stringDBrepo.vUpdateOverviewInfoURL(stringDBrepo.vendorUniqueId), scope.overviewInfo)
            .then(function(data) {
                    // scope.overviewInfo = data;
                    // console.log(data);
                },
                function(response) {
                    console.log('albums retrieval failed.')
                });
    }

    factoryObj.updateVendorDailySlotsInfo = function(scope) {
        var response;
        console.log(scope.overviewInfo);
        httpOperationFact.sendHttpPutJsonRequest(stringDBrepo.vUpdateDailySlotsInfoURL(stringDBrepo.vendorUniqueId), scope.vendorSlotInfo)
            .then(function(data) {
                    // scope.overviewInfo = data;
                    // console.log(data);
                },
                function(response) {
                    console.log('albums retrieval failed.')
                });
    }


    factoryObj.updatePasswordInfo = function(scope) {
        var response;
        console.log(scope.overviewInfo);
        httpOperationFact.sendHttpPutJsonRequest(stringDBrepo.vChangePasswordURL(stringDBrepo.vendorUniqueId), scope.passwordObj)
            .then(function(data) {
                    scope.passwordObj.status = scope.passwordStatus.confirmState;
                },
                function(response) {
                    scope.passwordObj.status = scope.passwordStatus.pwdFail;
                    console.log('albums retrieval failed.')
                });
    }



    factoryObj.updateImageInfo = function(object) {
        var response;
        httpOperationFact.sendHttpPutJsonRequest(stringDBrepo.vUpdateCameraPicURL(stringDBrepo.vendorUniqueId), object)
            .then(function(data) {
                $state.go($state.current, {}, {reload: true});
            },
                function(response) {
                    console.log('albums retrieval failed.')
                });
    }

    factoryObj.deleteImageInfo = function(imageName, imageScope) {
        var response;
        httpOperationFact.sendHttpPutJsonRequest(stringDBrepo.vDeleteCameraPicURL(stringDBrepo.vendorUniqueId,imageName))
            .then(function(data) {
                imageScope.status = false;
            },
                function(response) {
                    // imageScope.status = true;
                    console.log('albums retrieval failed.')
                });
    }


    factoryObj.getImageInfo = function(imageName, imageScope) {
        var response;
        httpOperationFact.sendHttpGetRequest(stringDBrepo.vGetCameraPicURL(stringDBrepo.vendorUniqueId,imageName))
            .then(function(data) {                    
                    imageScope.status = true;
                    console.log("image exist");
                },
                function(response) {
                    imageScope.status = false;
                    console.log('image donot exit')
                });
    }





    return factoryObj;
});
