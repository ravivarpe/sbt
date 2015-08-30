// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter')
    .filter('range', function() {
        return function(input, total) {
            total = parseInt(total);
            for (var i = 0; i < total; i++)
                input.push(i);
            return input;
        };
    })

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('vendor-app.home', {
            url: "/home",
            views: {
                'menuContent': {
                    templateUrl: "templates/home.html",
                    // controller: 'homeCtrl'
                }
            }
        })

    .state('vendor-app.serviceConfig', {
            url: "/serviceConfig",
            views: {
                'menuContent': {
                    templateUrl: "templates/serviceConfig.html",
                    // controller: 'homeCtrl'
                }
            }
        })
        .state('vendor-app.userSettings', {
            url: "/userSettings",
            views: {
                'menuContent': {
                    templateUrl: "templates/userSettings.html",
                    // controller: 'homeCtrl'
                }
            }
        })

    .state('vendor-app.bookingList', {
        url: "/home/booking",
        cache: false,
        params: {
            calendarDetails: null,
        },
        views: {
            'menuContent': {
                templateUrl: "templates/bookingList.html",
                // controller: 'homeCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/vendor-app/home');
    // $urlRouterProvider.otherwise('/vendor-app/home/booking/1');
    // $urlRouterProvider.otherwise('/vendor-app/userSettings');
});
