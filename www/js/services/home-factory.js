angular.module('starter.home')

.factory('myFactory', function() {
    var factoryObj = {};
    factoryObj.name = '';
    factoryObj.setName = function(newName) {
        factoryObj.name = newName;
    };
    return factoryObj;
})

.factory('VendorInfoFact', function(httpOperationFact, stringDBrepo) {
    var factoryObj = {};
    factoryObj.ratingValue = '';
    factoryObj.likesValue = '';

    factoryObj.setVendorRatingInfo = function(scope, rating) {
        scope.VendorRatingValue = rating;
    };

    factoryObj.setVendorLikesInfo = function(scope, likeCount) {
        scope.VendorLikeValue = likeCount;
    };
    /***************************************************************http menthods******************************************************************************************/
    factoryObj.getVendorRatingInfo = function(uniqueId, scope) {
        var response;
        httpOperationFact.sendHttpGetRequest(stringDBrepo.vRatingAndLikeDetails(uniqueId))
            .then(function(data) {
                    // console.log(data);
                    // {"Rating":0,"Likes":150037560}
                    factoryObj.setVendorLikesInfo(scope, data.Likes);
                    factoryObj.setVendorRatingInfo(scope, data.Rating);
                },
                function(response) {
                    console.log('albums retrieval failed.')
                });
    };

    factoryObj.getBookingInfoUsingMobileNumber = function(uniqueId, scope, mobileNumber) {
        var response;
        httpOperationFact.sendHttpGetRequest(stringDBrepo.vsearchByMobileNumber(uniqueId, mobileNumber))
            .then(function(data) {
                    console.log(data);

                },
                function(response) {
                    console.log('albums retrieval failed.')
                });
    };
    /*********************************************************************************************************************************************************/

    return factoryObj;
})

