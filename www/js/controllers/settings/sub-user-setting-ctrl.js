angular.module('starter.subUserSettings', ['ionic', 'ngMessages'])


.controller('sub-user-settings-ctrl', function($scope, userDetailsFact, $stateParams) {


    // $scope.checkedInfo = true;
    $scope.itemInformation = [{
        "Heading": "General Settings",
        "Checked": false,
        "index": 0
    }, {
        "Heading": "Contact Settings",
        "Checked": false,
        "index": 1
    }, {
        "Heading": "Services Settings",
        "Checked": false,
        "index": 2
    }, {
        "Heading": "Slots Settings",
        "Checked": false,
        "index": 3
    }, {
        "Heading": "Profile Settings",
        "Checked": false,
        "index": 4
    }];

    $scope.selectedItemListIndex = $stateParams.settingsID;
    console.log($scope.selectedItemListIndex);
    // $scope.itemInformation[$stateParams.settingsID].Checked = true;


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
        "pickUpOrDrop": false,
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

    $scope.vendorVerification = [{
        "status": "Not verified",
        "index": 0,
        "color": "#FA3F05"
    }, {
        "status": "verified",
        "index": 1,
        "color": "#09AC09"
    }, {
        "status": "Silver Premium",
        "index": 2,
        "color": "#1D9683"
    }, {
        "status": "Gold Premium",
        "index": 3,
        "color": "#BCA210"
    }];


    $scope.vendorPickUpDropOptions = [{
        "type": "YES",
        "value": true
    }, {
        "type": "NO",
        "value": false
    }];

    $scope.selectedOptionType = {
        value: $scope.overviewInfo.pickUpOrDrop
    };

    userDetailsFact.getPersonalOverviewInfo($scope);
    userDetailsFact.getVendorOverviewInfo($scope);
    userDetailsFact.getVendorDailySlotsInfo($scope);

   $scope.changePickUpDropOption = function(option){
    $scope.overviewInfo.pickUpOrDrop = option.value;
   };

   
    // $scope.selectedOptionType.value = $scope.overviewInfo.pickUpOrDrop;
   


    $scope.SavePersonalInfo = function(checkForm) {
        // console.log(checkForm);
        if (!checkForm.$valid)
            return;
        console.log($scope);
        userDetailsFact.updateVendorOverviewInfo($scope);
        userDetailsFact.updatePersonalOverviewInfo($scope);
        userDetailsFact.updateVendorDailySlotsInfo($scope);
    }





});
