angular.module('starter.userSettings')

.factory('userDetailsFact', function() {
    var factoryObj = {};

    factoryObj.setUserPersonalInfo = function(scope){
    	scope.personalInfo.userName = "";
    };
    return factoryObj;
});
