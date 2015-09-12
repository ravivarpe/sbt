angular.module('login.services',  ['ionic'])

.service('AuthService', function($q,$state,$http,$ionicPopup, USER_ROLES,httpOperationFact, stringDBrepo) {
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var username = '';
  var isAuthenticated = false;
  var role = '';
  var authToken;

  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }

  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }

  function useCredentials(token) {
    username = token.split('.')[0];
    stringDBrepo.setUserUUID(username);
    isAuthenticated = true;
    authToken = token;

    if (username == 'admin') {
      role = USER_ROLES.admin
    }
    if (username == 'user') {
      role = USER_ROLES.public
    }

    // Set the token as header for your requests!
    $http.defaults.headers.common['X-Auth-Token'] = token;
  }

  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    isAuthenticated = false;
    $http.defaults.headers.common['X-Auth-Token'] = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

  var login = function(data) {  
    var response;
    httpOperationFact.sendHttpPostJsonRequest(stringDBrepo.vLoginInfo(),data).then(function(object) {
                    console.log(object.uniqueId);
                    storeUserCredentials(object.uniqueId);
                    $state.go('vendor-app.home', {}, {reload: true});
                },
                function(response) {
                    console.log('Wrong Credentials.');
                    var alertPopup = $ionicPopup.alert({
                    title: 'Login failed!',
                    template: 'Please check your credentials!'
                });
        });
    //   },function(err){
    //     reject('Login Failed');
    //   });
   
    // //   if ((name == 'admin' && pw == '9') || (name == 'user' && pw == '9')) {
    // //     // Make a request and receive your auth token from your server
    // //     storeUserCredentials(name + '.yourServerToken');
    // //     resolve('Login success.');
    // //   } else {
    // //     reject('Login Failed.');
    // //   }
    //  });
  };
// 
  var logout = function() {
    destroyUserCredentials();
  };

  var isAuthorized = function(authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
  };

  loadUserCredentials();

  return {
    login: login,
    logout: logout,
    isAuthorized: isAuthorized,
    isAuthenticated: function() {return isAuthenticated;},
    username: function() {return username;},
    role: function() {return role;}
  };
})


.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized
      }[response.status], response);
      return $q.reject(response);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});


