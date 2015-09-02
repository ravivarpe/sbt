angular.module('starter.bookingList')


.factory('sortBookingPopupFact', function($ionicPopup) {
    var factoryObj = {};
    factoryObj.sortingPopup;


    factoryObj.initSortPopup = function(scope) {
        scope.sortingChoice = {
            data: {
                name: "Confirm Booking",
                status: 1
            }
        };
        scope.bookingSortOptions = [{
            name: "All",
            status: 1
        }, {
            name: "Pending request",
            status: 2
        }, {
            name: "pendings services",
            status: 3
        }, {
            name: "Previous pending",
            status: 4
        }];
    };

    factoryObj.showPopup = function($scope) {
        // $scope.data = {}


        // An elaborate, custom popup
        factoryObj.sortingPopup = $ionicPopup.show({
            templateUrl: 'templates/bookingSortPopup.html',
            scope: $scope,
            title: "sort options",
        });
        // sortingPopup.then(function(res) {
        //     console.log('Tapped!', res);
        //     sortingPopup.close();
        // });


        // $timeout(function() {
        //     sortingPopup.close(); //close the popup after 3 seconds for some reason
        // }, 3000);
    };

    factoryObj.sortBookingOnselect = function(scope, selectedOption) {
        console.log(selectedOption);
        factoryObj.sortingPopup.close();
    };


    return factoryObj;
});
