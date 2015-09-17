angular.module('starter.userSettings')

.controller('vendor-addr-ctrl', function($scope, $ionicModal, $timeout, $ionicLoading, $compile) {

    var userLocationInfo = [];
    var locationCoordinates = {};
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/addressMapModal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeMapView = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.showMapView = function() {
        $scope.modal.show();
    };

    $scope.assignLocationInfo = function() {
        var coordKeys = Object.keys(locationCoordinates);
        for (i in userLocationInfo) {
            $scope.overviewInfo.latitude = locationCoordinates[coordKeys[0]];
            $scope.overviewInfo.longitude = locationCoordinates[coordKeys[1]];
            for(j in userLocationInfo[i].address_components){
                console.log(userLocationInfo[i].address_components[j].types[0]);
                if(userLocationInfo[i].address_components[j].types[0] == "postal_code"){
                   $scope.overviewInfo.zipCode = userLocationInfo[i].address_components[j].long_name;
                }
                else if(userLocationInfo[i].address_components[j].types[0] == "country"){
                    $scope.personalInfo.country = userLocationInfo[i].address_components[j].long_name;
                }
                else if(userLocationInfo[i].address_components[j].types[0] == "administrative_area_level_1"){
                    $scope.personalInfo.state = userLocationInfo[i].address_components[j].long_name;
                }
                else if(userLocationInfo[i].address_components[j].types[0] == "locality"){
                    $scope.personalInfo.city = userLocationInfo[i].address_components[j].long_name;
                }
            }
            alert($scope.personalInfo.city + ", "  + $scope.personalInfo.state + ", " + $scope.personalInfo.country + ", " +$scope.overviewInfo.zipCode);
            break;
        }
        console.log($scope.personalInfo);

        $scope.modal.hide();
    };

    $scope.mapCreated = function(map) {
        $scope.map = map;
        google.maps.event.addDomListener($scope.map, 'click', function(e) {
            // e.preventDefault();
            // $scope.map.clearMarkers();
            
            var geocoder = new google.maps.Geocoder();
            var coordKeys = Object.keys(e.latLng);
            console.log(coordKeys);
            var latlng = new google.maps.LatLng(e.latLng[coordKeys[0]], e.latLng[coordKeys[1]]);
            geocoder.geocode({
                'latLng': latlng
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    //we'll do cool crap here
                    userLocationInfo = results;
                    console.log(results);
                }
            });
            locationCoordinates = e.latLng;
            // console.log(e.latLng);
            $scope.placeMarker(e.latLng);
            // console.log("clicked");
            return false;
        });
    };
    var marker;
    $scope.placeMarker = function(location) {
        if (marker)
            marker.setMap(null);
        marker = new google.maps.Marker({
            position: location,
            map: $scope.map,
        });
    }



    $scope.centerOnMe = function() {
        // console.log("Centering");

        if (!$scope.map) {
            return;
        }

        $scope.loading = $ionicLoading.show({
            content: 'Getting current location...',
            showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
            // console.log('Got pos', pos);
            // var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            $scope.map.setCenter(latlng);
            // geocoder.geocode({
            //     'latLng': latlng
            // }, function(results, status) {
            //     if (status == google.maps.GeocoderStatus.OK) {
            //         //we'll do cool crap here
            //         // console.log(results);
            //     }
            // });

            $ionicLoading.hide();
        }, function(error) {
            alert('Unable to get location: ' + error.message);
        });
    };
});
