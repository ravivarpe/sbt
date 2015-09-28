angular.module('starter.bookingList', ['ionic', 'ionic-timepicker', 'ionic-datepicker'])


.controller('booking-list-ctrl', function($scope, $ionicNavBarDelegate, $stateParams, BookingListFact, stringDBrepo, sortBookingPopupFact) {
    $scope.bookingListArray = [];

    sortBookingPopupFact.initSortPopup($scope);

    $ionicNavBarDelegate.showBackButton(true);

    // console.log($stateParams);
    $scope.sortingPopUpMethod = function() {
        // $scope.sortingChoice.data = $scope.bookingSortOptions[0];
        sortBookingPopupFact.showPopup($scope);
    };

    $scope.selectedOptionEvent = function(option) {
        sortBookingPopupFact.sortBookingOnselect($scope, option, $stateParams.calendarDetails.dateInSecs);
    };


    if ($stateParams.calendarDetails.searchMobileNumber == 0) {
        var month = ("0" + $stateParams.calendarDetails.month).slice(-2);
        var dateNum = ("0" + $stateParams.calendarDetails.dayNumber).slice(-2);

        $scope.HeaderTitle = "Booking Date";

        $scope.HeaderDetails = dateNum + "/" + month + "/" + $stateParams.calendarDetails.year;

        // if (($stateParams.calendarDetails.requestPending) || ($stateParams.calendarDetails.vehiclePending))
        if ($stateParams.calendarDetails.pullType == "total") {
            $scope.HeaderTitle = "All Bookings";
            $scope.HeaderDetails = "";
            BookingListFact.getAllStatusLists(stringDBrepo.vendorUniqueId, $scope, "total", "", "");
        } else
            BookingListFact.getBookingInfoUsingDate(stringDBrepo.vendorUniqueId, $scope, $stateParams.calendarDetails.dateInSecs);

    } else {
        $scope.HeaderTitle = "Person Number";
        $scope.HeaderDetails = $stateParams.calendarDetails.searchMobileNumber;
        BookingListFact.getUserBookingDetailsUsingMobileNum(stringDBrepo.vendorUniqueId, $scope, $stateParams.calendarDetails.searchMobileNumber);
    }

    $scope.refreshBookingList = function() {
        var month = ("0" + $stateParams.calendarDetails.month).slice(-2);
        var dateNum = ("0" + $stateParams.calendarDetails.dayNumber).slice(-2);

        $scope.HeaderTitle = "Booking Date";

        $scope.HeaderDetails = dateNum + "/" + month + "/" + $stateParams.calendarDetails.year;

        // if (($stateParams.calendarDetails.requestPending) || ($stateParams.calendarDetails.vehiclePending))
        BookingListFact.getDayStatusList(stringDBrepo.vendorUniqueId, $scope, "total", $stateParams.calendarDetails.dateInSecs, 0, 9);
    };


    //  $scope.loadMoreBookingList = function() {        
    //     console.log("loading");
    //     var len = $scope.bookingListArray.length;
    //     BookingListFact.getDayStatusList(stringDBrepo.vendorUniqueId, $scope,"total", $stateParams.calendarDetails.dateInSecs,len,len+9);



    //     $scope.$broadcast('scroll.infiniteScrollComplete');
    // };


});
