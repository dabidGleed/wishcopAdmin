/**
 * APP SETTINGS PAGE CONTROLLER
 */

app.controller('appSettingsCtrl', ["$scope", "appSettingsService", "referralSettingsService", "$filter", function ($scope, appSettingsService, referralSettingsServiceMethods, $filter) {


    $scope.currentPage = 1;
    $scope.itemsPerPage = 15;
    $scope.totalCount = 0;
    $scope.initalLoad = function () {
        referralSettingsServiceMethods.getReferrals().then(function (response) {
            $scope.appSettings = response.data[0];
        });
        
    };
    $scope.getUserCredits = function(limit, skip){
        appSettingsService.getCredits(limit, skip).then(function (response) {
            
            $scope.totalCount = response.data.count;
            $scope.usersList = response.data.users;

            console.log(response.data);
        });
    };
    
    $scope.initalLoad();
    $scope.getUserCredits($scope.itemsPerPage,0);

    $scope.updateContactNumber = function (data) {

        appSettingsService.updateContactNumber($scope.appSettings.id, data).then(function (response) {
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

    };

    $scope.updateMaxCredit = function (data) {

        appSettingsService.updateMaxCredit($scope.appSettings.id, data).then(function (response) {
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

    };
    $scope.pageChanged = function (newPage) {
        var pageDataList = (newPage - 1) * ($scope.itemsPerPage);
        $scope.getUserCredits($scope.itemsPerPage, pageDataList);
    };

}]);