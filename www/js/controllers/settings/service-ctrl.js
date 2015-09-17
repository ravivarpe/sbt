angular.module('starter.serviceConfig', ['ionic'])


.controller('service-config-ctrl', function($scope, serviceConfigFact) {

	$scope.serviceListArrayItems = [];
	$scope.vehicleListArrayItems = [];
	$scope.localString = {};
	$scope.localString.ApplyButton = "Save Changes";
	$scope.localString.SupportedServices = "Supported Services";
	$scope.localString.serviceChecked = false;
	$scope.localString.SupportedVehicles = "Supported Vehicles";
	$scope.localString.vehicleChecked = false;

	$scope.serviceListArrayItems = serviceConfigFact.generateServicesJson(serviceConfigFact.globalServicesJson, serviceConfigFact.userServicesJson);
	// $scope.vehicleListArrayItems = serviceConfigFact.generateServicesJson(serviceConfigFact.globalVehicleJson, serviceConfigFact.userVehicleJson);
	serviceConfigFact.getGlobalAndLocalServicesList("services", $scope);
	serviceConfigFact.getGlobalAndLocalServicesList("vehicles", $scope);

	// serviceConfigFact.parseInputSubmittedJson($scope.serviceListArrayItems);
	// console.log(serviceConfigFact.parseInputSubmittedJson($scope.serviceListArrayItems));
	
});