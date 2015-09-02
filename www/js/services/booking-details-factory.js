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

    factoryObj.sumOfAllStatus = factoryObj.requestPending;
    // factoryObj.confirmRequest ;
    // factoryObj.cancelRequest | 
    // factoryObj.sendPersonForPickup |
    // factoryObj.personPickedVehicle |
    // factoryObj.receivedCarFromUser |
    // factoryObj.serviceInProgress |
    // factoryObj.waitingForUserResponse | 
    // factoryObj.serviceComplete ;
    // factoryObj.personPickedVehicleForDelivery |
    // factoryObj.devliveredVehicle |
    // factoryObj.userPaidFullAmount;




    // factoryObj.stateInfo = [
    //   { id: factoryObj.confirmRequest, options:[{1:"Confirm booking"}, {2:"Vehicle not Supported"}, {4:"Insufficient Staff"}, {6:"Un-expected Holiday"}] },
    //   { id: factoryObj.sendPersonForPickup, options:[{1:"Initiated vehicle pickup"}, {2:"Cancelled due Un-expected holiday"}] },
    //   { id: factoryObj.personPickedVehicle, options:[{1:"Vehicle got picked"}, {2:"User is not reachable"}, {4:"User cancelled service"}] },
    //   { id: factoryObj.receivedCarFromUser, options:[{1:"Vehicle received for service"}] },
    //   { id: factoryObj.serviceInProgress, options:[{1:"Service in progress"}, {2:"Waiting for user response"}, {4:"Service got postponed"}] },
    //   { id: factoryObj.serviceComplete, options:[{1:"Service completed"}, {2:"Service got postponed"}, {3:"Service cancelled"}] },
    //   { id: factoryObj.personPickedVehicleForDelivery, options:[{1:"Vehicle Drop in progress"}, {2:"Vehicle Drop initiated"}, {3:"Drop got postponed"}] },
    //   { id: factoryObj.devliveredVehicle, options:[{1:"Vehicle delivered"}, {2:"User not reachable"}] },
    //   { id: factoryObj.userPaidFullAmount, options:[{1:"Amount paid"}] }
    // ];


    factoryObj.stateDetails = [{
        index: factoryObj.confirmRequest,
        state: [{
            option: "Confirm Booking",
            id: 1
        }, {
            option: "Vehicle not Supported",
            id: 2
        }, {
            option: "Pickup/Drop unavailable",
            id: 3
        }, {
            option: "Unexpected Holiday",
            id: 4
        }, {
            option: "Insufficient staff",
            id: 5
        }]
    }, {
        index: factoryObj.sendPersonForPickup,
        state: [{
            option: "Initiated vehicle pickup",
            id: 1
        }, {
            option: "Cancelled due Un-expected holiday",
            id: 2
        }]
    }, {
        index: factoryObj.personPickedVehicle,
        state: [{
            option: "Vehicle got picked",
            id: 1
        }, {
            option: "User is not reachable",
            id: 2
        }, {
            option: "User cancelled service",
            id: 4
        }]
    }, {
        index: factoryObj.receivedCarFromUser,
        state: [{
            option: "Vehicle received for service",
            id: 1
        }]
    }, {
        index: factoryObj.serviceInProgress,
        state: [{
            option: "Service in progress",
            id: 1
        }, {
            option: "Waiting for user response",
            id: 2
        }, {
            option: "Service got postponed",
            id: 4
        }]
    }, {
        index: factoryObj.serviceComplete,
        state: [{
            option: "Service completed",
            id: 1
        }, {
            option: "Service got postponed",
            id: 2
        }, {
            option: "Service cancelled",
            id: 4
        }]
    }, {
        index: factoryObj.personPickedVehicleForDelivery,
        state: [{
            option: "Vehicle Drop in progress",
            id: 1
        }, {
            option: "Vehicle Drop initiated",
            id: 2
        }, {
            option: "Drop got postponed",
            id: 4
        }]
    }, {
        index: factoryObj.devliveredVehicle,
        state: [{
            option: "Vehicle delivered",
            id: 1
        }, {
            option: "User not reachable",
            id: 2
        }]
    }, {
        index: factoryObj.userPaidFullAmount,
        state: [{
            option: "Amount paid",
            id: 1
        }]
    }];







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
        factoryObj.lastCount = 0;
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
                factoryObj.lastCount++;
            } else {
                index = (0x1 << i);
                if (factoryObj.setPickUpDropInfo(scope, index) == 0)
                    continue;

                if ((index == factoryObj.cancelRequest) || (index == factoryObj.waitingForUserResponse))
                    continue;

                factoryObj.setDisplayIconInfo(index, bookingStatusArrayObj);

                bookingStatusArrayObj.statusString = factoryObj.bookingStatusArray[i - 1];
                bookingStatusArrayObj.statusInfo = 0;
                bookingStatusArrayObj.statusIndex = 0x1 << i;
                scope.bookingStatusArrayItems.push(bookingStatusArrayObj);


                //     console.log(i);
                // console.log(bookingStatusArrayObj);
            }

        }
        // console.log(factoryObj.lastCount);
        scope.bookingStatusArrayItems[factoryObj.lastCount].statusInfo = 4;


    }

    factoryObj.setPickUpDropInfo = function(scope, index) {
        var status = 1;
        // console.log(scope.bookingDetailsArray[0].PickDrop);
        switch (scope.bookingDetailsArray[0].pickOrDrop) {
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
