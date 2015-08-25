angular.module('starter')

.factory('stringDBrepo', function($http, $q) {
    var factoryObj = {};
    /***********************************************http urls***************************************************************/
    factoryObj.baseUrl = 'http://192.168.1.50/CarOne/';
    factoryObj.vBookingStatusCount = function(uniqueId, month, year){
    	if(month && year)
    		return factoryObj.baseUrl + "vendor/"+ uniqueId +"/booking/status/count?month="+ month +"&year="+ year ;
    	else
    		return factoryObj.baseUrl + "vendor/"+ uniqueId +"/booking/status/count";
    };
    

    return factoryObj;
});
