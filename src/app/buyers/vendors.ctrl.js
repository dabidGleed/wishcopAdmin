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
    $scope.providePermission = function (userData) {
        
        $scope.modalDetials = {};
        angular.copy(userData, $scope.modalDetials);
        $scope.companyProfile = userData.profile;
        $scope.companyProfile.subBrand = "";
        $scope.access = userData.access? userData.access: "EVERYONE";
        if(userData.profile.subBrands && userData.profile.subBrands.length >0){
            $scope.subBrands = userData.profile.subBrands;
            delete $scope.companyProfile.subBrands;
        }
    };
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
    $scope.pageChanged = function (newPage) {
        var pageDataList = (newPage - 1) * ($scope.itemsPerPage);
        $scope.getVendorsList($scope.itemsPerPage, pageDataList,$scope.searchText);
    };
    $scope.updatePermission = function (userId, access, subBrand) {
        $('#permission').modal('hide');
        console.log(userId, access, subBrand.id);
        buyerService.updateVendorPermission(userId, access, subBrand.id).then(function (response) {
            if (response.status == 200) {
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
    $scope.selectSubBrand = function(subBrand){
        $scope.access = subBrand.access?subBrand.access:"EVERYONE";
    };
    

}]);