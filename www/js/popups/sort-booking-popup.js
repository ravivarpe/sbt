angular.module('starter.bookingList')


.factory('sortBookingPopupFact', function($ionicPopup,BookingListFact,stringDBrepo) {
    var factoryObj = {};
    factoryObj.sortingPopup;


    factoryObj.initSortPopup = function(scope) {
        scope.sortingChoice = {
            data: {
                name: "Confirm Booking",
                value: "confirmed",
                key: "day",
                status: 1
            }
        };
        scope.bookingSortOptions = [{
            name: "All",
            value: "total",
            key: "day",
            status: 1
        }, {
            name: "Pending",
            value: "pending",
            key: "day",
            status: 2
        },{
            name: "Accepted",
            value: "confirmed",
            key: "day",
            status: 3
        },{
            name: "On Going",
            value: "progress",
            key: "day",
            status: 4
        },{
            name: "Completed",
            value: "completed",
            key: "day",
            status: 5
        }, {
            name: "Cancelled",
            value: "cancelled",
            key: "day",
            status: 6
        }];
    };

    factoryObj.showPopup = function($scope) {
        // $scope.data = {}


        // An elaborate, custom popup
        factoryObj.sortingPopup = $ionicPopup.show({
            templateUrl: 'templates/bookingSortPopup.html',
            scope: $scope,
            title: "SEARCH FILTER"
        });
        // sortingPopup.then(function(res) {
        //     console.log('Tapped!', res);
        //     sortingPopup.close();
        // });


        // $timeout(function() {
        //     sortingPopup.close(); //close the popup after 3 seconds for some reason
        // }, 3000);
    };

    factoryObj.sortBookingOnselect = function(scope, selectedOption, dateInSecs) {
        console.log(selectedOption);
        console.log(selectedOption.value);
        BookingListFact.getDayStatusList(stringDBrepo.vendorUniqueId, scope, selectedOption.value, dateInSecs, '', '');
        factoryObj.sortingPopup.close();
    };

    factoryObj.closeSortingPopUp = function(){
        factoryObj.sortingPopup.close();
    };



    return factoryObj;
});