angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
  $scope.username = AuthService.username();

  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
    var alertPopup = $ionicPopup.alert({
      title: 'Unauthorized!',
      template: 'You are not allowed to access this resource.'
    });
  });

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });

  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  };

  $scope.logout = function() {
    AuthService.logout();
    $state.go('login', {}, {reload: true});
  };

})

.controller('LoginCtrl', function($scope, $state, $ionicPopup, AuthService) {
  $scope.data = {};

  $scope.login = function(data) {
  AuthService.login(data);
  //   AuthService.login(data).then(function(authenticated) {
  //     $state.go('vendor-app.home', {}, {reload: true});
  //     $scope.setCurrentUsername(data.username);
  //   }, function(err) {
  //     var alertPopup = $ionicPopup.alert({
  //       title: 'Login failed!',
  //       template: 'Please check your credentials!'
  //     });
  //   });
   };
})

.controller('SignupCtrl',function($scope,$state,$ionicPopup,SignupService,AuthService){
  $scope.data = {};

  $scope.signup = function(data) {
      if(data.password == data.cpassword){
      SignupService.checkemail(data.email).then(function(authenticated) {
           SignupService.checkPhoneNumber(data.phonenumber).then(function(authenticated) {
              var object = {};
              object.primaryEmailID = data.email;
              object.primaryPhoneNumber = data.phonenumber;
              SignupService.createAccount(object,data.password).then(function(authenticated) {
                   var loginObject = {};
                   loginObject.loginId=data.email;
                   loginObject.loginPassword = data.password;
                   AuthService.login(loginObject);
                   $scope.setCurrentUsername(data);
              }, function(err) {
                  var alertPopup = $ionicPopup.alert({
                  title: 'Sorry Internal Server Error',
                 template: ''
              });
         });
           }, function(err) {
              var alertPopup = $ionicPopup.alert({
              title: 'Phone Number Already Exists',
              template: ''
           });
         });
      },function(err) {
          var alertPopup = $ionicPopup.alert({
         title: 'Email Already Exists',
         template: ''
       });
     });
    }else{
      var alertPopup = $ionicPopup.alert({
        title: 'Passwords Are Not Matching',
        template: ''
      });
    }

  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
  console.log($stateParams.playlistId);
});
