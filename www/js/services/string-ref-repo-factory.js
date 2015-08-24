angular.module('starter')

.factory('stringDBrepo', function($http, $q) {
    var factoryObj = {};
    /***********************************************http urls***************************************************************/
    factoryObj.baseUrl = 'http://127.0.0.1/CarOne/';
    factoryObj.vBookingStatusCount = function(uniqueId){
    	return factoryObj.baseUrl + "vendor/"+ uniqueId +"/booking/status/count";
    };


    return factoryObj;
});
