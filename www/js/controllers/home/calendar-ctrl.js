angular.module('starter.home')


.controller('calendar-ctrl', function($scope, $http, CalendarDetailsFact, VendorInfoFact) {



    /*********************************http information*************************************************************************/


    // CalendarDetailsFact.getCalenarDayWiseInfo("94541329261440333885234");



    /**********************************calendar information*********************************************************************/
    $scope.calendarArray = [];
    $scope.calendarTable = {};
    $scope.calendarTable.dayCount = 7;
    $scope.daySelectHighlighter = "calendar-col-box";
    var dayArrayInfo = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    var monthArrayInfo = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


    var date = new Date();

    CalendarDetailsFact.setCalendarDayInfo($scope, date.getFullYear(), (date.getMonth() + 1));
    






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

    $scope.DateInformation = function(dateInfo) {
        // console.log(dateInfo);        
        CalendarDetailsFact.setDayStatusInfo($scope, dateInfo);
        CalendarDetailsFact.highlightSelectedDay($scope,dateInfo.dayNumber-1);

    }

});
