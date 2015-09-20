// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic-toast', 'ngCordova', 'signup.services', 'update.services', 'login.services', 'starter.holidays', 'starter.feedback', 'starter.controllers', 'starter.home', 'starter.bookingList', 'starter.bookingDetails', 'starter.menu', 'starter.serviceConfig', 'starter.userSettings'])


.run(function($ionicPlatform, $rootScope, $state, AuthService, AUTH_EVENTS, ionicToast, $cordovaNetwork) {


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

        if (window.Connection) {
            $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
                // alert('online good sir');
                // ionicToast.show('Internet online', 'middle', false, 2500);
            })
            $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
                // alert('offline good sir');
                ionicToast.show('Internet offline', 'middle', false, 2500);
            })
        }

    })
    $ionicPlatform.registerBackButtonAction(function(event) {
        if ($state.is('vendor-app.home') || $state.is('login')){
            navigator.app.exitApp();
        } else {
            // navigator.app.backHistory();
            $state.go('vendor-app.home');
        }
    }, 101);

    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, fromState) {

        if ('data' in next && 'authorizedRoles' in next.data) {
            var authorizedRoles = next.data.authorizedRoles;
            if (!AuthService.isAuthorized(authorizedRoles)) {
                event.preventDefault();
                $state.go($state.current, {}, {
                    reload: true
                });
                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
            }
        }

        if (fromState.name === 'login' && next.name === 'signup') {
            console.log("test");
            // event.preventDefault();
            // $state.go('signup');
        } else {
            if (!AuthService.isAuthenticated()) {
                if (next.name !== 'login') {
                    event.preventDefault();
                    $state.go('login');
                }
            }
        }
    });
});
