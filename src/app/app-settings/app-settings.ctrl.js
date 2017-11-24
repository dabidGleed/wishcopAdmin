/**
 * APP SETTINGS PAGE CONTROLLER
 */

app.controller('appSettingsCtrl', ["$location", "$scope", "$rootScope", "appSettingsService", "referralSettingsService", "$filter", function ($location, $scope, $rootScope, appSettingsServiceMethods, referralSettingsServiceMethods, $filter) {


    $scope.itemsInPage = 1;

    $scope.initalLoad = function () {
        referralSettingsServiceMethods.getReferrals().then(function (response) {
            $scope.appSettings = response.data[0];
        });

    }

    $scope.initalLoad();
    $scope.updateContactNumber = function (data) {

        appSettingsServiceMethods.updateContactNumber($scope.appSettings.id, data).then(function (response) {
            console.log(response);
            if (response.status == 200) {

                $.notify({
                    title: '<strong>Success!</strong>',
                    message:'updated' 
                }, {
                    type: 'success'
                });

            } else {
                $.notify({
                    title: '<strong>Unsuccessful!</strong>',
                     message:'failed ' 
                }, {
                    type: 'danger'
                });

            }
             $scope.initalLoad();

        });

    }


}]);