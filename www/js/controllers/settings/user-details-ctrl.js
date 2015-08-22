angular.module('starter.userSettings', ['ionic'])


.controller('user-settings-ctrl', function($scope) {

    // $scope.checkedInfo = true;
    $scope.personalInfo = {};
    $scope.contactInfo = {};
    $scope.personalInfo.Checked = true;
    $scope.personalInfo.Heading = "Personal information";
    $scope.contactInfo.Checked = false;
    $scope.contactInfo.Heading = "Contact information";

    $scope.options = {
        types: '(cities)',
        country: 'in'
    };



});
