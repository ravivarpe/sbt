// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter')

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('vendor-app.bookingDetails', {
            url: "/bookingDetails",
            params: {
                bookingDetailsInfo: null,
            },
            views: {
                'menuContent': {
                    templateUrl: "templates/bookingDetails.html",
                    // controller: 'homeCtrl'
                }
            }
        });
    // if none of the above states are matched, use this as the fallback
    // $urlRouterProvider.otherwise('/vendor-app/bookingDetails');
});
