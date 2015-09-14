angular.module('starter.userSettings')

.factory('userDetailsFact', function(httpOperationFact, stringDBrepo) {
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



    return factoryObj;
});
