angular.module('starter.userSettings', ['ionic', 'ngMessages'])


.controller('user-settings-ctrl', function($scope) {

    // $scope.checkedInfo = true;
    $scope.personalInfo = {};
    $scope.contactInfo = {};
    $scope.personalInfo.Checked = false;
    $scope.personalInfo.Heading = "Personal information";
    $scope.contactInfo.Checked = true;
    $scope.contactInfo.Heading = "Contact information";

    $scope.options = {
        types: '(cities)',
        country: 'in'
    };



});
