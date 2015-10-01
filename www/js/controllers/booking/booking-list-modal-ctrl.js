angular.module('starter.bookingList')


.controller('booking-list-modal-ctrl', function($scope, $ionicModal, $timeout, BookingDetailsFact, BookingListFact, stringDBrepo) {

    // alert("aaaaaaaaaaa");
    $scope.loginData = {};
    var bookingIndex = 0;
    $scope.updateBookingDate = false;
    $scope.updateBookingTime = false;
    $scope.showDateAndTime = true;

    $scope.modalInfo = {
        confirmString: "Accept",
        cancelString: "Cancel"
    };

    $scope.UserChoice = {
        data: {
            name: "",
            status: 1,
            reason: ""
        }
    };
    $scope.modalConfirmInfo = [{
        name: "Confirm Booking",
        status: 1,
        reason: ""
    }, {
        name: "Vehicle not supported",
        status: 2,
        reason: ""
    }, {
        name: "Pickup/Drop unavailable",
        status: 3,
        reason: ""
    }, {
        name: "Unexpected Holiday",
        status: 4,
        reason: ""
    }, {
        name: "insufficient staff",
        status: 5,
        reason: ""
    }];


    $scope.modalCancelInfo = [{
        name: "Unexpected Holiday",
        status: 128,
        reason: ""
    }, {
        name: "User request to cancel",
        status: 129,
        reason: ""
    }, {
        name: "insufficient staff",
        status: 130,
        reason: ""
    }];

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/bookingListModal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeBookingModal = function() {
        // console.log("closed");
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.bookingStatusModal = function(data, index) {
        // console.log(index);
        bookingIndex = index;
        if (data.requestAcceptString == $scope.modalInfo.confirmString) {
            $scope.UserChoice.data = $scope.modalConfirmInfo[0];
            $scope.showDateAndTime = true;
        } else {
            $scope.UserChoice.data = $scope.modalCancelInfo[0];
            $scope.showDateAndTime = false;
        }
        $scope.BookingDetails = data;
        $scope.modal.show();
        $scope.updateBookingDate = false;
        $scope.updateBookingTime = false;
    };


    $scope.selectConfirmOptions = function(changeOption) {
        // console.log(changeOption);
        if(changeOption.status == 1)
            $scope.showDateAndTime = true;
        else
            $scope.showDateAndTime = false;

    }

    // Perform the login action when the user submits the login form
    $scope.applyBookingStatus = function(choice) {
        console.log(choice.data.status);
        // console.log(BookingListFact.venderDeliveryTime.getUTCHours());
        if (choice.data.status == 1) {


            if ($scope.updateBookingDate == false || $scope.updateBookingTime == false)
                return;


            $scope.bookingListArray[bookingIndex].vehicleDeliveredTime = BookingListFact.getTimeInSeconds(BookingListFact.venderDeliveryDate.getFullYear(),
                BookingListFact.venderDeliveryDate.getMonth(),
                BookingListFact.venderDeliveryDate.getDate(),
                0,
                0) + BookingListFact.venderDeliveryTime;

            var date = new Date();
            var currentDate = BookingListFact.getTimeInSeconds(date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                date.getHours(),
                date.getMinutes());

            if ($scope.bookingListArray[bookingIndex].vehicleDeliveredTime < currentDate)
                return;

        }

        if (choice.data.status == 1) {
            $scope.bookingListArray[bookingIndex].bookingStatus |= BookingDetailsFact.confirmRequest;
        } else {
            $scope.bookingListArray[bookingIndex].bookingStatus |= BookingDetailsFact.cancelRequest;
        }

        $scope.setBookingStatusInfo($scope.bookingListArray[bookingIndex]);
        $scope.updateBookingInfoInServer($scope.bookingListArray[bookingIndex]);
        $scope.modal.hide();

    };

    $scope.updateBookingInfoInServer = function(bookingObj) {
        // var object ={};
        // object = bookingObj;





        bookingObj.vehicleDeliveredTimeFormat = BookingListFact.convertSecsToDate(bookingObj.vehicleDeliveredTime);
        console.log(object);


        var object = JSON.parse(JSON.stringify(bookingObj));

        BookingListFact.deleteBookingJsonKeys(object);

        BookingListFact.updateBookingInformation(stringDBrepo.vendorUniqueId, object);


    };


    $scope.setBookingStatusInfo = function(bookingObj) {

         if (bookingObj.bookingStatus & BookingDetailsFact.requestPending) {
            bookingObj.BookingStatusColor = "booking-pending-status";
            bookingObj.BookingStatusString = "Pending";
            bookingObj.requestAcceptString = "Accept";
        }
        if ((bookingObj.bookingStatus & BookingDetailsFact.confirmRequest) || (bookingObj.bookingStatus >= BookingDetailsFact.sendPersonForPickup)) {
            bookingObj.BookingStatusColor = "booking-confirm-status";
            bookingObj.BookingStatusString = "Accepted";
            bookingObj.requestAcceptString = "Cancel";
        }
        if((bookingObj.bookingStatus & BookingDetailsFact.serviceInProgress)){
            bookingObj.BookingStatusColor = "booking-ongoing-status";
            bookingObj.BookingStatusString = "On Going";
            bookingObj.requestAcceptString = "Cancel";
        }
        if (bookingObj.bookingStatus & BookingDetailsFact.cancelRequest) {
            bookingObj.BookingStatusColor = "booking-cancel-status";
            bookingObj.BookingStatusString = "Cancelled";
            bookingObj.requestAcceptString = "discard";
        }
        if (bookingObj.bookingStatus & BookingDetailsFact.userPaidFullAmount) {
            bookingObj.BookingStatusColor = "booking-complete-status";
            bookingObj.BookingStatusString = "Completed";
            bookingObj.requestAcceptString = "discard";
        }
    };


    $scope.timePickerObject = {
        inputEpochTime: ((new Date()).getHours() * 60 * 60), //Optional
        step: 15, //Optional
        format: 24, //Optional
        titleLabel: '24-hour Format', //Optional
        setLabel: 'Set', //Optional
        closeLabel: 'Close', //Optional
        setButtonType: 'button-positive', //Optional
        closeButtonType: 'button-stable', //Optional
        TimeRepresent: '00:00',
        callback: function(val) { //Mandatory
            timePickerCallback(val);
        }
    };

    var timePickerCallback = function(val) {
        if (typeof(val) === 'undefined') {
            console.log('Time not selected');
        } else {
            console.log(val);
            var selectedTime = new Date(val * 1000);
            BookingListFact.venderDeliveryTime = val;
            console.log(BookingListFact.getTimeInSeconds(BookingListFact.venderDeliveryDate.getFullYear(),
                BookingListFact.venderDeliveryDate.getMonth(),
                BookingListFact.venderDeliveryDate.getDate(),
                0,
                0) + BookingListFact.venderDeliveryTime);
            $scope.updateBookingTime = true;
            $scope.timePickerObject.TimeRepresent = ("0" + selectedTime.getUTCHours()).slice(-2) + ":" + ("0" + selectedTime.getUTCMinutes()).slice(-2);
            console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');


        }
    }

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
        titleLabel: 'Title', //Optional
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
            $scope.updateBookingDate = true;

            BookingListFact.venderDeliveryDate = val;
            $scope.datepickerObject.inputDate = val;
            console.log('Selected date is : ', BookingListFact.getTimeInSeconds(BookingListFact.venderDeliveryDate.getFullYear(),
                BookingListFact.venderDeliveryDate.getMonth(),
                BookingListFact.venderDeliveryDate.getDate(),
                0,
                0))
        }
    };




});
