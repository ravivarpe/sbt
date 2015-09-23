angular.module('starter.subUserSettings')

.controller("camera-settings-ctrl", function($scope, $cordovaCamera) {

    $scope.takePicture = function() {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.FILE_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        // $cordovaCamera.getPicture(options).then(function(imageData) {
        //     $scope.imgURI = "data:image/jpeg;base64," + imageData;
        // }, function(err) {
        //     // An error occured. Show a message to the user
        // });
        $cordovaCamera.getPicture(options).then(function(imageData) {
            console.log(imageData);

            var server = apiURL + '/uploads.json?' + apiKey + "&api_username=" + $rootScope.user.user.username;

            var trustAllHosts = true;

            var ftOptions = new FileUploadOptions();
            ftOptions.fileKey = 'file';
            ftOptions.fileName = imageData.substr(imageData.lastIndexOf('/') + 1);
            ftOptions.mimeType = 'image/jpeg';
            ftOptions.httpMethod = 'POST';

            $cordovaFileTransfer.upload(encodeURI(server), imageData, ftOptions, trustAllHosts)
                .then(function(result) {
                        console.log('success: ' + angular.toJson(result));
                    },
                    function(err) {
                        // Error
                        console.log('error: ' + err);
                    },
                    function(progress) {
                        // constant progress updates
                    });

            // $scope.hideCameraActions();
        }, function(err) {
            // error
            console.log(err);
        });
    }

});
