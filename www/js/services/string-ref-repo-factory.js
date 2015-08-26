angular.module('starter')

.factory('stringDBrepo', function($http, $q) {
    var factoryObj = {};
    /***********************************************http urls***************************************************************/
    factoryObj.baseUrl = 'http://localhost/CarOne/';
    factoryObj.vBookingStatusCount = function(uniqueId, month, year){
    	if(month && year)
    		return factoryObj.baseUrl + "vendor/"+ uniqueId +"/booking/status/count?month="+ month +"&year="+ year ;
    	else
    		return factoryObj.baseUrl + "vendor/"+ uniqueId +"/booking/status/count";
    };

    factoryObj.vRatingAndLikeDetails = function(uniqueId){
        return factoryObj.baseUrl + "meta/vendor/"+ uniqueId +"/rating";
    };
    


    factoryObj.vsearchByMobileNumber = function(uniqueId, mobileNumber, dateInSeconds){
        if(dateInSeconds)
            return factoryObj.baseUrl + "vendor/"+ uniqueId + "/booking/phone/" + mobileNumber +"?date=" + dateInSeconds;
        else
            return factoryObj.baseUrl + "vendor/"+ uniqueId + "/booking/phone/" + mobileNumber;
    };

    return factoryObj;
});
