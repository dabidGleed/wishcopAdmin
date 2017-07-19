/**
 * ACCOUNT TRANSFER PAGE CONTROLLER
 */

app.controller('accountTransferCtrl', ["$location", "$scope", "$rootScope", "accountTransferService", "$filter", function ($location, $scope, $rootScope, accountTransferServiceMethods, $filter) {

    $scope.currentPage = 1;
    $scope.itemsPerPage = 15;

    // get account transfers list
    accountTransferServiceMethods.getAccountTransferList().then(function (response) {
        $scope.userList = response.data;
    });
    $scope.search = {
        name: "",
        status: ""
    };

    // users list filters
    $scope.resetFilters = function () {
        $scope.search = {
            name: "",
            status: ""
        };
    }
    //modal popup details of the user
    $scope.userDetails = function (userData) {
        $scope.filterData = $filter('filter')($scope.userList, {
            id: userData
        });
        $scope.modalDetials = {};
        angular.copy($scope.filterData[0], $scope.modalDetials);
    }

    $scope.saveStatus = function (modaldetails) {
        $('#userData').modal('hide');
        $scope.filterData = $filter('filter')($scope.userList, {
            id: modaldetails.id
        });
        if ($scope.filterData[0].status != modaldetails.status) {
            accountTransferServiceMethods.updateStatus(modaldetails.id).then(function (response) {
                if (response.status == 200) {
                    $scope.filterData[0].status = modaldetails.status;

                    $.notify({
                        title: '<strong>Success!</strong>',
                        message: response.data.message
                    }, {
                        type: 'success'
                    });
                } else {
                    $.notify({
                        title: '<strong>Unsuccessful!</strong>',
                        message: response.data.message
                    }, {
                        type: 'danger'
                    });
                }
            });

 
        }
    };

}]);