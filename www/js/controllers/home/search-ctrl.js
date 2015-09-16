angular.module('starter')


.controller('search-home-ctrl', function($scope, searchService, $ionicModal, $timeout, $state,AuthService) {

    // alert($scope.MoblieNumber);
    $scope.onlyNumbers = /^[0-9]+$/;
    $scope.MoblieNumber = "";


    if (!AuthService.isAuthenticated()) {
            event.preventDefault();
            $state.go('login');
    }

    $scope.searchByMobile = function(searchContent) {
        var SelectedDateBookingInfo = {};
        // console.log($state.current.name);
        if (searchContent) {
            SelectedDateBookingInfo.searchMobileNumber = searchContent;
            if ($state.current.name == "vendor-app.bookingList")
                $state.transitionTo($state.current, {
                    calendarDetails: SelectedDateBookingInfo
                }, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
            else
                $state.go('vendor-app.bookingList', {
                    calendarDetails: SelectedDateBookingInfo
                });
            $scope.closeSearchModal();
        }
        // searchService.getUserBookingDetailsUsingMobileNum(stringDBrepo.vendorUniqueId, searchContent);
    };



    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/search.html', {
        scope: $scope,
        animation: 'slide-in-left'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeSearchModal = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.openSearchModal = function() {
        $scope.modal.show();
        // console.log("came here");

    };

});
