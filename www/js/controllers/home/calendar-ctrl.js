angular.module('starter.home')


.controller('calendar-ctrl', function($scope, CalendarDetailsFact, VendorInfoFact) {


    $scope.calendarTable = {};
    $scope.calendarTable.dayCount = 7;




    $scope.calendarArray = [];
    var dayArrayInfo = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    var monthArrayInfo = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


    var date = new Date();

    CalendarDetailsFact.setCalendarDayInfo($scope, date.getFullYear(), (date.getMonth() + 1));
    

    // CalendarDetailsFact.getNumberOfDaysInMonth(date.getFullYear(), (date.getMonth() + 1));
    // CalendarDetailsFact.getCurrentDayNumber(date.getFullYear(), date.getMonth() + 1, 1);
    // console.log(CalendarDetailsFact.currentDayNumber);

    // for (var i = 1; i <= CalendarDetailsFact.noOfDaysInMonth; i++) {
    //     var dayInformation = {};
    //     dayInformation.dayNumber = i;
    //     dayInformation.requestPending = true;
    //     dayInformation.vehiclePending = false;
    //     dayInformation.dayName = dayArrayInfo[CalendarDetailsFact.currentDayNumber % 7];
    //     // console.log(dayArrayInfo[CalendarDetailsFact.currentDayNumber%7]);
    //     CalendarDetailsFact.currentDayNumber++;
    //     $scope.calendarArray.push(dayInformation);
    // }

    // $scope.calendarTable.rowCount = ((CalendarDetailsFact.noOfDaysInMonth / 7) > Math.round(CalendarDetailsFact.noOfDaysInMonth / 7)) ? Math.round(CalendarDetailsFact.noOfDaysInMonth / 7) + 1 : Math.round(CalendarDetailsFact.noOfDaysInMonth / 7);

    // console.log($scope.calendarTable.rowCount);

    // console.log($scope.calendarArray);

    $scope.calendarYear = date.getFullYear();
    $scope.calendarMonth = monthArrayInfo[date.getMonth()];
    
    VendorInfoFact.setVendorRatingInfo($scope, 3);
    VendorInfoFact.setVendorLikesInfo($scope, 20);

    var currentMonthNumber = date.getMonth();
    var currentYearNumber = date.getFullYear();


    $scope.IncrementMonthArrow = function() {
        // $scope.calendarYear = 2012;
        currentMonthNumber++;

        if (currentMonthNumber > 11) {
            currentMonthNumber = 0;
            currentYearNumber++;
        }

        $scope.calendarMonth = monthArrayInfo[currentMonthNumber];
        $scope.calendarYear = currentYearNumber;
        //$scope.calendarTable.rowCount = 4;

        CalendarDetailsFact.setCalendarDayInfo($scope, currentYearNumber, (currentMonthNumber + 1));
        console.log("inc arrow got clicked");
    }

    $scope.DecrementMonthArrow = function() {
        // $scope.calendarYear = 2012;
        currentMonthNumber--;

        if (currentMonthNumber < 0) {
            currentMonthNumber = 11;
            currentYearNumber--;
        }

        $scope.calendarMonth = monthArrayInfo[currentMonthNumber];
        $scope.calendarYear = currentYearNumber;
        // $scope.calendarTable.rowCount = 4;
        CalendarDetailsFact.setCalendarDayInfo($scope, currentYearNumber, (currentMonthNumber + 1));

        console.log("dec arrow got clicked");
    }

    $scope.DateInformation = function(dateInfo){
        // console.log(dateInfo);
        CalendarDetailsFact.setDayStatusInfo($scope, dateInfo);

    }

});
