/**
 * USERS LIST PAGE CONTROLLER
 */

app.controller('buyersListCtrl', [ "$scope", "buyerService", function ( $scope, buyerService) {


    $scope.currentPage = 1;
    $scope.itemsPerPage = 15;
    $scope.totalCount = 0;


    // get users list
    $scope.getBuyersList = function(itemsPerPage, skip, searchText){
        NProgress.start();
        buyerService.getBuyersList(itemsPerPage,skip, searchText).then(function (response) {
            $scope.totalCount = response.data.count;
            $scope.userList = response.data.users;
            console.log($scope.totalCount);
            NProgress.done();
        });
    };
    $scope.getBuyersList($scope.itemsPerPage, 0);
    $scope.searchText = "";

    $scope.$watch('searchText', function() {
        if($scope.searchText != "" && $scope.searchText != null){
            $scope.getBuyersList($scope.itemsPerPage, 0, $scope.searchText);
        }else{
            $scope.getBuyersList($scope.itemsPerPage, 0, $scope.searchText);
        }
    });
    // users list filters
    $scope.resetFilters = function () {
        $scope.searchText = "";
    };
    //modal popup details of the user
    $scope.userDetails = function (userData) {
        // console.log(userData);
        $scope.modalDetials = {};
        angular.copy(userData, $scope.modalDetials);
        $scope.companyProfile = {};
        $scope.companyProfile = userData.profile;

    };

    $scope.saveStatus = function (userId, profile) {
        $('#userData').modal('hide');
        NProgress.start();
        profile.role ="BUYER";
        buyerService.activeUserStatus(userId, profile).then(function (response) {
            if (response.status == 200) {
                $scope.companyProfile.adminApprove = profile.adminApprove;
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
            NProgress.done();
        });
    };

    $scope.pageChanged = function (newPage) {
        var pageDataList = (newPage - 1) * ($scope.itemsPerPage);
        $scope.getBuyersList($scope.itemsPerPage, pageDataList, $scope.searchText);
    };

}]);