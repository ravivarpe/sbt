angular.module('starter.bookingList')


.controller('booking-list-modal-ctrl', function($scope, $ionicModal, $timeout) {

    // alert("aaaaaaaaaaa");
    $scope.loginData = {};

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
    $scope.bookingStatusModal = function() {
        $scope.modal.show();
        // console.log("came here");

    };

    // Perform the login action when the user submits the login form
    $scope.applyBookingStatus = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        // $timeout(function() {
        //     $scope.closeLogin();
        // }, 1000);
    };
});
