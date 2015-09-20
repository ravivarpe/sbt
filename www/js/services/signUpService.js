angular.module('signup.services', ['ionic'])

.service('SignupService', function($q, $http, httpOperationFact, stringDBrepo) {
    var globalServicesJson;
    var globalVehicleJson;

    this.checkemail = function(email) {
        return $q(function(resolve, reject) {
            httpOperationFact.sendHttpGetRequest(stringDBrepo.vendorUniqueIdFromEmail(email)).then(function(data) {
                    console.log(data);
                    reject('UserExists.');
                },
                function(response) {
                    console.log('login failed')
                    resolve('Doesnt Exists');
                });
        });
    };

    this.checkPhoneNumber = function(phone) {
        return $q(function(resolve, reject) {
            httpOperationFact.sendHttpGetRequest(stringDBrepo.vendorUniqueIdFromPhone(phone)).then(function(data) {
                    console.log(data);
                    reject('UserExists.');
                },
                function(response) {
                    console.log('login failed')
                    resolve('Doesnt Exists');
                });
        });
    };

    this.createAccount = function(object, passwd) {
        console.log(object);
        return $q(function(resolve, reject) {
            httpOperationFact.sendHttpPutJsonRequest(stringDBrepo.createVendor(passwd), object).then(function(data) {
                    console.log("here");
                    resolve('Account Created');
                },
                function(response) {
                    reject('I S E');
                });
        });
    };

    var getVehicleDetails = function(scope, response) {

        if (response.length == 0){
        	scope.vendorGlobalVehicleList = [];
            return;
        }
        for (var i in response) {
            delete response[i].list;
            response[i].index = i;
        }
        scope.vendorGlobalVehicleList = response;
        scope.selectedVehicle = {
            "index": response[0].index,
        };

    };

    this.getGlobalVehicleListInfo = function(scope, vehicleType) {
        console.log(stringDBrepo.vGlobalServiceListInfoURL("vehicles", vehicleType));
        httpOperationFact.sendHttpGetRequest(stringDBrepo.vGlobalServiceListInfoURL("vehicles", vehicleType))
            .then(function(data) {
                    console.log(data);
                    getVehicleDetails(scope, data);

                },
                function(response) {
                    console.log('albums retrieval failed.')
                });
    };




});
