angular.module('starter.bookingDetails')


.controller('booking-details-modal-ctrl', function($scope, $ionicModal, stringDBrepo , BookingDetailsFact, BookingListFact) {

    // alert("aaaaaaaaaaa");
    $scope.loginData = {};

    /*******loading information*************/
    $scope.modalDisplayInfo = {};
    // console.log(BookingDetailsFact.stateDetails);
    $scope.BookingDetailsModalEnableArray = BookingDetailsFact.stateDetails;
    $scope.vehiclePickupIndex = BookingDetailsFact.sendPersonForPickup;

    $scope.bookingChoice = {
        data: {
            option: "",
            id: 1,
            status: "",
            reason: ""
        }
    };

    /***************************************/

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/bookingDetailsModal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the modal to close it
    $scope.closeBookingModal = function() {
        // console.log("closed");
        $scope.modal.hide();
    };

    $scope.updateBookingModal = function(state) {
        var i = 0;
        // console.log($scope.modalDisplayInfo);

        for (i = 0; i < $scope.bookingStatusArrayItems.length; i++) {
            if ($scope.bookingStatusArrayItems[i].statusIndex == $scope.modalDisplayInfo.statusIndex) {
                $scope.bookingStatusArrayItems[i].statusInfo = 1;
                break;
            }
        }
        if (i < ($scope.bookingStatusArrayItems.length - 1)) {
            if (state.status == BookingDetailsFact.cancelLevel)
                $scope.bookingStatusArrayItems[i].statusInfo = 3;
            else if(state.status == BookingDetailsFact.sameLevel){
                $scope.bookingStatusArrayItems[i].statusInfo = 4;
                $scope.bookingStatusArrayItems[i].statusString = state.option;
            }
            else if((state.status == BookingDetailsFact.confirmLevel) && ($scope.bookingDetailsArray[0].bookingStatus & BookingDetailsFact.waitingForUserResponse)){
                $scope.bookingStatusArrayItems[i].statusInfo = 4;
                $scope.bookingStatusArrayItems[i].statusString = state.option;
            }
            else if(state.status == BookingDetailsFact.confirmLevel) 
                $scope.bookingStatusArrayItems[i + 1].statusInfo = 4;
        }




        if ((state.status == BookingDetailsFact.confirmLevel) && ($scope.bookingDetailsArray[0].bookingStatus & BookingDetailsFact.waitingForUserResponse)){
            $scope.bookingDetailsArray[0].bookingStatus &= (~BookingDetailsFact.waitingForUserResponse) ;
        }
        else if (state.status == BookingDetailsFact.confirmLevel){
            $scope.bookingDetailsArray[0].bookingStatus |= $scope.modalDisplayInfo.statusIndex ;
        }
        else if(state.status == BookingDetailsFact.sameLevel){
            $scope.bookingDetailsArray[0].bookingStatus |= BookingDetailsFact.waitingForUserResponse;
        }
        else if(state.status == BookingDetailsFact.cancelLevel){
            $scope.bookingDetailsArray[0].bookingStatus |= BookingDetailsFact.cancelRequest;
        }

        $scope.updateBookingDetails(state);
        $scope.modal.hide();
    };


    $scope.updateBookingDetails = function(selectedState) {
        var object = JSON.parse(JSON.stringify($scope.bookingDetailsArray[0]));

        BookingListFact.deleteBookingJsonKeys(object);

        object.bookingStatusReason = JSON.stringify(selectedState);
        // console.log(object);

        BookingListFact.updateBookingInformation(stringDBrepo.vendorUniqueId, object);
    }

    // Open the login modal
    $scope.bookingDetailStatusModal = function(selectedElement) {
        $scope.modalDisplayInfo = selectedElement;
        $scope.modal.show();

        $scope.selectDefaultOption(selectedElement);

        // console.log(selectedElement);
    };


    $scope.selectDefaultOption = function(selectState) {
        for (var i in BookingDetailsFact.stateDetails) {
            if (selectState.statusIndex == BookingDetailsFact.stateDetails[i].index) {
                $scope.bookingChoice.data = BookingDetailsFact.stateDetails[i].state[0];
            }
        }
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
