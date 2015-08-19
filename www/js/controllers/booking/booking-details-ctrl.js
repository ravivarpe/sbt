angular.module('starter.bookingDetails', ['ionic'])


.controller('booking-details-ctrl', function($scope, $stateParams, BookingDetailsFact) {
	$scope.bookingDetailsArray = [];
	$scope.bookingStatusArrayItems = [];
	$scope.bookingDetailsArray.length = 0;
	$scope.bookingDetailsArray.push($stateParams.bookingDetailsInfo);
	$scope.HeaderBookingDate = $stateParams.bookingDetailsInfo.VehicleDeliveryTimeFormat;
 //    BookingListFact.setCalendarDayInfo($scope);
    // console.log($scope);

    BookingDetailsFact.setBookingLiveStatus($scope, BookingDetailsFact.sumOfAllStatus);
});
