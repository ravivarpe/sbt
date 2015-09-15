angular.module('starter')

.factory('httpOperationFact', function($http, $q, dataLoaderFact) {
    var factoryObj = {};
    factoryObj.httpResponse = "";

    factoryObj.sendHttpGetRequest = function(URL) {
        var def = $q.defer();
        dataLoaderFact.show();
        var req = {
            method: 'GET',
            url: URL,
        };

        $http(req).
        then(function(response) {
            // this callback will be called asynchronously
            // when the response is available
            factoryObj.httpResponse = response;
            dataLoaderFact.hide();
            def.resolve(response.data);
        }, function(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            factoryObj.httpResponse = response;
            dataLoaderFact.hide();
            def.reject(response);
        });
        return def.promise;
    };



    factoryObj.sendHttpPostJsonRequest = function(URL, UserData) {
        var def = $q.defer();
        dataLoaderFact.show();
        var req = {
            method: 'POST',
            url: URL,
            headers: { 'Content-Type': 'application/json' },
            data: UserData
        }

        $http(req).
        then(function(response) {
            // this callback will be called asynchronously
            // when the response is available
            factoryObj.httpResponse = response;
            dataLoaderFact.hide();
            def.resolve(response.data);
        }, function(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            factoryObj.httpResponse = response;
            dataLoaderFact.hide();
            def.reject(response);
        });
        return def.promise;
    };

    factoryObj.sendHttpPutJsonRequest = function(URL, UserData) {
        var def = $q.defer();
        dataLoaderFact.show();
        // console.log(UserData);
        var req = {
            method: 'PUT',
            url: URL,
            headers: { 'Content-Type': 'application/json' },
            data: UserData
        }

        $http(req).
        then(function(response) {
            // this callback will be called asynchronously
            // when the response is available
            factoryObj.httpResponse = response;
            dataLoaderFact.hide();
            def.resolve(response.data);
        }, function(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            factoryObj.httpResponse = response;
            dataLoaderFact.hide();
            def.reject(response);
        });
        return def.promise;

    };

    return factoryObj;
});
