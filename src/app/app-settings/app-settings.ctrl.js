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
                    title: '<strong>Success!</strong>' 
                }, {
                    type: 'success',
                    message:'updated'
                });

            } else {
                $.notify({
                    title: '<strong>Unsuccessful!</strong>' 
                }, {
                    type: 'danger',
                     message:'failed '
                });

            }
             $scope.initalLoad();

        });

    }


}]);