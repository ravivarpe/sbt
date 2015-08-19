angular.module('starter.home')

.factory('myFactory', function() {
    var factoryObj = {};
    factoryObj.name = '';
    factoryObj.setName = function(newName) {
        factoryObj.name = newName;
    };
    return factoryObj;
})

.factory('VendorInfoFact', function() {
    var factoryObj = {};
    factoryObj.ratingValue = '';
    factoryObj.likesValue = '';

    factoryObj.setVendorRatingInfo = function(scope, rating) {
        scope.VendorRatingValue = rating;
    };

    factoryObj.setVendorLikesInfo = function(scope, likeCount) {
        scope.VendorLikeValue = likeCount;
    };

    return factoryObj;
})

.factory('CalendarDetailsFact', function() {
    var factoryObj = {};
    factoryObj.noOfDaysInMonth = '';
    factoryObj.currentDayNumber = '';
    factoryObj.timeInSeconds = '';
    factoryObj.dayArrayInfo = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    factoryObj.monthArrayInfo = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


    factoryObj.getNumberOfDaysInMonth = function(yearInNumber, monthInNumber) {
        dateObj = new Date();
        dateObj.setFullYear(yearInNumber);
        dateObj.setMonth(monthInNumber);
        dateObj.setDate(0);
        factoryObj.noOfDaysInMonth = dateObj.getDate();
        return factoryObj.noOfDaysInMonth;
    };

    factoryObj.getCurrentDayNumber = function(yearInNumber, monthInNumber, dayInNumber) {

        dateFormat = yearInNumber + "/" + monthInNumber + "/" + dayInNumber + " 00:00:00";

        dateObj = new Date(dateFormat);

        factoryObj.currentDayNumber = dateObj.getDay();
        return factoryObj.currentDayNumber;
    };


    factoryObj.getTimeInSeconds = function(yearInNumber, monthInNumber, dayInNumber, hoursInNumber, minInNumber) {

        dateFormat = yearInNumber + "/" + monthInNumber + "/" + dayInNumber + " " + hoursInNumber + ":" + minInNumber + ":00 UTC";
        dateObj = new Date(dateFormat);

        factoryObj.timeInSeconds = Math.round(dateObj.getTime() / 1000);
        // // var test = date.getTime() ;
        // console.log(date.getDate());
        // console.log(test);
        return factoryObj.timeInSeconds;
    };


    factoryObj.setCalendarDayInfo = function(scope, yearInNumber, monthInNumber) {
        factoryObj.getNumberOfDaysInMonth(yearInNumber, monthInNumber);
        factoryObj.getCurrentDayNumber(yearInNumber, monthInNumber, 1);




        scope.calendarArray.length = 0;
        for (var i = 1; i <= factoryObj.noOfDaysInMonth; i++) {
            var dayInformation = {};
            dayInformation.dayNumber = i;
            if (i % 2) {
                dayInformation.requestPending = 20;
                dayInformation.vehiclePending = 3;
            } else {
                dayInformation.requestPending = 1;
                dayInformation.vehiclePending = 0;
            }
            if (i == 1) {
                dayInformation.requestPending = 0;
                dayInformation.vehiclePending = 0;
            }

            dayInformation.year = yearInNumber;
            dayInformation.month = monthInNumber;
            dayInformation.dayName = factoryObj.dayArrayInfo[factoryObj.currentDayNumber % 7];
            // console.log(dayArrayInfo[factoryObj.currentDayNumber%7]);
            factoryObj.currentDayNumber++;
            scope.calendarArray.push(dayInformation);
        }

        dateObj = new Date();
        factoryObj.setDayStatusInfo(scope, scope.calendarArray[dateObj.getDate() - 1]);

        // factoryObj.getTimeInSeconds(yearInNumber, monthInNumber, dateObj.getDate(),0,0,0 );
        scope.DateInSeconds = scope.calendarArray[dateObj.getDate() - 1];
        // console.log(scope.DateInSeconds);

        scope.calendarTable.rowCount = ((factoryObj.noOfDaysInMonth / 7) > Math.round(factoryObj.noOfDaysInMonth / 7)) ? Math.round(factoryObj.noOfDaysInMonth / 7) + 1 : Math.round(factoryObj.noOfDaysInMonth / 7);

        // console.log(scope.calendarTable.rowCount);
        scope.calendarTable.totalDayCount = factoryObj.noOfDaysInMonth;
        // console.log(factoryObj.noOfDaysInMonth);
    }

    factoryObj.setDayStatusInfo = function(scope, dayInformation) {
        // console.log(dayInformation.dayName);
        // console.log(dayInformation.vehiclePending);
        scope.PendingRequests = dayInformation.requestPending;
        scope.PendingServices = dayInformation.vehiclePending;
        scope.DateInSeconds = dayInformation;
        // console.log(factoryObj.timeInSeconds);
    }


    factoryObj.getCurrentDayObj = function(scope, yearInNumber, monthInNumber) {
        factoryObj.getNumberOfDaysInMonth(yearInNumber, monthInNumber);
        factoryObj.getCurrentDayNumber(yearInNumber, monthInNumber, 1);
        dateObj = new Date();
        var dayInformation = {};
        dayInformation.dayNumber = dateObj.getDate();

        dayInformation.requestPending = 20;
        dayInformation.vehiclePending = 3;


        dayInformation.year = yearInNumber;
        dayInformation.month = monthInNumber;
        dayInformation.dayName = factoryObj.dayArrayInfo[0];


        scope.DateInSeconds = dayInformation;
        // scope.calendarArray[dateObj.getDate() - 1];

    }

    return factoryObj;
});
