angular.module('starter.bookingDetails', ['ionic'])


.controller('booking-details-ctrl', function($scope, $stateParams) {
	$scope.bookingListArray = [];
	$scope.bookingListArray.length = 0;
	$scope.bookingListArray.push($stateParams.bookingDetailsInfo);
	$scope.HeaderBookingDate = $stateParams.bookingDetailsInfo.VehicleDeliveryTimeFormat;
 //    BookingListFact.setCalendarDayInfo($scope);
    // console.log($stateParams.bookingDetailsInfo);
});
