angular.module('starter.bookingDetails')


.controller('booking-details-modal-ctrl', function($scope, $ionicModal, $timeout, BookingDetailsFact) {

    // alert("aaaaaaaaaaa");
    $scope.loginData = {};

    /*******loading information*************/
    $scope.modalDisplayInfo = {};
    // console.log(BookingDetailsFact.stateDetails);
    $scope.BookingDetailsModalEnableArray = BookingDetailsFact.stateDetails;
    $scope.vehiclePickupIndex = BookingDetailsFact.sendPersonForPickup;


    /***************************************/

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/bookingDetailsModal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the modal to close it
    $scope.closeBookingModal = function() {
        console.log("closed");
        $scope.modal.hide();
    };

    $scope.updateBookingModal = function(state) {
        var i = 0;
        console.log(state);
        
        for (i = 0; i < $scope.bookingStatusArrayItems.length; i++) {
            if ($scope.bookingStatusArrayItems[i].statusIndex == $scope.modalDisplayInfo.statusIndex) {
                $scope.bookingStatusArrayItems[i].statusInfo = 1;
                break;
            }

        }
        if (i < ($scope.bookingStatusArrayItems.length - 1)) {
            $scope.bookingStatusArrayItems[i + 1].statusInfo = 4;
        }
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.bookingDetailStatusModal = function(selectedElement) {
        $scope.modalDisplayInfo = selectedElement;
        $scope.modal.show();
        

        console.log(selectedElement);

    };

    // Open the login modal
    /*$scope.bookingDetailStatusModal = function(selectedElement, elementArray) {
        var i = 0;
        for (i = 0; i < elementArray.length; i++) {
            if (elementArray[i].statusIndex == selectedElement.statusIndex) {
                elementArray[i].statusInfo = 1;
                break;
            }

        }
        if (i < (elementArray.length-1)) {
            elementArray[i + 1].statusInfo = 4;
        }


    };*/

    // Perform the login action when the user submits the login form
    $scope.applyBookingStatus = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        // $timeout(function() {
        //     $scope.closeLogin();
        // }, 1000);
    };



    // console.log($scope.BookingDetailsModalEnableArray);
});
