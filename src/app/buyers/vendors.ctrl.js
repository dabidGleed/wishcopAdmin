/**
 * USERS LIST PAGE CONTROLLER
 */

app.controller('vendorsListCtrl', ["$scope", "buyerService", "$filter", function ($scope, buyerService, $filter) {


    $scope.currentPage = 1;
    $scope.itemsPerPage = 15;
    $scope.totalCount = 0;
    $scope.searchText = "";
    // get users list
    $scope.getVendorsList = function(itemsPerPage, skip, searchText){
        NProgress.start();
        buyerService.getVendorsList(itemsPerPage,skip, searchText).then(function (response) {
            $scope.userList = response.data.users;
            $scope.totalCount = response.data.count;
            NProgress.done();
        });
    };
    
    $scope.getVendorsList($scope.itemsPerPage, 0);
    

    // users list filters
    $scope.resetFilters = function () {
        $scope.searchText = "";
    };
    
    $scope.$watch('searchText', function() {
        if($scope.searchText != "" && $scope.searchText != null){
            $scope.getVendorsList($scope.itemsPerPage, 0, $scope.searchText);
        }
    });

    //modal popup details of the user
    $scope.userDetails = function (userData) {
        NProgress.start();
        // console.log(userData);
        $scope.modalDetials = {};
        angular.copy(userData, $scope.modalDetials);
        $scope.companyProfile = userData.profile;
        console.log($scope.companyProfile);
        // buyerService.userprofileDetials(userData.id).then(function (response) {
        //     if (response.status == 200) {
        //         $scope.modalDetialsProfile = response.data;
        //         angular.forEach(response.data.profile, function (key, value) {
        //             if (key.category == "COMPANY_PROFILE") {
        //                 $scope.companyProfile = key;
        //             }

        //             if (key.category == "LEGALITIES") {
        //                 $scope.legalities = key;
        //             }

        //             if (key.category == "TERMS") {
        //                 $scope.terms = key;
        //             }
        //         });
        //         NProgress.done();

        //     } else {
        //         $.notify({
        //             title: '<strong>Unsuccessful!</strong>',
        //             message: response.data.message
        //         }, {
        //             type: 'danger'
        //         });
        //     }
        // });

    };

    $scope.saveStatus = function (modaldetails) {
        // $('#userData').modal('hide');

        // $scope.filterData = $filter('filter')($scope.userList, {
        //     id: modaldetails.id
        // });
        // buyerService.activateVendorStatus(modaldetails.id, modaldetails.access).then(function (response) {
        //     if (response.status == 200) {
        //         $scope.filterData[0].access = modaldetails.access;

        //         $.notify({
        //             title: '<strong>Success!</strong>',
        //             message: response.data.message
        //         }, {
        //             type: 'success'
        //         });
        //     } else {
        //         $.notify({
        //             title: '<strong>Unsuccessful!</strong>',
        //             message: response.data.message
        //         }, {
        //             type: 'danger'
        //         });
        //     }
        // });
        $scope.saveStatus = function (userId, profile) {
            $('#userData').modal('hide');
            profile.role ="VENDOR";
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
            });
        };
    };
    $scope.pageChanged = function (newPage) {
        var pageDataList = (newPage - 1) * ($scope.itemsPerPage);
        $scope.getVendorsList($scope.itemsPerPage, pageDataList,$scope.searchText);
    };

}]);