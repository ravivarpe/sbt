angular.module('starter.bookingList')


.factory('BookingListFact', function(httpOperationFact, stringDBrepo) {
    var factoryObj = {};

    // factoryObj.bookingSlotIdTagString = "SlotId";
    // factoryObj.bookingUserUniqueIdTagString = "UserUniqueId";
    // factoryObj.bookingUserAddressTagString = "UserAddress";
    // factoryObj.bookingUserZipCodeTagString = "ZipCode";
    // factoryObj.bookingUserPhoneNumTagString = "PhoneNumber";
    // factoryObj.bookingUserBookingStatusTagString = "BookingStatus";
    // factoryObj.bookingPickDropTagString = "PickDrop";
    // factoryObj.bookingMinAmountTagString = "MinServiceAmount";
    // factoryObj.bookingFinalAmountTagString = "FinalAmount";
    // factoryObj.bookingPickUpPersonNameTagString = "PersonName";
    // factoryObj.bookingPickupPersonPhoneNumTagString = "PersonPhoneNum";
    // factoryObj.bookingUserEmailIdTagString = "UserEmailID";
    // factoryObj.bookingUserAltPhoneNumTagString = "AltPhoneNum";
    // factoryObj.bookingUserBookingIdTagString = "UserBookingId";
    // factoryObj.bookingBookingTimeTagString = "BookingTime";
    // factoryObj.bookingVehicleDeliveryTagString = "VehicleDeliveryTime";
    // factoryObj.bookingUserNameTagString = "UserName";
    // factoryObj.bookingUserVehicleModelTagString = "VehicleModel";
    // factoryObj.bookingUserVehicleNumberTagString = "VehicleNumber";
    // factoryObj.bookingUserVehicleYoFManuTagString = "YoF";
    // factoryObj.bookingUserRatedIndicationTagString = "RatingFlag";

    /*************************************************************Http methods************************************************************/
    factoryObj.getBookingInfoUsingDate = function(uniqueId, scope, dateInSecs) {
        var response;
        // console.log(stringDBrepo.vBookingStatusCount(uniqueId, month, year));
        httpOperationFact.sendHttpGetRequest(stringDBrepo.vBookingInfoViaDay(uniqueId, dateInSecs))
            .then(function(data) {
                    // console.log(data);
                    factoryObj.showReceivedBookingInfo(scope, data);
                },
                function(response) {
                    console.log('albums retrieval failed.')
                });
    };

    factoryObj.getUserBookingDetailsUsingMobileNum = function(uniqueId, scope, mobileNumber) {
        var response;
        // console.log(stringDBrepo.vBookingStatusCount(uniqueId, month, year));
        httpOperationFact.sendHttpGetRequest(stringDBrepo.vsearchByMobileNumber(uniqueId, mobileNumber))
            .then(function(data) {
                    console.log(data);
                    factoryObj.showReceivedBookingInfo(scope, data);
                },
                function(response) {
                    console.log('albums retrieval failed.')
                });
    };


    /*************************************************************************************************************************************/
    // AltPhoneNum: 0
    // BookingStatus: 2
    // BookingTime: 1440344743
    // FinalAmount: 0
    // MinServiceAmount: 0
    // PersonName: null
    // PersonPhoneNum: 0
    // PhoneNumber: 9441340197
    // PickDrop: 0
    // PickUpLatitude: 0
    // PickUpLongitude: 0
    // RatingFlag: false
    // SlotId: 1
    // UserAddress: "{"HouseAddress":null,"State":null,"ZipCode":0,"DefaultLongitude":0,"Country":null,"City":null,"DefaultLatitude":0,"CountryCode":0}"
    // UserBookingId: 12
    // UserEmailID: "vilakshan@bidgely.com"
    // UserName: "Vilakshan"
    // UserUniqueId: "94413401971440333545849"
    // VehicleDeliveryTime: 0
    // VehicleModel: "maruthi"
    // VehicleNumber: ""
    // YoF: 1994
    // ZipCode: 0
    factoryObj.showReceivedBookingInfo = function(scope, responseData) {
        scope.bookingListArray.length = 0;


        for (var i in responseData) {
            var userBookingInfoObj = {};
            userBookingInfoObj = responseData[i];
            factoryObj.setBookingStatusInfo(userBookingInfoObj);
            factoryObj.setPickDropStatus(userBookingInfoObj);
            userBookingInfoObj.BookingTimeFormat = factoryObj.convertSecsToDate(userBookingInfoObj.BookingTime);
            userBookingInfoObj.VehicleDeliveryTimeFormat = factoryObj.convertSecsToDate(userBookingInfoObj.VehicleDeliveryTime);

            var addressInfoObj = {};
            addressInfoObj = JSON.parse(userBookingInfoObj.UserAddress);;
            // console.log(addressInfoObj.ZipCode);
            userBookingInfoObj.FullAddress = " ";
            factoryObj.checkForAddressInfo(userBookingInfoObj, addressInfoObj);

            // userBookingInfoObj.FullAddress = addressInfoObj.HouseAddress + ", " + addressInfoObj.City  + ", " + addressInfoObj.State + ", " + addressInfoObj.CountryCode + ", " + addressInfoObj.ZipCode;
            console.log(userBookingInfoObj);
            scope.bookingListArray.push(userBookingInfoObj);
        }
    };

    factoryObj.checkForAddressInfo = function(bookingInfo, object) {
        // bookingInfo.FullAddress = "";
        if (object.HouseAddress)
            bookingInfo.FullAddress = object.HouseAddress + " ";
        if (object.City)
            bookingInfo.FullAddress = object.City + " ";
        if (object.State)
            bookingInfo.FullAddress = object.State + " ";
        if (object.CountryCode)
            bookingInfo.FullAddress = object.CountryCode + " ";
        if (object.ZipCode)
            bookingInfo.FullAddress = object.ZipCode + " ";


    };

    factoryObj.setCalendarDayInfo = function(scope, data) {

        scope.bookingListArray.length = 0;
        var userBookingInfoObj = {};
        userBookingInfoObj.SlotId = 1;
        userBookingInfoObj.UserUniqueId = "11111111111111111111";
        userBookingInfoObj.UserAddress = "J.P.Nagar, 1st Block, Bangalore";
        userBookingInfoObj.ZipCode = 560000;
        userBookingInfoObj.PhoneNumber = 9010101010;

        userBookingInfoObj.BookingStatus = 2;
        factoryObj.setBookingStatusInfo(userBookingInfoObj);

        userBookingInfoObj.PickDrop = 3;
        factoryObj.setPickDropStatus(userBookingInfoObj);

        userBookingInfoObj.MinServiceAmount = 2000;
        userBookingInfoObj.FinalAmount = 12000.00;
        userBookingInfoObj.PersonName = "Raj";
        userBookingInfoObj.PersonPhoneNum = "9020202020";
        userBookingInfoObj.UserEmailID = "aravind@sunwiz.com";
        userBookingInfoObj.AltPhoneNum = 9030303030;
        userBookingInfoObj.UserBookingId = 2;

        userBookingInfoObj.BookingTime = 1438732800;
        userBookingInfoObj.BookingTimeFormat = factoryObj.convertSecsToDate(userBookingInfoObj.BookingTime);
        userBookingInfoObj.VehicleDeliveryTime = 1438819200;
        userBookingInfoObj.VehicleDeliveryTimeFormat = factoryObj.convertSecsToDate(userBookingInfoObj.VehicleDeliveryTime);

        userBookingInfoObj.UserName = "Aravind Kumar A";
        userBookingInfoObj.VehicleModel = "Maruti Alto";
        userBookingInfoObj.VehicleNumber = "KA 6555";
        userBookingInfoObj.YoF = "2013";
        userBookingInfoObj.RatingFlag = false;

        scope.bookingListArray.push(userBookingInfoObj);

    };

    factoryObj.setBookingStatusInfo = function(bookingObj) {
        switch (bookingObj.BookingStatus) {
            case 1:
                bookingObj.BookingStatusColor = "booking-pending-status";
                bookingObj.BookingStatusString = "Pending";
                break
            case 2:
                bookingObj.BookingStatusColor = "booking-confirm-status";
                bookingObj.BookingStatusString = "Confirm";
                break
            case 3:
                bookingObj.BookingStatusColor = "booking-cancel-status";
                bookingObj.BookingStatusString = "Cancelled";
                break
            case 4:
                bookingObj.BookingStatusColor = "booking-cancel-status";
                bookingObj.BookingStatusString = "Cancelled";
                break
            case 5:
                bookingObj.BookingStatusColor = "booking-inprogress-status";
                bookingObj.BookingStatusString = "Inprogress";
                break
            case 6:
                bookingObj.BookingStatusColor = "booking-waiting-status";
                bookingObj.BookingStatusString = "Waiting";
                break
            case 7:
                bookingObj.BookingStatusColor = "booking-complete-status";
                bookingObj.BookingStatusString = "Complete";
                break
            default:
                break;

        }

        if (bookingObj.BookingStatus == 0 || bookingObj.BookingStatus == 1)
            bookingObj.requestAcceptString = "Confirm";
        else
            bookingObj.requestAcceptString = "Cancel";

    }

    factoryObj.setPickDropStatus = function(bookingObj) {
        switch (bookingObj.PickDrop) {
            case 0:
                bookingObj.PickDropString = "NO pickup/Drop";
                break
            case 1:
                bookingObj.PickDropString = "Pickup only";
                break
            case 2:
                bookingObj.PickDropString = "Drop only";
                break
            case 3:
                bookingObj.PickDropString = "Pick/Drop";
                break

            default:
                bookingObj.PickDropString = "N/A";
                break;

        }
    }

    factoryObj.convertSecsToDate = function(dateInSecs) {
        var dateInfo = new Date(dateInSecs * 1000);
        var month = ("0" + dateInfo.getMonth()).slice(-2);
        var dateNum = ("0" + dateInfo.getDate()).slice(-2);

        return (dateNum + "/" + month + "/" + dateInfo.getFullYear());
    }



    return factoryObj;
});
