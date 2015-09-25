angular.module('starter.holidays', ['ionic', 'ionic-datepicker'])

.controller('holiday-settings-ctrl', function($scope, stringDBrepo, httpOperationFact) {

    var selectedDateInSecs = null;
    var holidayGlobalTmp = {};
    $scope.AddHolidayFlag = false;
    $scope.holidayDescription = {
        "description": "",
        "dateValidation": true
    };

    // $scope.holidaysArrayObj = [{
    //     "date": 1442534400,
    //     "dateFormat": "18/09/2015",
    //     "description": "test 1"
    // }, {
    //     "date": 1442534400,
    //     "dateFormat": "19/09/2015",
    //     "description": "test 2"
    // }];
    $scope.holidaysArrayObj = [];

    /*************************************************http**********************************************************************************/
    $scope.updateHolidayInfo = function(holidayObj, option) {
        var url;
        if (option == "delete")
            url = stringDBrepo.vdeleteHolidayInfoURL(stringDBrepo.vendorUniqueId);
        else
            url = stringDBrepo.vUpdateHolidaysListInfoURL(stringDBrepo.vendorUniqueId);

        httpOperationFact.sendHttpPutJsonRequest(url, holidayObj)
            .then(function(data) {
                    // console.log(data);
                    $scope.getHolidaysListInfo();
                },
                function(response) {
                    console.log('albums retrieval failed.')
                });
    }

    $scope.getHolidaysListInfo = function() {
            var response;
            // console.log(stringDBrepo.vBookingStatusCount(uniqueId, month, year));
            httpOperationFact.sendHttpGetRequest(stringDBrepo.vHolidaysListInfoURL(stringDBrepo.vendorUniqueId))
                .then(function(data) {
                        $scope.processInputHolidayList(data);
                        // console.log(data);
                    },
                    function(response) {
                        console.log('albums retrieval failed.')
                    });
        }
        /***************************************************************************************************************************************/

    $scope.processInputHolidayList = function(data) {
        for (i in data) {
            var dateInfo = new Date(data[i].date * 1000);
            data[i].dateFormat = ("0" + dateInfo.getDate()).slice(-2) + "-" + ("0" + dateInfo.getMonth()).slice(-2) + "-" + dateInfo.getFullYear();
        }
        // console.log(data);
        $scope.holidaysArrayObj = data;
    };

    $scope.deleteHolidayDate = function(holidayInfo) {
        var holiday = {};
        holiday.date = holidayInfo.date;
        holiday.description = holidayInfo.description;
        console.log(holiday);

        $scope.updateHolidayInfo(holiday, "delete");
    };




    /************************onload call**********************/
    $scope.getHolidaysListInfo();



    $scope.getTimeInSeconds = function(yearInNumber, monthInNumber, dayInNumber, hoursInNumber, minInNumber) {



        if (!yearInNumber) {
            var dateTmp = new Date();
            yearInNumber = dateTmp.getFullYear();
            monthInNumber = dateTmp.getMonth();
            dayInNumber = dateTmp.getDate();
            hoursInNumber = 0;
            minInNumber = 0;
        }
        var dateFormat = yearInNumber + "/" + (monthInNumber + 1) + "/" + dayInNumber + " " + hoursInNumber + ":" + minInNumber + ":00 UTC";

        var dateObj = new Date(dateFormat);

        // factoryObj.timeInSeconds = Math.round(dateObj.getTime() / 1000);
        // // var test = date.getTime() ;
        // console.log(date.getDate());
        // console.log(test);
        return Math.round(dateObj.getTime() / 1000);
    };

    $scope.AddHolidayList = function(formCheck) {
        

        if (!formCheck.$valid)
            return;

        if (selectedDateInSecs) {
            var currentDate = $scope.getTimeInSeconds(0, 0, 0, 0, 0);

            var selectedDate = $scope.getTimeInSeconds(selectedDateInSecs.getFullYear(), selectedDateInSecs.getMonth()+1, selectedDateInSecs.getDate(), 0, 0)
            if (selectedDate > currentDate) {
                $scope.AddHolidayFlag = false;
                // console.log($scope.holidayDescription.description);
                holidayAddForm.reset();
                holidayGlobalTmp.date = selectedDate;
                holidayGlobalTmp.description = $scope.holidayDescription.description;
                $scope.updateHolidayInfo(holidayGlobalTmp, "add");
                $scope.holidayDescription.dateValidation = true;
            }
            else
                $scope.holidayDescription.dateValidation = false;

        }

    };

    var disabledDates = [
        new Date(1437719836326),
        new Date(),
        new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
        new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
        new Date("08-14-2015"), //Short format
        new Date(1439676000000) //UNIX format
    ];
    var weekDaysList = ["Sun", "Mon", "Tue", "Wed", "thu", "Fri", "Sat"];
    var monthList = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];



    $scope.datepickerObject = {
        titleLabel: 'Date Picker', //Optional
        todayLabel: 'Today', //Optional
        closeLabel: 'Close', //Optional
        setLabel: 'Set', //Optional
        setButtonType: 'button-assertive', //Optional
        todayButtonType: 'button-assertive', //Optional
        closeButtonType: 'button-assertive', //Optional
        inputDate: new Date(), //Optional
        mondayFirst: true, //Optional
        disabledDates: disabledDates, //Optional
        weekDaysList: weekDaysList, //Optional
        monthList: monthList, //Optional
        templateType: 'popup', //Optional
        modalHeaderColor: 'bar-positive', //Optional
        modalFooterColor: 'bar-positive', //Optional
        from: new Date(2012, 8, 2), //Optional
        to: new Date(2018, 8, 25), //Optional
        callback: function(val) { //Mandatory
            datePickerCallback(val);
        }
    };

    var datePickerCallback = function(val) {
        if (typeof(val) === 'undefined') {
            console.log('No date selected');
        } else {
            console.log('Selected date is : ', val)
            $scope.datepickerObject.inputDate = val;
            selectedDateInSecs = val;
        }
    };

});
