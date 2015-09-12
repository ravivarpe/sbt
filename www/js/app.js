// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'signup.services' ,'login.services','starter.controllers', 'starter.home', 'starter.bookingList', 'starter.bookingDetails', 'starter.menu', 'starter.serviceConfig', 'starter.userSettings'])


.run(function ($ionicPlatform,$rootScope, $state, AuthService, AUTH_EVENTS) {


$ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        ionic.Platform.isFullScreen = true
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

 })

  $rootScope.$on('$stateChangeStart', function ($event,next, nextParams, fromState) {

    if ('data' in next && 'authorizedRoles' in next.data) {
      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        $state.go($state.current, {}, {reload: true});
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      }
    }
   
    if(fromState.name == 'login' && next.name == 'signup'){
          event.preventDefault();
    }else{
       if (!AuthService.isAuthenticated()) {
           if(next.name !== 'login') {
            event.preventDefault();
            $state.go('login');
          }
      }
  }
  });
});