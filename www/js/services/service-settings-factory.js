angular.module('starter.serviceConfig')

.factory('serviceConfigFact', function(httpOperationFact, stringDBrepo) {
    var factoryObj = {};
    factoryObj.name = '';

    factoryObj.globalServicesJson = [];

    factoryObj.globalVehicleJson = [];


    factoryObj.userServicesJson = [];

    factoryObj.userVehicleJson = [];


    // factoryObj.globalServicesJson = [{
    //     name: "washing",
    //     list: ["oil wash", "water wash", "glass wash", "wind shield wash"]
    // }, {
    //     name: "painting",
    //     list: ["oil paint", "regular paint", "glass paint", "air blow paint"]
    // }];

    // factoryObj.globalVehicleJson = [{
    //     name: "Maruti",
    //     list: ["800", "Alto", "Swift", "SX4"]
    // }, {
    //     name: "Hyundai",
    //     list: ["i10", "i20", "xcent"]
    // }];


    // factoryObj.userServicesJson = [{
    //     list: ["washing", "oil wash", "water wash", "glass wash", "wind shield wash"]
    // }, {
    //     list: ["painting", "oil paint", "regular paint", "glass paint"]
    // }];

    // factoryObj.userVehicleJson = [{
    //     list: ["Maruti", "800", "Alto", "Swift"]
    // }, {
    //     list: ["Hyundai", "i10", "i20", "xcent"]
    // }];

    /*******************************************http***********************************************/
    factoryObj.getVendorOverviewInfoServices = function(scope) {
        var response;
        // console.log(stringDBrepo.vBookingStatusCount(uniqueId, month, year));
        httpOperationFact.sendHttpGetRequest(stringDBrepo.vOverviewInfoURL(stringDBrepo.vendorUniqueId))
            .then(function(data) {
                    scope.overviewInfo = data;
                    factoryObj.getGlobalAndLocalServicesList("services", scope, scope.overviewInfo.vendorVehicleServiceType);
                    factoryObj.getGlobalAndLocalServicesList("vehicles", scope, scope.overviewInfo.vendorVehicleServiceType);
                    // console.log(scope.overviewInfo);
                },
                function(response) {
                    console.log('albums retrieval failed.')
                });
    };

    factoryObj.getGlobalListInformation = function(serviceType, scope, vehicleType) {
        var response;
        // console.log(stringDBrepo.vGlobalServiceListInfoURL(serviceType, vehicleType));
        httpOperationFact.sendHttpGetRequest(stringDBrepo.vGlobalServiceListInfoURL(serviceType, vehicleType))
            .then(function(data) {
                    if (serviceType == "services") {
                        factoryObj.globalServicesJson = data;
                    } else if (serviceType == "vehicles") {
                        factoryObj.globalVehicleJson = data;
                    }
                    factoryObj.getLocalListInformation(stringDBrepo.vendorUniqueId, serviceType, scope);
                    console.log(data);
                    // factoryObj.showReceivedBookingInfo(scope, data);
                },
                function(response) {
                    console.log('albums retrieval failed.')
                });
    };


    factoryObj.updateGlobalListInformation = function(serviceType, options, bookingJson, scope) {
        var response;

        // console.log(stringDBrepo.vBookingStatusCount(uniqueId, month, year));
        httpOperationFact.sendHttpPostJsonRequest(stringDBrepo.vUpdateGlobalServiceListInfoURL(serviceType, options), bookingJson)
            .then(function(data) {
                    // console.log(data);
                },
                function(response) {
                    console.log('albums retrieval failed.')
                });
    };


    factoryObj.getLocalListInformation = function(uniqueId, serviceType, scope) {
        var response;
        // console.log(stringDBrepo.vGlobalServiceListInfoURL(serviceType));
        httpOperationFact.sendHttpGetRequest(stringDBrepo.vLocalServiceListInfoURL(uniqueId, serviceType))
            .then(function(data) {
                    if (serviceType == "services") {
                        factoryObj.userServicesJson = data;
                        factoryObj.processGlobalServiceSupportListInfo(scope);
                    } else if (serviceType == "vehicles") {
                        factoryObj.userVehicleJson = data;
                        console.log(factoryObj.userVehicleJson);
                        factoryObj.processGlobalVehicleSupportListInfo(scope);
                    }
                    // console.log(data);
                    // factoryObj.showReceivedBookingInfo(scope, data);
                },
                function(response) {
                    console.log('albums retrieval failed.')
                });
    };


    factoryObj.updateLocalListInformation = function(uniqueId, serviceType, options, bookingJson) {
        var response;

        // console.log(stringDBrepo.vBookingStatusCount(uniqueId, month, year));
        httpOperationFact.sendHttpPostJsonRequest(stringDBrepo.vUpdateLocalServiceListInfoURL(uniqueId, serviceType, options), bookingJson)
            .then(function(data) {
                    console.log(data);
                },
                function(response) {
                    console.log('albums retrieval failed.')
                });
    };

    /**************************************************************************************************/


    factoryObj.getGlobalAndLocalServicesList = function(seriveType, scope, vehicleType) {
        factoryObj.getGlobalListInformation(seriveType, scope, vehicleType);
        // factoryObj.getLocalListInformation(stringDBrepo.vendorUniqueId, seriveType, scope);
    };

    factoryObj.processGlobalServiceSupportListInfo = function(scope) {
        if (factoryObj.globalServicesJson.length) {
            scope.serviceListArrayItems = factoryObj.generateServicesJson(factoryObj.globalServicesJson, factoryObj.userServicesJson, scope);
        }
    };

    factoryObj.processGlobalVehicleSupportListInfo = function(scope) {
        if (factoryObj.globalVehicleJson.length) {
            scope.vehicleListArrayItems = factoryObj.generateServicesJson(factoryObj.globalVehicleJson, factoryObj.userVehicleJson, scope);
            // console.log(scope.vehicleListArrayItems);
            // factoryObj.parseInputServiceSubmittedJson(scope.vehicleListArrayItems);
        }
    };




    factoryObj.setName = function(newName) {
        factoryObj.name = newName;
    };


    factoryObj.generateServicesJson = function(globalJson, userJson, scope) {
        var mainObj = [];
        mainObj.length = 0;
        /*global opertaions*/
        // factoryObj.getGlobalListInformation("services");
        // factoryObj.updateGlobalListInformation("services", "add", factoryObj.globalServicesJson);
        // factoryObj.getGlobalListInformation("vehicles");
        // factoryObj.updateGlobalListInformation("vehicles", "add", factoryObj.globalVehicleJson);

        /*local operations*/
        // factoryObj.getLocalListInformation(stringDBrepo.vendorUniqueId, "services");
        // factoryObj.updateLocalListInformation(stringDBrepo.vendorUniqueId, "services", "add",factoryObj.userServicesJson);
        // factoryObj.getLocalListInformation(stringDBrepo.vendorUniqueId, "vehicles");
        // factoryObj.updateLocalListInformation(stringDBrepo.vendorUniqueId, "vehicles", "add",factoryObj.userVehicleJson);



        angular.forEach(globalJson, function(value, key) {
            var primaryObj = {};
            // console.log(scope.overviewInfo.brandSupportName);

            primaryObj.ServiceType = value.name;
            primaryObj.checked = false;
            primaryObj.SubServices = [];
            for (var i in value.list) {
                var secondaryObj = {};
                secondaryObj.service = value.list[i];
                secondaryObj.checked = false;
                primaryObj.SubServices.push(secondaryObj);
            }
            if ((angular.equals(value.name, scope.overviewInfo.brandSupportName) == true) || (value.name == "")) {
                mainObj.push(primaryObj);
            }
        });
        // console.log(mainObj);
        factoryObj.checkExistingServiceConfig(userJson, mainObj);
        // console.log(mainObj);
        // factoryObj.parseInputServiceSubmittedJson(mainObj);
        // console.log(factoryObj.userServicesJson);
        return mainObj;
    };

    factoryObj.checkExistingServiceConfig = function(userJsonObjArray, GlobalJsonArray) {
        angular.forEach(userJsonObjArray, function(valueS, keyS) {

            angular.forEach(GlobalJsonArray, function(valueG, keyG) {

                if ((angular.equals(valueS.list[0], valueG.ServiceType) == true) && (valueS.list.length > 1)) {
                    valueG.checked = true;
                    for (var i = 1; i < valueS.list.length; i++) {
                        for (var j in valueG.SubServices) {
                            if (angular.equals(valueS.list[i], valueG.SubServices[j].service) == true) {
                                valueG.SubServices[j].checked = true;
                            }
                        }

                    }
                }

            });

        });
    };

    factoryObj.parseInputServiceSubmittedJson = function(inputArray, serviceType) {
        var mainObj = [];
        var deleteObj = [];
        console.log(inputArray);

        angular.forEach(inputArray, function(value, key) {
            var primaryObj = {};
            var ignoreObj = {};
            primaryObj.list = [];
            ignoreObj.list = [];

            if (value.checked == true) {
                primaryObj.list.push(value.ServiceType);
                ignoreObj.list.push(value.ServiceType);
                for (var i in value.SubServices) {
                    if (value.SubServices[i].checked == true) {
                        primaryObj.list.push(value.SubServices[i].service);
                    } else {
                        ignoreObj.list.push(value.SubServices[i].service);
                    }
                }
                mainObj.push(primaryObj);
                deleteObj.push(ignoreObj);
            } else {
                ignoreObj.list.push(value.ServiceType);
                for (var i in value.SubServices) {
                    ignoreObj.list.push(value.SubServices[i].service);
                }
                deleteObj.push(ignoreObj);
            }


        });
        // console.log(mainObj);
        // console.log(deleteObj);
        if (mainObj.length)
            factoryObj.updateLocalListInformation(stringDBrepo.vendorUniqueId, serviceType, "add", mainObj);
        if (deleteObj.length)
            factoryObj.updateLocalListInformation(stringDBrepo.vendorUniqueId, serviceType, "delete", deleteObj);

        return mainObj;
    };

    return factoryObj;
});
