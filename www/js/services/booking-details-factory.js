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

    factoryObj.confirmLevel = 1;
    factoryObj.cancelLevel = 2;
    factoryObj.sameLevel = 3;


    factoryObj.stateDetails = [{
        index: factoryObj.confirmRequest,
        state: [{
            option: "Confirm Booking",
            id: 1,
            status: factoryObj.confirmLevel,
            reason: ""
        }, {
            option: "Vehicle not Supported",
            id: 2,
            status: factoryObj.cancelLevel,
            reason: ""
        }, {
            option: "Pickup/Drop unavailable",
            id: 3,
            status: factoryObj.cancelLevel,
            reason: ""
        }, {
            option: "Unexpected Holiday",
            id: 4,
            status: factoryObj.cancelLevel,
            reason: ""
        }, {
            option: "Insufficient staff",
            id: 5,
            status: factoryObj.cancelLevel,
            reason: ""
        }]
    }, {
        index: factoryObj.sendPersonForPickup,
        state: [{
            option: "Initiated vehicle pickup",
            id: 1,
            status: factoryObj.confirmLevel,
            reason: ""
        }, {
            option: "Cancelled - Unexpected holiday",
            id: 2,
            status: factoryObj.cancelLevel,
            reason: ""
        }]
    }, {
        index: factoryObj.personPickedVehicle,
        state: [{
            option: "Vehicle got picked",
            id: 1,
            status: factoryObj.confirmLevel,
            reason: ""
        }, {
            option: "User is not reachable",
            id: 2,
            status: factoryObj.cancelLevel,
            reason: ""
        }, {
            option: "User cancelled service",
            id: 3,
            status: factoryObj.cancelLevel,
            reason: ""
        }]
    }, {
        index: factoryObj.receivedCarFromUser,
        state: [{
            option: "Vehicle received for service",
            id: 1,
            status: factoryObj.confirmLevel,
            reason: ""
        }]
    }, {
        index: factoryObj.serviceInProgress,
        state: [{
            option: "Service in progress",
            id: 1,
            status: factoryObj.confirmLevel,
            reason: ""
        }, {
            option: "Waiting for user response",
            id: 2,
            status: factoryObj.sameLevel,
            reason: ""
        }, {
            option: "Service got postponed",
            id: 3,
            status: factoryObj.sameLevel,
            reason: ""
        }, {
            option: "Service cancelled",
            id: 4,
            status: factoryObj.cancelLevel,
            reason: ""
        }]
    }, {
        index: factoryObj.serviceComplete,
        state: [{
            option: "Service completed",
            id: 1,
            status: factoryObj.confirmLevel,
            reason: ""
        }, {
            option: "Service got postponed",
            id: 2,
            status: factoryObj.sameLevel,
            reason: ""
        }, {
            option: "Service cancelled",
            id: 3,
            status: factoryObj.cancelLevel,
            reason: ""
        }]
    }, {
        index: factoryObj.personPickedVehicleForDelivery,
        state: [{
            option: "Vehicle Drop in progress",
            id: 1,
            status: factoryObj.confirmLevel,
            reason: ""
        }, {
            option: "Drop got postponed",
            id: 2,
            status: factoryObj.sameLevel,
            reason: ""
        }]
    }, {
        index: factoryObj.devliveredVehicle,
        state: [{
            option: "Vehicle delivered",
            id: 1,
            status: factoryObj.confirmLevel,
            reason: ""
        }, {
            option: "User not reachable",
            id: 2,
            status: factoryObj.sameLevel,
            reason: ""
        }]
    }, {
        index: factoryObj.userPaidFullAmount,
        state: [{
            option: "Amount paid",
            id: 1,
            status: factoryObj.confirmLevel,
            reason: ""
        }]
    }];







    factoryObj.bookingStatusArray = [{name:"Request Pending", flag:true},
        {name:"Confirm Booking", flag:true},
        {name:"Request Cancelled", flag:false},
        {name:"Initiate Pickup", flag:true},
        {name:"Pickup Vehicle", flag:true},
        {name:"Vehicle reached", flag:true},
        {name:"Initiate Service", flag:true},
        {name:"Waiting for response", flag:false},
        {name:"Update Service", flag:true},
        {name:"Vehicle Drop in progress", flag:true},
        {name:"Deliver Vehicle", flag:true},
        {name:"Amount Paid", flag:true},
        {name:"Got feedback", flag:false}
    ];

    factoryObj.setBookingLiveStatus = function(scope) {

        // console.log();
        var bookingStatus = scope.bookingDetailsArray[0].bookingStatus;
        // console.log(bookingStatus);
        factoryObj.lastCount = 0;
        for (var i = 1; i < factoryObj.bookingStatusArray.length; i++) {

            var bookingStatusArrayObj = {};
            bookingStatusArrayObj.iconType = 0;
            if ((bookingStatus >> i) & 0x1) {
                index = (0x1 << i);


                if ((factoryObj.setPickUpDropInfo(scope, index) == 0) || (factoryObj.bookingStatusArray[i - 1].flag == false))
                    continue;

                factoryObj.setDisplayIconInfo(index, bookingStatusArrayObj);

                bookingStatusArrayObj.statusString = factoryObj.bookingStatusArray[i - 1].name;
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

                bookingStatusArrayObj.statusString = factoryObj.bookingStatusArray[i - 1].name;
                bookingStatusArrayObj.statusInfo = 0;
                bookingStatusArrayObj.statusIndex = 0x1 << i;
                scope.bookingStatusArrayItems.push(bookingStatusArrayObj);


                //     console.log(i);
                // console.log(bookingStatusArrayObj);
            }

        }
        // console.log(factoryObj.lastCount);
        if (bookingStatus & factoryObj.cancelRequest)
            scope.bookingStatusArrayItems[factoryObj.lastCount].statusInfo = 3;
        else if (bookingStatus & factoryObj.waitingForUserResponse) {
            var bookingReason = JSON.parse(scope.bookingDetailsArray[0].bookingStatusReason);
            // console.log(bookingReason);
            scope.bookingStatusArrayItems[factoryObj.lastCount].statusString = bookingReason.option;
            scope.bookingStatusArrayItems[factoryObj.lastCount].statusInfo = 4;
        } else if(!(scope.bookingDetailsArray[0].bookingStatus & factoryObj.userPaidFullAmount))
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
