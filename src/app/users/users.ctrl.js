/**
 * USERS LIST PAGE CONTROLLER
 */

app.controller('usersListCtrl', ["$location", "$scope", "$rootScope", "usersService", "$filter", function ($location, $scope, $rootScope, usersServiceMethods, $filter) {


    $scope.currentPage = 1;
    $scope.itemsPerPage = 16;
    $scope.totalCount = 0;

    $scope.search = {
        name: "",
        role: "",
        status: ""
    };
    $scope.localSearch = {
        name: "",
        vendor: "",
        status: ""
    };
    
    // get users list
    $scope.getUsersList = function(data, searchData){
        NProgress.start();
        usersServiceMethods.getUsersList(data, searchData).then(function (response) {
            $scope.userList = response.data.users;
            $scope.totalCount = response.data.count;
            NProgress.done();
        });
    }
    $scope.pageChanged = function(newPage) {
        var pageDataList = (newPage - 1) * ($scope.itemsPerPage);
        $scope.getUsersList(pageDataList, $scope.localSearch);
    };
    $scope.getUsersList(0,$scope.localSearch);
    $scope.$watch("search.status", function () {

        if ($scope.search.status == null) {
            $scope.search.status = "";
        }
        angular.copy($scope.search, $scope.localSearch);
        $scope.getUsersList(0, $scope.localSearch);

    });

    $scope.$watch("search.role", function () {
        if ($scope.search.role == null) {
            $scope.search.role = "";
        }
        angular.copy($scope.search, $scope.localSearch);
        $scope.getUsersList(0, $scope.localSearch);
    });
    $scope.$watch("search.name", function () {
        $scope.search.role = "";
        angular.copy($scope.search, $scope.localSearch);
        $scope.getUsersList(0, $scope.localSearch);
    });

    // users list filters
    $scope.resetFilters = function () {
        $scope.search = {
            name: "",
            role: "",
            status: ""
        };
    }


    //modal popup details of the user
    $scope.userDetails = function (userData) {
        // console.log(userData);
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

    $scope.saveStatus = function (modaldetails) {
        $('#userData').modal('hide');
        $scope.filterData = $filter('filter')($scope.userList, {
            id: modaldetails.id
        });
        if ($scope.filterData[0].status == modaldetails.status) {

        } else {
            if (modaldetails.status == "ACTIVE") {
                usersServiceMethods.activeUserStatus(modaldetails.id).then(function (response) {
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
            if (modaldetails.status == "DELETED") {

                usersServiceMethods.deleteUserStatus(modaldetails.id).then(function (response) {
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
        }
    };

}]);