angular.module('starter.bookingList', ['ionic', 'ionic-timepicker', 'ionic-datepicker'])


.controller('booking-list-ctrl', function($scope, $stateParams, BookingListFact, stringDBrepo, sortBookingPopupFact) {
    $scope.bookingListArray = [];

    sortBookingPopupFact.initSortPopup($scope);



    // console.log($stateParams);
    $scope.sortingPopUpMethod = function() {
        $scope.sortingChoice.data = $scope.bookingSortOptions[0];
        sortBookingPopupFact.showPopup($scope);
    };

    $scope.selectedOptionEvent = function(option) {
        sortBookingPopupFact.sortBookingOnselect($scope, option);
    };


    if ($stateParams.calendarDetails.searchMobileNumber == 0) {
        var month = ("0" + $stateParams.calendarDetails.month).slice(-2);
        var dateNum = ("0" + $stateParams.calendarDetails.dayNumber).slice(-2);

        $scope.HeaderTitle = "Booking Date";

        $scope.HeaderDetails = dateNum + "/" + month + "/" + $stateParams.calendarDetails.year;

        // if (($stateParams.calendarDetails.requestPending) || ($stateParams.calendarDetails.vehiclePending))
        BookingListFact.getBookingInfoUsingDate(stringDBrepo.vendorUniqueId, $scope, $stateParams.calendarDetails.dateInSecs);

    } else {
        $scope.HeaderTitle = "Person Number";
        $scope.HeaderDetails = $stateParams.calendarDetails.searchMobileNumber;
        BookingListFact.getUserBookingDetailsUsingMobileNum(stringDBrepo.vendorUniqueId, $scope, $stateParams.calendarDetails.searchMobileNumber);
    }


});
