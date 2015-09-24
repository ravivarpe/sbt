angular.module('starter.subUserSettings')

.controller("camera-settings-ctrl", function($scope, $cordovaCamera, fileUpload, stringDBrepo, userDetailsFact) {
        $scope.uploadJson = {};
        $scope.imageArrayObj = [{
            "imageName": "outerlook.jpg",
            "path":"",
            "index": 0,
            "status": false
        }, {
            "imageName": "innerlook.jpg",
            "path":"",
            "index": 1,
            "status": false
        }];


        $scope.imageValidator = function() {
            for(var i in $scope.imageArrayObj){
                $scope.imageArrayObj[i].path = stringDBrepo.vGetCameraPicURL(stringDBrepo.vendorUniqueId, $scope.imageArrayObj[i].imageName);
                userDetailsFact.getImageInfo($scope.imageArrayObj[i].imageName, $scope.imageArrayObj[i]);
            }            
            console.log($scope.imageArrayObj);


        };

        $scope.deleteImage = function(obj){
            userDetailsFact.deleteImageInfo($scope.imageArrayObj[obj.index].imageName, $scope.imageArrayObj[obj.index]);
        };

        // function checkImage(imageSrc, good, bad) {
        //     var img = new Image();
        //     img.onload = good;
        //     img.onerror = bad;
        //     img.src = imageSrc;
        // }

        // checkImage("http://api.vehito.com/vehito/storage/vendor/234567891443026896834/images/full1.jpg", function() {
        //     alert("good");
        // }, function() {
        //     alert("bad");
        // });

        $scope.imageValidator();

        $scope.takePicture = function(obj) {
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
                // $scope.decoded = $base64.decode(imageData);
                // $scope.imgURI = "data:image/jpeg;base64," + imageData;

                $scope.uploadJson.rawData = imageData;
                $scope.uploadJson.imageName = obj.imageName;
                // var url = stringDBrepo.baseUrl + "vendor/" + stringDBrepo.vendorUniqueId +"/files/upload";
                userDetailsFact.updateImageInfo($scope.uploadJson);

                // fileUpload.uploadFileToUrl($scope.uploadJson, url);
            }, function(err) {
                // An error occured. Show a message to the user
            });

        }

    })
    .service('fileUpload', ['$http', function($http) {
        this.uploadFileToUrl = function(file, uploadUrl) {
            // console.log("came here");
            // var fd = new FormData();
            // fd.append('file', file);
            $http.put(uploadUrl, file, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .success(function() {
                    alert("success");
                })
                .error(function() {
                    alert("error");
                });
        }
    }]);