.factory('CalendarDetailsFact', function(httpOperationFact, stringDBrepo) {
    var factoryObj = {};
    factoryObj.selectedDayNumber = 0;
    factoryObj.noOfDaysInMonth = '';
    factoryObj.currentDayNumber = '';
    factoryObj.timeInSeconds = '';
    factoryObj.dayArrayInfo = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    factoryObj.monthArrayInfo = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    factoryObj.serverRespose = [];
    /***********************************************************************************************************/
    factoryObj.getCalenarDayWiseInfo = function(uniqueId, scope, month, year) {
        var response;
        // console.log(stringDBrepo.vBookingStatusCount(uniqueId, month, year));
        httpOperationFact.sendHttpGetRequest(stringDBrepo.vBookingStatusCount(uniqueId, month, year))
            .then(function(data) {
                    // console.log(data);
                    // factoryObj.serverRespose = data;
                    factoryObj.setRequestPendingCount(scope, data, month);
                },
                function(response) {
                    console.log('albums retrieval failed.')
                });
    };






    /************************************************************************************************************/
    factoryObj.getNumberOfDaysInMonth = function(yearInNumber, monthInNumber) {
        var dateObj = new Date(yearInNumber, monthInNumber+1, 0).getDate();
        // dateObj.setFullYear(yearInNumber);
        // dateObj.setMonth(monthInNumber);
        // dateObj.setDate(0);
        factoryObj.noOfDaysInMonth = dateObj;
        return factoryObj.noOfDaysInMonth;
    };

    factoryObj.getCurrentDayNumber = function(yearInNumber, monthInNumber, dayInNumber) {

        dateFormat = yearInNumber + "/" + monthInNumber + "/" + dayInNumber + " 00:00:00";

        dateObj = new Date(dateFormat);

        factoryObj.currentDayNumber = dateObj.getDay();
        return factoryObj.currentDayNumber;
    };


    factoryObj.getTimeInSeconds = function(yearInNumber, monthInNumber, dayInNumber, hoursInNumber, minInNumber) {

        dateFormat = yearInNumber + "/" + (monthInNumber+1) + "/" + dayInNumber + " " + hoursInNumber + ":" + minInNumber + ":00 UTC";
        var dateObj = new Date(dateFormat);

        factoryObj.timeInSeconds = Math.round(dateObj.getTime() / 1000);
        // // var test = date.getTime() ;
        // console.log(date.getDate());
        // console.log(test);
        return factoryObj.timeInSeconds;
    };


    factoryObj.setRequestPendingCount = function(scope, data, month) {
        var dateObj = new Date();
        for (var i in data) {
            // var json = JSON.parse(data[i]);
            // console.log(data[i].count.service);
            scope.calendarArray[i].requestPending = data[i].count.request;
            scope.calendarArray[i].vehiclePending = data[i].count.service;
        }
        if (dateObj.getMonth() == month-1) {
            scope.calendarArray[dateObj.getDate() - 1].daySelectHighlighter = "calendar-col-box-selected";
            factoryObj.setDayStatusInfo(scope, scope.calendarArray[dateObj.getDate() - 1]);
        } else {
            scope.calendarArray[0].daySelectHighlighter = "calendar-col-box-selected";
            factoryObj.setDayStatusInfo(scope, scope.calendarArray[0]);
        }

    };

    factoryObj.setCalendarDayInfo = function(scope, yearInNumber, monthInNumber) {
        factoryObj.getNumberOfDaysInMonth(yearInNumber, monthInNumber);
        factoryObj.getCurrentDayNumber(yearInNumber, monthInNumber, 1);



        //http request for getting data

        scope.calendarArray.length = 0;
        for (var i = 1; i <= factoryObj.noOfDaysInMonth; i++) {
            var dayInformation = {};
            dayInformation.dayNumber = i;

            dayInformation.requestPending = 0;
            dayInformation.vehiclePending = 0;
            dayInformation.searchMobileNumber = 0;

            dayInformation.dateInSecs = factoryObj.getTimeInSeconds(yearInNumber, monthInNumber, i,0,0,0 );
            dayInformation.year = yearInNumber;
            dayInformation.month = monthInNumber+1;
            dayInformation.dayName = factoryObj.dayArrayInfo[factoryObj.currentDayNumber % 7];
            dayInformation.daySelectHighlighter = "calendar-col-box";
            // console.log(dayArrayInfo[factoryObj.currentDayNumber%7]);
            factoryObj.currentDayNumber++;
            scope.calendarArray.push(dayInformation);
        }

        var dateObj = new Date();
        // factoryObj.setDayStatusInfo(scope, scope.calendarArray[dateObj.getDate() - 1]);

        // factoryObj.getTimeInSeconds(yearInNumber, monthInNumber, dateObj.getDate(),0,0,0 );
        // scope.SelectedDateBookingInfo = scope.calendarArray[dateObj.getDate() - 1];
        // console.log(monthInNumber);

        scope.calendarTable.rowCount = ((factoryObj.noOfDaysInMonth / 7) > Math.round(factoryObj.noOfDaysInMonth / 7)) ? Math.round(factoryObj.noOfDaysInMonth / 7) + 1 : Math.round(factoryObj.noOfDaysInMonth / 7);

        // console.log(scope.calendarTable.rowCount);
        scope.calendarTable.totalDayCount = factoryObj.noOfDaysInMonth;

        factoryObj.getCalenarDayWiseInfo(stringDBrepo.vendorUniqueId, scope, monthInNumber+1, yearInNumber);
        if (dateObj.getMonth() == monthInNumber) {
            scope.calendarArray[dateObj.getDate() - 1].daySelectHighlighter = "calendar-col-box-selected";
            factoryObj.setDayStatusInfo(scope, scope.calendarArray[dateObj.getDate() - 1]);
        } else {
            scope.calendarArray[0].daySelectHighlighter = "calendar-col-box-selected";
            factoryObj.setDayStatusInfo(scope, scope.calendarArray[0]);
        }

        // console.log(factoryObj.noOfDaysInMonth);
    }

    factoryObj.setDayStatusInfo = function(scope, dayInformation) {
        // console.log(dayInformation.dayName);
        // console.log(dayInformation.vehiclePending);
        scope.PendingRequests = dayInformation.requestPending;
        scope.PendingServices = dayInformation.vehiclePending;
        scope.SelectedDateBookingInfo = dayInformation;
        // console.log(factoryObj.timeInSeconds);
    }


    factoryObj.getCurrentDayObj = function(scope, yearInNumber, monthInNumber) {
        factoryObj.getNumberOfDaysInMonth(yearInNumber, monthInNumber);
        factoryObj.getCurrentDayNumber(yearInNumber, monthInNumber, 1);
        var dateObj = new Date();
        var dayInformation = {};
        dayInformation.dayNumber = dateObj.getDate();

        dayInformation.requestPending = 20;
        dayInformation.vehiclePending = 3;
        dayInformation.searchMobileNumber = 0;

        dayInformation.year = yearInNumber;
        dayInformation.month = monthInNumber+1;
        dayInformation.dayName = factoryObj.dayArrayInfo[0];
        dayInformation.dateInSecs = factoryObj.getTimeInSeconds(yearInNumber, monthInNumber, dayInformation.dayNumber,0,0,0 );

        scope.SelectedDateBookingInfo = dayInformation;
        // scope.calendarArray[dateObj.getDate() - 1];

    };


    factoryObj.highlightSelectedDay = function(scope, dayNumber) {
        for (var i in scope.calendarArray) {
            scope.calendarArray[i].daySelectHighlighter = "calendar-col-box";
        }
        scope.calendarArray[dayNumber].daySelectHighlighter = "calendar-col-box-selected";
    };

    return factoryObj;
});
