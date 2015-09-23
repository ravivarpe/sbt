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

.constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
})

.constant('USER_ROLES', {
    admin: 'admin_role',
    public: 'public_role'
})

.config(function($stateProvider, $urlRouterProvider, USER_ROLES) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
        })                
        .state('signup', {
            url: '/signup',
            templateUrl: 'templates/signup.html',
            // controller: 'SignupCtrl'
        })
        .state('vendor-app', {
            url: "/vendor-app",
            abstract: true,
            templateUrl: "templates/menu.html",
            data: {
                requireLogin: true // this property will apply to all children of 'vendor-app'
            }
        })
        .state('vendor-app.logout', {
            url: "/logout",
            view: {
                'menuContent': {
                    templateUrl: "templates/login.html",
                }
            }
        })
        .state('vendor-app.holidays', {
            url: "/holidays",
            views: {
                'menuContent': {
                    templateUrl: "templates/holidays.html",
                    // controller: 'homeCtrl'
                }
            }
        })
        .state('vendor-app.feedback', {
            url: "/feedback",
            views: {
                'menuContent': {
                    templateUrl: "templates/feedback.html",
                    // controller: 'homeCtrl'
                }
            }
        })
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
        .state('vendor-app.subUserSettings', {
            url: "/userSettings/:settingsID",
            views: {
                'menuContent': {
                    templateUrl: "templates/subUserSettings.html",
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
