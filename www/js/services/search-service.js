angular.module('starter')


.service('searchService', function(httpOperationFact, stringDBrepo, $state) {
    this.receivedResponse;
    var SelectedDateBookingInfo = {searchMobileNumber:0};
    // this.SelectedDateBookingInfo.searchMobileNumber=0;

    /*************************************************************Http methods************************************************************/
    this.getUserBookingDetailsUsingMobileNum = function(uniqueId, mobileNumber) {
        var response;
        // console.log(stringDBrepo.vBookingStatusCount(uniqueId, month, year));
        httpOperationFact.sendHttpGetRequest(stringDBrepo.vsearchByMobileNumber(uniqueId, mobileNumber))
            .then(function(data) {
                    console.log(data);
                    this.receivedResponse = data;
                    SelectedDateBookingInfo.searchMobileNumber = mobileNumber;
                    $state.go('vendor-app.bookingList', {calendarDetails: SelectedDateBookingInfo});
                },
                function(response) {
                    console.log('albums retrieval failed.')
                });
    };
    /*************************************************************************************************************************************/



});
