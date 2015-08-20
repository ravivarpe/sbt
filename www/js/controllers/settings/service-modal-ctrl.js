angular.module('starter.serviceConfig')


.controller('service-config-modal-ctrl', function($scope, $ionicModal, $timeout) {

    // alert("aaaaaaaaaaa");
    $scope.loginData = {};
    $scope.choice = "A";

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/serviceConfigModal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeServiceModal = function() {
        console.log("closed");
        $scope.modal.hide();
    };

    $scope.updateServiceModal = function() {

        $scope.modal.hide();
    };

    // Open the login modal
    $scope.serviceStatusModal = function() {
        $scope.modal.show();

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
