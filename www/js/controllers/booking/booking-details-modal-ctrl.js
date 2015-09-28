angular.module('starter.bookingDetails')


.controller('booking-details-modal-ctrl', function($scope, $ionicModal, stringDBrepo, BookingDetailsFact, BookingListFact) {

    // alert("aaaaaaaaaaa");
    $scope.loginData = {};


    /*******loading information*************/
    $scope.modalDisplayInfo = {};

    $scope.updateBookingDate = false;
    $scope.updateBookingTime = false;
    // console.log(BookingDetailsFact.stateDetails);
    $scope.BookingDetailsModalEnableArray = BookingDetailsFact.stateDetails;
    $scope.vehiclePickupIndex = BookingDetailsFact.sendPersonForPickup;
    $scope.requestConfirmIndex = BookingDetailsFact.confirmRequest;
    $scope.serviceCompleteIndex = BookingDetailsFact.serviceComplete;

    $scope.bookingChoice = {
        data: {
            option: "",
            id: 1,
            status: "",
            reason: ""
        }
    };

    /***************************************************pickup details********************************************************/


    $scope.pickDetailsInfo = {};
    $scope.pickDetailsInfo.personName = "";
    $scope.pickDetailsInfo.phoneNum = "";

    $scope.serviceInfo={};
    $scope.serviceInfo.finalServiceAmount = 0;


    /*************************************************************************************************************************/

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/bookingDetailsModal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the modal to close it
    $scope.closeBookingModal = function() {
        // console.log("closed");
        $scope.modal.hide();
    };

    $scope.updateBookingModal = function(state, DetailsForm) {
        var i = 0;
        // console.log($scope.modalDisplayInfo);
        if ((!($scope.bookingDetailsArray[0].bookingStatus & BookingDetailsFact.confirmRequest)) && ($scope.updateBookingDate == false || $scope.updateBookingTime == false))
            return;

        console.log($scope.modalDisplayInfo.statusIndex);

        if ($scope.modalDisplayInfo.statusIndex == BookingDetailsFact.sendPersonForPickup) {
            console.log("came here");
            // if (!DetailsForm.$valid)
            //     return;
            if(!$scope.pickDetailsInfo.phoneNum.length)
                $scope.pickDetailsInfo.phoneNum = 0;                
            $scope.bookingDetailsArray[0].pickUpPersonName = $scope.pickDetailsInfo.personName;
            $scope.bookingDetailsArray[0].pickUpPersonNumber = $scope.pickDetailsInfo.phoneNum;

        }

        if ($scope.modalDisplayInfo.statusIndex == BookingDetailsFact.serviceComplete) {
            if (!DetailsForm.$valid)
                return;

            $scope.bookingDetailsArray[0].finalServiceAmount = $scope.serviceInfo.finalServiceAmount;
            console.log($scope.bookingDetailsArray[0]);

        }

        for (i = 0; i < $scope.bookingStatusArrayItems.length; i++) {
            if ($scope.bookingStatusArrayItems[i].statusIndex == $scope.modalDisplayInfo.statusIndex) {
                $scope.bookingStatusArrayItems[i].statusInfo = 1;
                break;
            }
        }
        if (i < ($scope.bookingStatusArrayItems.length - 1)) {
            if (state.status == BookingDetailsFact.cancelLevel)
                $scope.bookingStatusArrayItems[i].statusInfo = 3;
            else if (state.status == BookingDetailsFact.sameLevel) {
                $scope.bookingStatusArrayItems[i].statusInfo = 4;
                $scope.bookingStatusArrayItems[i].statusString = state.option;
            } else if ((state.status == BookingDetailsFact.confirmLevel) && ($scope.bookingDetailsArray[0].bookingStatus & BookingDetailsFact.waitingForUserResponse)) {
                $scope.bookingStatusArrayItems[i].statusInfo = 4;
                $scope.bookingStatusArrayItems[i].statusString = state.option;
            } else if (state.status == BookingDetailsFact.confirmLevel)
                $scope.bookingStatusArrayItems[i + 1].statusInfo = 4;
        }




        if ((state.status == BookingDetailsFact.confirmLevel) && ($scope.bookingDetailsArray[0].bookingStatus & BookingDetailsFact.waitingForUserResponse)) {
            $scope.bookingDetailsArray[0].bookingStatus &= (~BookingDetailsFact.waitingForUserResponse);
        } else if (state.status == BookingDetailsFact.confirmLevel) {
            $scope.bookingDetailsArray[0].bookingStatus |= $scope.modalDisplayInfo.statusIndex;
        } else if (state.status == BookingDetailsFact.sameLevel) {
            $scope.bookingDetailsArray[0].bookingStatus |= BookingDetailsFact.waitingForUserResponse;
        } else if (state.status == BookingDetailsFact.cancelLevel) {
            $scope.bookingDetailsArray[0].bookingStatus |= BookingDetailsFact.cancelRequest;
        }

        $scope.sendPickupPersonIndex = $scope.bookingDetailsArray[0].bookingStatus & BookingDetailsFact.sendPersonForPickup;
        $scope.updateBookingDetails(state);
        BookingListFact.setBookingStatusInfo($scope.bookingDetailsArray[0]);
        $scope.modal.hide();
    };


    $scope.updateBookingDetails = function(selectedState) {

        if ($scope.updateBookingDate == true && $scope.updateBookingTime == true) {

            $scope.bookingDetailsArray[0].vehicleDeliveredTime = BookingListFact.getTimeInSeconds(BookingListFact.venderDeliveryDate.getFullYear(),
                BookingListFact.venderDeliveryDate.getMonth(),
                BookingListFact.venderDeliveryDate.getDate(),
                BookingListFact.venderDeliveryTime.getUTCHours(),
                BookingListFact.venderDeliveryTime.getUTCMinutes());
            $scope.HeaderBookingDate = BookingListFact.convertSecsToDate($scope.bookingDetailsArray[0].vehicleDeliveredTime);
        }

        var object = JSON.parse(JSON.stringify($scope.bookingDetailsArray[0]));

        BookingListFact.deleteBookingJsonKeys(object);

        object.bookingStatusReason = JSON.stringify(selectedState);
        // console.log(object);

        BookingListFact.updateBookingInformation(stringDBrepo.vendorUniqueId, object);
    }

    // Open the login modal
    $scope.bookingDetailStatusModal = function(selectedElement) {
        $scope.modalDisplayInfo = selectedElement;
        $scope.modal.show();

        $scope.selectDefaultOption(selectedElement);

        // console.log(selectedElement);
    };


    $scope.selectDefaultOption = function(selectState) {
        for (var i in BookingDetailsFact.stateDetails) {
            if (selectState.statusIndex == BookingDetailsFact.stateDetails[i].index) {
                $scope.bookingChoice.data = BookingDetailsFact.stateDetails[i].state[0];
            }
        }
    };



    // Open the login modal
    /*$scope.bookingDetailStatusModal = function(selectedElement, elementArray) {
        var i = 0;
        for (i = 0; i < elementArray.length; i++) {
            if (elementArray[i].statusIndex == selectedElement.statusIndex) {
                elementArray[i].statusInfo = 1;
                break;
            }

        }
        if (i < (elementArray.length-1)) {
            elementArray[i + 1].statusInfo = 4;
        }


    };*/

    // Perform the login action when the user submits the login form
    $scope.applyBookingStatus = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        // $timeout(function() {
        //     $scope.closeLogin();
        // }, 1000);
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
            var selectedTime = new Date(val * 1000);
            BookingListFact.venderDeliveryTime = selectedTime;
            $scope.updateBookingTime = true;
            $scope.timePickerObject.TimeRepresent = ("0" + selectedTime.getUTCHours()).slice(-2) + ":" + ("0" + selectedTime.getUTCMinutes()).slice(-2);
            // console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');

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
            // console.log('Selected date is : ', val)
        }
    };



    // console.log($scope.BookingDetailsModalEnableArray);
});
