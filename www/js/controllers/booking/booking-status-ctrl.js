angular.module('starter.bookingList', ['ionic'])


.controller('booking-list-ctrl', function($scope, $stateParams, BookingListFact) {
    $scope.bookingListArray = [];

    // console.log($stateParams);

    if ($stateParams.calendarDetails.searchMobileNumber == 0) {
        var month = ("0" + $stateParams.calendarDetails.month).slice(-2);
        var dateNum = ("0" + $stateParams.calendarDetails.dayNumber).slice(-2);

        $scope.HeaderTitle = "Booking Date";

        $scope.HeaderDetails = dateNum + "/" + month + "/" + $stateParams.calendarDetails.year;

        if (($stateParams.calendarDetails.requestPending) || ($stateParams.calendarDetails.vehiclePending))
            BookingListFact.getBookingInfoUsingDate("94541329261440333885234", $scope, $stateParams.calendarDetails.dateInSecs);

    }
    else{
    	$scope.HeaderTitle = "Person Number";
        $scope.HeaderDetails = $stateParams.calendarDetails.searchMobileNumber;
        BookingListFact.getUserBookingDetailsUsingMobileNum("94541329261440333885234",$scope,  $stateParams.calendarDetails.searchMobileNumber);
    }


});
