angular.module('starter.userSettings', ['ionic', 'ngMessages'])


.controller('user-settings-ctrl', function($scope, userDetailsFact) {

    // $scope.checkedInfo = true;
    $scope.personalInfoTitle = {
        "Heading": "Personal information",
        "Checked": false
    };
    $scope.contactInfoTitle = {
        "Heading": "Contact information",
        "Checked": false
    };
    $scope.serviceInfoTitle = {
        "Heading": "Services information",
        "Checked": false
    };
    $scope.soltInfoTitle = {
        "Heading": "Slot information",
        "Checked": false
    };

    $scope.options = {
        types: '(cities)',
        country: 'in'
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

    $scope.vendorSlotInfo = {
        "Sunday": 0,
        "Monday": 0,
        "Tuesday": 0,
        "Wednesday": 0,
        "Thursday": 0,
        "Friday": 0,
        "Saturday": 0
    };


    $scope.vendorServiceVehicleType = [{
        "type": "Car Service only",
        "value": 0
    }, {
        "type": "Bike Service only",
        "value": 1
    }];

    $scope.selectedServiceType = {
         value: 0
    };

    userDetailsFact.getPersonalOverviewInfo($scope);
    userDetailsFact.getVendorOverviewInfo($scope);




    $scope.SavePersonalInfo = function() {
        // console.log($scope.selectedServiceType.value);
        $scope.overviewInfo.vendorVehicleServiceType = $scope.selectedServiceType.value;
        userDetailsFact.updateVendorOverviewInfo($scope);
        userDetailsFact.updatePersonalOverviewInfo($scope);
    }





});
