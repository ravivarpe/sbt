angular.module('starter.home', ['ionic', 'ionic-toast', 'ChartAngular'])


.controller('calendar-ctrl', function($scope, ionicToast, $ionicNavBarDelegate, $http, CalendarDetailsFact, VendorInfoFact, stringDBrepo, UpdateService) {

    $scope.calendarArray = [];
    $scope.calendarTable = {};
    $scope.calendarTable.dayCount;
    $scope.daySelectHighlighter;
    $scope.graphsDataArray=[];
    var dayArrayInfo = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    var monthArrayInfo = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var currentMonthNumber;
    var currentYearNumber;

    var date = new Date();




    $scope.chart_area = {
        data: [{
            y: '2006',
            a: 100,
            b: 90
        }, {
            y: '2007',
            a: 75,
            b: 65
        }, {
            y: '2008',
            a: 50,
            b: 40
        }, {
            y: '2009',
            a: 75,
            b: 65
        }, {
            y: '2010',
            a: 50,
            b: 40
        }, {
            y: '2011',
            a: 75,
            b: 65
        }, {
            y: '2012',
            a: 100,
            b: 90
        }],
        lineColors: [
            '#86d2f4',
            '#f6c510',
        ],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Series A', 'Series B']
    };


    $scope.morrisLineChartScope = function(dataArray) {
        angular.element($('#area-data-chart')).html('');
        Morris.Area({
            element: "area-data-chart",
            data: dataArray,
            lineColors: [
                '#86d2f4',
                '#f6c510',
                '#d0d0d0',
            ],
            xkey: 'y',
            ykeys: ['a', 'b', 'c'],
            labels: ['New Bookings', 'In Queue', 'Complete'],
            parseTime: false
        });
    };





    $scope.calendarHide = false;
    $scope.calendarStatus = false;
    $scope.selectDunotViews = false;

    $scope.morrisDonutScope = function(dataObject) {
        
        Morris.Donut({
            element: "donut-data-chart",
            data: [{
                label: "New Bookings",
                value: dataObject.pending
            }, {
                label: "In Queue",
                value: dataObject.confirmed + dataObject.progress
            }, {
                label: "Complete",
                value: dataObject.completed
            }],
            colors: [
                '#86d2f4',
                '#f6c510',
                '#d0d0d0'
            ]
        });
    };
    VendorInfoFact.getDayStatusCount($scope, Math.round(date.getTime() / 1000));
    CalendarDetailsFact.getCurrentDayObj($scope, date.getFullYear(), date.getMonth());

    $scope.updateTotalInfo = function() {
        if ($scope.selectDunotViews == true)
            return;
        $scope.SelectedDateBookingInfo.pullType = "total";
        $scope.selectDunotViews = !$scope.selectDunotViews
        VendorInfoFact.getAllStatusCount($scope);

    };
    $scope.updateTodayInfo = function() {
        if ($scope.selectDunotViews == false)
            return;
        $scope.SelectedDateBookingInfo.pullType = "day";
        $scope.selectDunotViews = !$scope.selectDunotViews
        VendorInfoFact.getDayStatusCount($scope, Math.round(date.getTime() / 1000));

    };
    /*********************************http information*************************************************************************/


    // CalendarDetailsFact.getCalenarDayWiseInfo(stringDBrepo.vendorUniqueId);



    /**********************************calendar information*********************************************************************/


    UpdateService.update();

    $scope.$on('$stateChangeSuccess', function(event, toState) {
        if (toState.name == "vendor-app.home") {
            $scope.initObjFuntion();
            $ionicNavBarDelegate.showBackButton(false);
        } else
            $ionicNavBarDelegate.showBackButton(true);
    });

    // $scope.onGesture('swipedown', gestureCallBack, element, options);

    // var gestureCallBack = function(){

    // };


    $scope.refreshHomeScreen = function() {
        $scope.initObjFuntion();
    }



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
