angular.module('starter.serviceConfig')

.factory('serviceConfigFact', function() {
    var factoryObj = {};
    factoryObj.name = '';
    factoryObj.globalServicesJson = [{
        name: "washing",
        list: ["oil wash", "water wash", "glass wash", "wind shield wash"]
    }, {
        name: "painting",
        list: ["oil paint", "regular paint", "glass paint", "air blow paint"]
    }];

    factoryObj.globalVehicleJson = [{
        name: "Maruti",
        list: ["800", "Alto", "Swift"]
    }, {
        name: "Hyundai",
        list: ["i10", "i20", "xcent"]
    }];


    factoryObj.userServicesJson = [{
        list: ["washing", "oil wash", "water wash", "glass wash", "wind shield wash"]
    }, {
        list: ["painting", "oil paint", "regular paint", "glass paint"]
    }];

    factoryObj.userVehicleJson = [{
        list: ["Maruti", "800", "Alto", "Swift"]
    }, {
        list: ["Hyundai", "i10", "i20", "xcent"]
    }];


    factoryObj.setName = function(newName) {
        factoryObj.name = newName;
    };


    factoryObj.generateServicesJson = function(globalJson, userJson) {
        var mainObj = [];
        mainObj.length = 0;
        angular.forEach(globalJson, function(value, key) {
            var primaryObj = {};

            primaryObj.ServiceType = value.name;
            primaryObj.checked = false;
            primaryObj.SubServices = [];
            for (var i in value.list) {
                var secondaryObj = {};
                secondaryObj.service = value.list[i];
                secondaryObj.checked = false;
                primaryObj.SubServices.push(secondaryObj);
            }
            mainObj.push(primaryObj);
        });
        // console.log(mainObj);
        factoryObj.checkExistingServiceConfig(userJson, mainObj);
        // console.log(mainObj);
        // factoryObj.parseInputSubmittedJson(mainObj);
        // console.log(factoryObj.userServicesJson);
        return mainObj;
    };

    factoryObj.checkExistingServiceConfig = function(userJsonObjArray, GlobalJsonArray) {
        angular.forEach(userJsonObjArray, function(valueS, keyS) {

            angular.forEach(GlobalJsonArray, function(valueG, keyG) {

                if (angular.equals(valueS.list[0], valueG.ServiceType) == true) {
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

    factoryObj.parseInputServiceSubmittedJson = function(scope) {
        var mainObj = [];

        angular.forEach(scope, function(value, key) {
            var primaryObj = {};
            primaryObj.list = [];
            if (value.checked == true) {
                primaryObj.list.push(value.ServiceType);
                for(var i in value.SubServices){
                    if(value.SubServices[i].checked == true){
                        primaryObj.list.push(value.SubServices[i].service);
                    }
                }
               mainObj.push(primaryObj); 
            }            
        });
        // console.log(mainObj);
        return mainObj;
    };

    return factoryObj;
});
