angular.module('starter.bookingDetails', ['ionic', 'ionic-datepicker'])


.controller('booking-details-ctrl', function($scope, $stateParams, BookingDetailsFact) {
	$scope.bookingDetailsArray = [];
	$scope.bookingStatusArrayItems = [];
	$scope.bookingDetailsArray.length = 0;
	// console.log($stateParams.bookingDetailsInfo);
	$scope.bookingDetailsArray.push($stateParams.bookingDetailsInfo);
	$scope.sendPickupPersonIndex = $scope.bookingDetailsArray[0].bookingStatus & BookingDetailsFact.sendPersonForPickup;
	console.log();
	$scope.HeaderBookingDate = $stateParams.bookingDetailsInfo.vehicleDeliveredTimeFormat;
 //    BookingListFact.setCalendarDayInfo($scope);
    // console.log($scope);

    BookingDetailsFact.setBookingLiveStatus($scope);
});
