angular.module('starter.userSettings', ['ionic', 'ngMessages'])


.controller('user-settings-ctrl', function($scope, userDetailsFact) {

    // $scope.checkedInfo = true;
    $scope.personalInfoTitle = {
        "Heading": "General",
        "Checked": false,
        "index":0
    };
    $scope.contactInfoTitle = {
        "Heading": "Contact",
        "Checked": false,
        "index":1
    };
    $scope.serviceInfoTitle = {
        "Heading": "Cost & Delivery",
        "Checked": false,
        "index":2
    };
    $scope.soltInfoTitle = {
        "Heading": "Slots",
        "Checked": false,
        "index":4
    };
    $scope.accountInfoTitle = {
        "Heading": "Profile",
        "Checked": false,
        "index":5
    };

    $scope.overviewInfo = {
        "authorization": "",
        "latitude": 0,
        "longitude": 0,
        "numberOfLikes": "",
        "minServiceCharge": "",
        "minWaitingTime": "",
        "numberOfusersGivenRatings": "",
        "rating": "",
        "ratingSum": "",
        "primaryEmailID": "",
        "primaryPhoneNumber": "",
        "uniqueId": "",
        "zipCode": "",
        "pickUpOrDrop": "",
        "currencyType": "",
        "vendorVehicleServiceType": ""
    };

    $scope.personalInfo = {
        "address": "",
        "altEmailAddress": "",
        "altLandLineNum": "",
        "description": "",
        "yearOfEstablish": "",
        "faxNumber": "",
        "primaryMobileNumber": "",
        "stdCode": "",
        "city": "",
        "PersonalState": "",
        "country": "",
        "vendorName": "",
        "state": "",
        "vendorTitle": "",
        "primaryLandLineNum": ""
    };


    $scope.vendorVerification = [{
        "status": "Not verified",
        "index" :0,
        "color":"#FA3F05"
    },
    {
        "status": "verified",
        "index":1,
        "color":"#09AC09"
    },
    {
        "status": "Silver Premium",
        "index":2,
        "color":"#1D9683"
    },
    {
        "status": "Gold Premium",
        "index":3,
        "color":"#BCA210"
    }];


    $scope.vendorServiceVehicleType = [{
        "type": "Car",
        "value": 0
    }, {
        "type": "Bike",
        "value": 1
    }];

    $scope.selectedServiceType = {
        value: 0
    };

    userDetailsFact.getPersonalOverviewInfo($scope);
    userDetailsFact.getVendorOverviewInfo($scope);



});
