angular.module('starter.bookingList')


.controller('booking-list-modal-ctrl', function($scope, $ionicModal, $timeout, BookingDetailsFact) {

    // alert("aaaaaaaaaaa");
    $scope.loginData = {};
    var bookingIndex = 0;

    $scope.modalInfo = {
        confirmString: "Confirm",
        cancelString: "Cancel"
    };

    $scope.UserChoice = {
        data: {
            name: "",
            status: 1
        }
    };
    $scope.modalConfirmInfo = [{
        name: "Confirm Booking",
        status: 1
    }, {
        name: "Vehicle not supported",
        status: 2
    }, {
        name: "Pickup/Drop unavailable",
        status: 3
    }, {
        name: "Unexpected Holiday",
        status: 4
    }, {
        name: "insufficient staff",
        status: 5
    }];


    $scope.modalCancelInfo = [{
        name: "Unexpected Holiday",
        status: 128
    }, {
        name: "User request to cancel",
        status: 129
    }, {
        name: "insufficient staff",
        status: 130
    }];

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/bookingListModal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeBookingModal = function() {
        console.log("closed");
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.bookingStatusModal = function(data, index) {
        console.log(index);
        bookingIndex = index;
        // if (data.requestAcceptString == $scope.modalInfo.confirmString)
        //     $scope.UserChoice = 1;
        // else
        //     $scope.UserChoice = 128;
        $scope.BookingDetails = data;
        $scope.modal.show();
    };




    // Perform the login action when the user submits the login form
    $scope.applyBookingStatus = function(choice) {
        console.log(choice);

        if (choice.status == 1) {
            $scope.bookingListArray[bookingIndex].bookingStatus |= BookingDetailsFact.confirmRequest;
        } else {
            $scope.bookingListArray[bookingIndex].bookingStatus |= BookingDetailsFact.cancelRequest;
        }


        $scope.setBookingStatusInfo($scope.bookingListArray[bookingIndex]);
        $scope.modal.hide();

    };


    $scope.setBookingStatusInfo = function(bookingObj) {

        if (bookingObj.bookingStatus & BookingDetailsFact.requestPending) {
            bookingObj.BookingStatusColor = "booking-pending-status";
            bookingObj.BookingStatusString = "Pending";
            bookingObj.requestAcceptString = "Confirm";
        }
        if ((bookingObj.bookingStatus & BookingDetailsFact.confirmRequest) || (bookingObj.bookingStatus >= BookingDetailsFact.sendPersonForPickup)) {
            bookingObj.BookingStatusColor = "booking-confirm-status";
            bookingObj.BookingStatusString = "Confirm";
            bookingObj.requestAcceptString = "Cancel";
        }
        if (bookingObj.bookingStatus & BookingDetailsFact.cancelRequest) {
            bookingObj.BookingStatusColor = "booking-cancel-status";
            bookingObj.BookingStatusString = "Cancelled";
            bookingObj.requestAcceptString = "discard";
        }
    };




});
