angular.module('starter.bookingList', ['ionic'])


.controller('booking-list-ctrl', function($scope, $stateParams, BookingListFact) {
    $scope.bookingListArray = [];

    // console.log($stateParams);

    // date = new Date($stateParams.calendarDetails*1000);
    var month = ("0" + $stateParams.calendarDetails.month).slice(-2);
    var dateNum = ("0" + $stateParams.calendarDetails.dayNumber).slice(-2);

    $scope.HeaderBookingDate = dateNum + "/" + month + "/" + $stateParams.calendarDetails.year;

    if (($stateParams.calendarDetails.requestPending) || ($stateParams.calendarDetails.vehiclePending))
        BookingListFact.setCalendarDayInfo($scope);

});
