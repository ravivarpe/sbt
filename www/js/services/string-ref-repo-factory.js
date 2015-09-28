angular.module('starter')

.factory('stringDBrepo', function($http, $q) {
    var factoryObj = {};
    /***********************************************http urls***************************************************************/
    // factoryObj.baseUrl = 'http://52.88.98.165/vehito/';
    factoryObj.baseUrl = 'http://api.vehito.com/vehito/';

    /*****************************vendor home page url***********************************************************************/
    factoryObj.vendorUniqueId = "";
    factoryObj.gBookingListInfo = "";

    factoryObj.setUserUUID = function(name) {
        this.vendorUniqueId = name;
    };

    factoryObj.vOverviewInfoURL = function(uniqueId) {
        return factoryObj.baseUrl + "meta/vendor/" + uniqueId + "/overview/info";
    };
    factoryObj.vUpdateOverviewInfoURL = function(uniqueId) {
        return factoryObj.baseUrl + "update/vendor/" + uniqueId + "/overview/info";
    };

    factoryObj.vPersonalInfoURL = function(uniqueId) {
        return factoryObj.baseUrl + "meta/vendor/" + uniqueId + "/personal/info";
    };
    factoryObj.vUpdatePersonalInfoURL = function(uniqueId) {
        return factoryObj.baseUrl + "update/vendor/" + uniqueId + "/personal/details";
    };



    factoryObj.vHolidaysListInfoURL = function(uniqueId) {
        return factoryObj.baseUrl + "meta/vendor/" + uniqueId + "/holidays";
    };
    factoryObj.vUpdateHolidaysListInfoURL = function(uniqueId) {
        return factoryObj.baseUrl + "update/vendor/" + uniqueId + "/holiday";
    };
    factoryObj.vdeleteHolidayInfoURL = function(uniqueId) {
        return factoryObj.baseUrl + "update/vendor/" + uniqueId + "/holiday/delete";
    };
    /**
     * change password
     */
    factoryObj.vChangePasswordURL = function(uniqueId) {
        return factoryObj.baseUrl + "update/vendor/" + uniqueId + "/password";
    };


    /**
     * FORGOT PASSWORD URL
     */
    factoryObj.vForgotPasswordURL = function(emailId, sendToForTest) {
        if (sendToForTest)
            return factoryObj.baseUrl + "user/" + emailId + "/forgotpassword?sendto=" + sendToForTest;
        else
            return factoryObj.baseUrl + "user/" + emailId + "/forgotpassword";
    };

    /**
     * 
     */

    /**
     * camera url
     */
    factoryObj.vUpdateCameraPicURL = function(uniqueId) {
        return factoryObj.baseUrl + "vendor/" + uniqueId + "/files/upload";
    };
    factoryObj.vDeleteCameraPicURL = function(uniqueId, imageName) {
        return factoryObj.baseUrl + "vendor/" + uniqueId + "/delete/image/file?name=" + imageName;
    };
    factoryObj.vGetCameraPicURL = function(uniqueId, imageName) {
        return factoryObj.baseUrl + "storage/vendor/" + uniqueId + "/images/" + imageName;
    };



    factoryObj.vDailySlotsInfoURL = function(uniqueId) {
        return factoryObj.baseUrl + "meta/vendor/" + uniqueId + "/slots";
    };
    factoryObj.vUpdateDailySlotsInfoURL = function(uniqueId) {
        return factoryObj.baseUrl + "update/vendor/" + uniqueId + "/daily/slots";
    };



    factoryObj.vGlobalServiceListInfoURL = function(serviceType, vehicleType) {
        return factoryObj.baseUrl + "global/" + serviceType + "/?type=" + vehicleType;
    };
    factoryObj.vUpdateGlobalServiceListInfoURL = function(serviceType, options, vehicleType) {
        return factoryObj.baseUrl + options + "/global/" + serviceType + "/?type=" + vehicleType;
    };

    factoryObj.vLocalServiceListInfoURL = function(uniqueId, serviceType) {
        return factoryObj.baseUrl + "meta/vendor/" + uniqueId + "/get/" + serviceType;
    };
    factoryObj.vUpdateLocalServiceListInfoURL = function(uniqueId, serviceType, options) {
        return factoryObj.baseUrl + options + "/vendor/" + uniqueId + "/" + serviceType;
    };




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

    factoryObj.vLoginInfo = function() {
        return factoryObj.baseUrl + "vendor/login/";
    };

    factoryObj.vendorUniqueIdFromEmail = function(email) {
        return factoryObj.baseUrl + "meta/vendor/userNames/email/" + email;
    };

    factoryObj.vendorUniqueIdFromPhone = function(phone) {
        return factoryObj.baseUrl + "meta/vendor/userNames/phone/" + phone;
    };

    factoryObj.createVendor = function(passwd) {
        return factoryObj.baseUrl + "vendor/signup/" + passwd;
    };


    factoryObj.updateService = function() {
        return factoryObj.baseUrl + "update/popup/service/";
    };


    /**
     * count and list information for home
     */

    factoryObj.getAllStatusCount = function(uniqueId) {
        return factoryObj.baseUrl + "vendor/" + uniqueId + "/booking/status/all/count";
    };
    factoryObj.getDayStatusCount = function(uniqueId, dateInSecs) {
        return factoryObj.baseUrl + "vendor/" + uniqueId + "/booking/day/status/count?date=" + dateInSecs;
    };
    factoryObj.getAllStausList = function(uniqueId, status, from, to) {
        return factoryObj.baseUrl + "vendor/" + uniqueId + "/booking/status/" + status + "?from=" + from + "&to=" + to;
    };
    factoryObj.getDeliveryListUrl = function(uniqueId, month, year) {
        return factoryObj.baseUrl + "vendor/" + uniqueId + "/booking/delivery?month" + month + "&year=" + year;
    };
    factoryObj.getDayStatusList = function(uniqueId, status, dateInSecs, from, to) {
        return factoryObj.baseUrl + "vendor/" + uniqueId + "/booking/day/status/" + status + "?date=" + dateInSecs + "&from=" + from + "&to=" + to;
    };

    /****************************************************************************************************************************/

    return factoryObj;
});
