angular.module('starter')

.factory('stringDBrepo', function($http, $q) {
    var factoryObj = {};
    /***********************************************http urls***************************************************************/
    factoryObj.baseUrl = 'http://52.88.98.165/vehito/';

    /*****************************vendor home page url***********************************************************************/
    factoryObj.vendorUniqueId = "94541329261441094333624";
    factoryObj.vBookingStatusCount = function(uniqueId, month, year) {
        if (month && year)
            return factoryObj.baseUrl + "vendor/" + uniqueId + "/booking/status/count?month=" + month + "&year=" + year;
        else
            return factoryObj.baseUrl + "vendor/" + uniqueId + "/booking/status/count";
    };

    factoryObj.vRatingAndLikeDetails = function(uniqueId) {
        return factoryObj.baseUrl + "meta/vendor/" + uniqueId + "/rating";
    };


    factoryObj.vsearchByMobileNumber = function(uniqueId, mobileNumber) {
        return factoryObj.baseUrl + "vendor/" + uniqueId + "/booking/phone/" + mobileNumber + "/all";
    };


    factoryObj.vBookingInfoViaDay = function(uniqueId, dateInSecs) {
        return factoryObj.baseUrl + "vendor/" + uniqueId + "/booking?date=" + dateInSecs;
    };


    factoryObj.vUpdateBookingInfo = function(uniqueId) {
        return factoryObj.baseUrl + "vendor/" + uniqueId + "/booking/update";
    };
    /****************************************************************************************************************************/

    return factoryObj;
});
