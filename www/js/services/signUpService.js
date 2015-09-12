angular.module('signup.services',  ['ionic'])

.service('SignupService', function($q, $http,httpOperationFact, stringDBrepo) {

	this.checkemail = function(email) { 
		 return $q(function(resolve, reject) {  
			httpOperationFact.sendHttpGetRequest(stringDBrepo.vendorUniqueIdFromEmail(email)).then(function(data) {
                    console.log(data);
                    reject('UserExists.');
                },
                function(response) {
                    console.log('login failed')
                    resolve('Doesnt Exists');
                });
		});
	};

	this.checkPhoneNumber = function(phone) { 
		 return $q(function(resolve, reject) {  
			httpOperationFact.sendHttpGetRequest(stringDBrepo.vendorUniqueIdFromPhone(phone)).then(function(data) {
                    console.log(data);
                    reject('UserExists.');
                },
                function(response) {
                    console.log('login failed')
                    resolve('Doesnt Exists');
                });
		});
	};

	this.createAccount = function(object,passwd){
		 return $q(function(resolve, reject) {  
		 	httpOperationFact.sendHttpPutJsonRequest(stringDBrepo.createVendor(passwd),object).then(function(data) {
		 		console.log("here");
		 		resolve('Account Created');
		 	},
		 	function(response) {
		 		reject('I S E');
		 	});
		 });
	};

});