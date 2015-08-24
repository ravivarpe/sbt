angular.module('starter')

.factory('httpOperationFact', function($http, $q) {
    var factoryObj = {};
    factoryObj.httpResponse = "";

    factoryObj.sendHttpGetRequest = function(URL) {
        var def = $q.defer();
        var req = {
            method: 'GET',
            url: URL,
        }

        $http(req).
        then(function(response) {
            // this callback will be called asynchronously
            // when the response is available
            factoryObj.httpResponse = response;
            def.resolve(response.data);
        }, function(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            factoryObj.httpResponse = response;
            def.reject(response);
        });
        return def.promise;
    };
    return factoryObj;
});
