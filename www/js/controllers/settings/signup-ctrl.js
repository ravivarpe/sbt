angular.module('starter.auth')
.controller('SignupCtrl', function($scope, $state, $ionicPopup, SignupService, AuthService) {
    $scope.data = {};
    $scope.vendorServiceVehicleType = [{
        "type": "Car",
        "value": 0
    }, {
        "type": "Bike",
        "value": 1
    }];    

    $scope.selectedServiceType = {
        value: 0
    };

    // $scope.autherizedVendorSelect = true;
    $scope.autherizedVendorSelect = {
        "Checked": false
    };

    /*
    form reset
     */
     

    $scope.vendorGlobalVehicleList = [];    

    $scope.selectedVehicle = {
        "name":"",
        "index":0
    };


    SignupService.getGlobalVehicleListInfo($scope, $scope.selectedServiceType.value);



    $scope.changeVehicleTypeOption = function(event){
      console.log($scope.selectedServiceType.value);
      SignupService.getGlobalVehicleListInfo($scope, event.value);
    };

    $scope.changeVehicleOption = function(event){
      console.log($scope.vendorGlobalVehicleList[$scope.selectedVehicle.index].name);
      // SignupService.getGlobalVehicleListInfo($scope, event.value);
    };


    $scope.validateServiceConfig = function(object){
      if($scope.autherizedVendorSelect.Checked == false)
        object.exclusiveVendor = 0;
      else 
        object.exclusiveVendor = 1;

      object.vendorVehicleServiceType = $scope.selectedServiceType.value;
      object.brandSupportName = $scope.vendorGlobalVehicleList[$scope.selectedVehicle.index].name;
      console.log(object);
    };


    $scope.signup = function(data, formCheck) {

        console.log(formCheck);

        if (!formCheck.$valid)
            return;

       

        if (data.password == data.cpassword) {
            SignupService.checkemail(data.email).then(function(authenticated) {
                SignupService.checkPhoneNumber(data.phonenumber).then(function(authenticated) {
                    var object = {};
                    object.primaryEmailID = data.email;
                    object.primaryPhoneNumber = data.phonenumber;
                     $scope.validateServiceConfig(object);
                    SignupService.createAccount(object, data.password).then(function(authenticated) {
                        var loginObject = {};
                        loginObject.loginId = data.email;
                        loginObject.loginPassword = data.password;
                        AuthService.loginAfterSignUp(loginObject);
                        $scope.setCurrentUsername(data);
                        signUpForm.reset();
                    }, function(err) {
                        // var alertPopup = $ionicPopup.alert({
                        //     title: 'Sorry Internal Server Error',
                        //     template: ''
                        // });
                    });
                }, function(err) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Phone Number Already Exists',
                        template: ''
                    });
                });
            }, function(err) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Email Already Exists',
                    template: ''
                });
            });
        } else {
            var alertPopup = $ionicPopup.alert({
                title: 'Passwords Are Not Matching',
                template: ''
            });
        }

    };
});
