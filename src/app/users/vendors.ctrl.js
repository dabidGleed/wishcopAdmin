/**
 * USERS LIST PAGE CONTROLLER
 */

app.controller('vendorsListCtrl', ["$location", "$scope", "$rootScope", "usersService", "$filter", function ($location, $scope, $rootScope, usersServiceMethods, $filter) {


    $scope.currentPage = 1;
    $scope.itemsPerPage = 16;
    $scope.totalCount = 0;

    $scope.search = {
        name: "",
        status: ""
    };
    $scope.localSearch = {
        name: "",
        status: ""
    };
    
    // get users list
    $scope.getVendorsList = function(data, searchData){
        NProgress.start();
        usersServiceMethods.getVendorsList(data, searchData).then(function (response) {
            $scope.userList = response.data.users;
            $scope.totalCount = response.data.count;
            NProgress.done();
        });
    }
    $scope.pageChanged = function(newPage) {
        var pageDataList = (newPage - 1) * ($scope.itemsPerPage);
        $scope.getVendorsList(pageDataList, $scope.localSearch);
    };
    $scope.getVendorsList(0,$scope.localSearch);
    $scope.$watch("search.status", function () {

        if ($scope.search.status == null) {
            $scope.search.status = "";
        }
        angular.copy($scope.search, $scope.localSearch);
        $scope.getVendorsList(0, $scope.localSearch);

    });

    $scope.$watch("search.name", function () {
        angular.copy($scope.search, $scope.localSearch);
        $scope.getVendorsList(0, $scope.localSearch);
    });

    // users list filters
    $scope.resetFilters = function () {
        $scope.search = {
            name: "",
            status: ""
        };
    }


    //modal popup details of the user
    $scope.userDetails = function (userData) {
        // console.log(userData);
        $('#userData').modal('show');
        $scope.modalDetials = {};
        angular.copy(userData, $scope.modalDetials);
        $scope.companyProfile = {};
        $scope.news = {};
        $scope.legalities = {};
        $scope.terms = {};
        usersServiceMethods.userprofileDetials(userData.id).then(function (response) {
            if (response.status == 200) {
                angular.forEach(response.data.profile, function (key, value) {
                    if (key.category == "COMPANY_PROFILE") {
                        $scope.companyProfile = key;
                    }

                    if (key.category == "LEGALITIES") {
                        $scope.legalities = key;
                    }

                    if (key.category == "TERMS") {
                        $scope.terms = key;
                    }

                    if (key.category == "NEWS") {
                        $scope.news = key;
                    }
                })
                $scope.modalDetialsProfile = response.data;

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

    $scope.stopSales = function (userId, status, index) {
        var data = {};
        data.vendorId = userId;
        data.status = status;
        usersServiceMethods.stopOrStartSales(data).then(function (response) {
            console.log(response);
            if (response.status == 200) {
                $scope.userList[index].saleStopped = !$scope.userList[index].saleStopped;
                
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

}]);