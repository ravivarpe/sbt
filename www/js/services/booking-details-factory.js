angular.module('starter.bookingDetails')


.factory('BookingDetailsFact', function() {
    var factoryObj = {};
    factoryObj.requestPending = 2;
    factoryObj.confirmRequest = 4;
    factoryObj.cancelRequest = 8;
    factoryObj.sendPersonForPickup = 16;
    factoryObj.personPickedVehicle = 32;
    factoryObj.receivedCarFromUser = 64;
    factoryObj.serviceInProgress = 128;
    factoryObj.waitingForUserResponse = 256;
    factoryObj.serviceComplete = 512;
    factoryObj.personPickedVehicleForDelivery = 1024;
    factoryObj.devliveredVehicle = 2048;
    factoryObj.userPaidFullAmount = 4096;

    factoryObj.iconWithDotCircle = "";
    factoryObj.lastCount;

    factoryObj.sumOfAllStatus = factoryObj.requestPending |
        factoryObj.confirmRequest |
        // factoryObj.cancelRequest | 
        factoryObj.sendPersonForPickup |
        factoryObj.personPickedVehicle |
        factoryObj.receivedCarFromUser |
        factoryObj.serviceInProgress |
        // factoryObj.waitingForUserResponse | 
        factoryObj.serviceComplete |
        factoryObj.personPickedVehicleForDelivery |
        factoryObj.devliveredVehicle |
        factoryObj.userPaidFullAmount;



    factoryObj.bookingStatusArray = ["Request Pending",
        "Request Confirmed",
        "Request Cancelled",
        "Pickup in progress",
        "Vehicle got picked",
        "Vehicle received",
        "Service in progress",
        "Waiting for response",
        "Completed vehicle service",
        "Vehicle Drop in progress",
        "Vehicle is delivered",
        "paid service amount",
        "Got feedback"
    ];

    factoryObj.setBookingLiveStatus = function(scope, bookingStatus) {
        // console.log(factoryObj.sumOfAllStatus);
        // console.log();
        for (var i = 1; i < factoryObj.bookingStatusArray.length; i++) {
            var bookingStatusArrayObj = {};
            bookingStatusArrayObj.iconType = 0;
            if ((bookingStatus >> i) & 0x1) {
                index = (0x1 << i);
                if (factoryObj.setPickUpDropInfo(scope, index) == 0)
                    continue;

                factoryObj.setDisplayIconInfo(index, bookingStatusArrayObj);

                bookingStatusArrayObj.statusString = factoryObj.bookingStatusArray[i - 1];
                bookingStatusArrayObj.statusInfo = 1;
                bookingStatusArrayObj.statusIndex = 0x1 << i;
                scope.bookingStatusArrayItems.push(bookingStatusArrayObj);
                // console.log(bookingStatusArrayObj);
                factoryObj.lastCount = i;
            } else {
                index = (0x1 << i);
                if (factoryObj.setPickUpDropInfo(scope, index) == 0)
                    continue;

                if((index == factoryObj.cancelRequest) || (index == factoryObj.waitingForUserResponse))
                    continue;

                factoryObj.setDisplayIconInfo(index, bookingStatusArrayObj);

                bookingStatusArrayObj.statusString = factoryObj.bookingStatusArray[i - 1];
                bookingStatusArrayObj.statusInfo = 2;
                bookingStatusArrayObj.statusIndex = 0x1 << i;
                scope.bookingStatusArrayItems.push(bookingStatusArrayObj);
                // console.log(bookingStatusArrayObj);
                factoryObj.lastCount = i;
            }
        }
        var bookingStatusArrayObj = {};
        factoryObj.lastCount++;
        if (factoryObj.lastCount != (factoryObj.bookingStatusArray.length - 1)) {

            factoryObj.setDisplayIconInfo(factoryObj.lastCount, bookingStatusArrayObj);
            bookingStatusArrayObj.statusString = factoryObj.bookingStatusArray[factoryObj.lastCount - 1];
            bookingStatusArrayObj.statusInfo = 4;
            bookingStatusArrayObj.statusIndex = 0x1 << factoryObj.lastCount;
            scope.bookingStatusArrayItems.push(bookingStatusArrayObj);
            // console.log(bookingStatusArrayObj);
        }
    }

    factoryObj.setPickUpDropInfo = function(scope, index) {
        var status = 1;
        // console.log(scope.bookingDetailsArray[0].PickDrop);
        switch (scope.bookingDetailsArray[0].PickDrop) {
            case 0: //no pick and drop selected
                if ((index == factoryObj.sendPersonForPickup) || (index == factoryObj.personPickedVehicle) || (index == factoryObj.personPickedVehicleForDelivery))
                    status = 0;
                break;
            case 1: //only pick selected
                if (index == factoryObj.personPickedVehicleForDelivery)
                    status = 0;
                break;
            case 2: //only drop selected
                if ((index == factoryObj.sendPersonForPickup) || (index == factoryObj.personPickedVehicle))
                    status = 0;
                break;
            case 3: //both pick and drop selected
                status = 1;
                break;
        }
        return status;
    }

    factoryObj.setDisplayIconInfo = function(index, array) {
        if ((index == factoryObj.requestPending) || (index == factoryObj.sendPersonForPickup) || (index == factoryObj.serviceInProgress) || (index == factoryObj.userPaidFullAmount))
            array.iconType = 1;
        else
            array.iconType = 2;
    }


    return factoryObj;
});
