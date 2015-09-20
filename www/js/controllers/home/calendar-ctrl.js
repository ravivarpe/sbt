angular.module('starter.home', ['ionic'])


.controller('calendar-ctrl', function($scope, $http, CalendarDetailsFact, VendorInfoFact, stringDBrepo, UpdateService) {



    /*********************************http information*************************************************************************/


    // CalendarDetailsFact.getCalenarDayWiseInfo(stringDBrepo.vendorUniqueId);



    /**********************************calendar information*********************************************************************/
    $scope.calendarArray = [];
    $scope.calendarTable = {};
    $scope.calendarTable.dayCount;
    $scope.daySelectHighlighter;
    var dayArrayInfo = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    var monthArrayInfo = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var currentMonthNumber;
    var currentYearNumber;

    var date = new Date();

    // UpdateService.update();

    $scope.$on('$stateChangeSuccess', function(event, toState) {
        if (toState.name == "vendor-app.home") {
            $scope.initObjFuntion();

        }
    });


    $scope.initObjFuntion = function() {
        $scope.calendarTable.dayCount = 7;
        $scope.daySelectHighlighter = "calendar-col-box";

        CalendarDetailsFact.setCalendarDayInfo($scope, date.getFullYear(), date.getMonth());
        VendorInfoFact.getVendorRatingInfo(stringDBrepo.vendorUniqueId, $scope);


        $scope.calendarYear = date.getFullYear();
        $scope.calendarMonth = monthArrayInfo[date.getMonth()];


        currentMonthNumber = date.getMonth();
        currentYearNumber = date.getFullYear();
    }




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

        CalendarDetailsFact.setCalendarDayInfo($scope, currentYearNumber, currentMonthNumber);
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
        CalendarDetailsFact.setCalendarDayInfo($scope, currentYearNumber, currentMonthNumber);

        console.log("dec arrow got clicked");

    }

    $scope.DateInformation = function(dateInfo) {
        // console.log(dateInfo);        
        CalendarDetailsFact.setDayStatusInfo($scope, dateInfo);
        CalendarDetailsFact.highlightSelectedDay($scope, dateInfo.dayNumber - 1);

    }

});
