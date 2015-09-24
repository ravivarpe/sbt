angular.module('starter.auth')


.controller('forgot-password-ctrl', function($scope,$state, $timeout, stringDBrepo, httpOperationFact) {



    /*operation type -> true is for forgot password / false is for password change*/
    $scope.updatePasswordResetStatus = false;
    $scope.statusIndation = false;
    $scope.switchBetweenLoginAndPassword = false;


    console.log("got here");

    $scope.passwordChangeObj = {
        "email": "",
        "phonenumber": "",
    };

    $scope.backToLogin = function(){
        $scope.switchBetweenLoginAndPassword = false;
    };

    $scope.switchViews = function(){
        $scope.switchBetweenLoginAndPassword = !$scope.switchBetweenLoginAndPassword;
        console.log($scope.switchBetweenLoginAndPassword);
    };


    // Open the login modal
    $scope.passwordModal = function(selectFlag, formCheck) {

        if(!formCheck.$valid)
            return;
        passwordOprForm.reset();
        console.log(selectFlag);
        $scope.updateBookingInformation(selectFlag.email);      
        
    };

    $scope.updateBookingInformation = function(emailId) {
        var request={};
        // var sendTo = "aravind.andagunda@gmail.com";
        // console.log(stringDBrepo.vBookingStatusCount(uniqueId, month, year));
        httpOperationFact.sendHttpPostJsonRequest(stringDBrepo.vForgotPasswordURL(emailId), request)
            .then(function(data) {
                $scope.updatePasswordResetStatus = true;
                $scope.statusIndation = false;
                    console.log(data);
                },
                function(response) {
                    $scope.updatePasswordResetStatus = false;
                    $scope.statusIndation = true;
                    console.log('albums retrieval failed.')
                });
    };


});
