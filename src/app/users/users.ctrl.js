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
        status: "",
        role: "",
    };
    $scope.roles = ['ADMIN', 'BUYER', 'VENDOR', 'DISTRIBUTOR'];
    $scope.toggleSelection = function toggleSelection(role) {
        var idx = $scope.modalDetials.role.indexOf(role);

        // Is currently selected
        if (idx > -1) {
            $scope.modalDetials.role.splice(idx, 1);
        }

        // Is newly selected
        else {
            var conflict = false;
            if (role === "VENDOR" || role === "DISTRIBUTOR") {
                conflict = $scope.modalDetials.role.indexOf("DISTRIBUTOR") > -1 || $scope.modalDetials.role.indexOf("VENDOR") > -1;
            }
            if (conflict) {
                if (role === "VENDOR") {
                    $scope.modalDetials.role.splice($scope.modalDetials.role.indexOf("DISTRIBUTOR"), 1);
                } else {
                    $scope.modalDetials.role.splice($scope.modalDetials.role.indexOf("VENDOR"), 1);
                }
            }
            $scope.modalDetials.role.push(role);

        }
    };
    // get users list
    $scope.getUsersList = function (data, searchData) {
        NProgress.start();
        usersServiceMethods.getUsersList(data, searchData).then(function (response) {
            console.log(response.data);
            $scope.userList = response.data.users;
            $scope.totalCount = response.data.count;
            NProgress.done();
        });
    }
    $scope.pageChanged = function (newPage) {
        var pageDataList = (newPage - 1) * ($scope.itemsPerPage);
        $scope.getUsersList(pageDataList, $scope.localSearch);
    };
    $scope.getUsersList(0, $scope.localSearch);
    $scope.$watch("search.status", function () {
        if ($scope.search.status) {
            angular.copy($scope.search, $scope.localSearch);
            $scope.getUsersList(0, $scope.localSearch);
        }
    });

    $scope.$watch("search.role", function () {

        if ($scope.search.role) {
            angular.copy($scope.search, $scope.localSearch);
            $scope.getUsersList(0, $scope.localSearch);
        }

    });
    $scope.$watch("search.name", function () {
        if ($scope.search.name) {
            $scope.search.role = "";
            angular.copy($scope.search, $scope.localSearch);
            $scope.getUsersList(0, $scope.localSearch);
        }

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
            $scope.userList[$scope.userList.indexOf($scope.filterData[0])] = modaldetails;
            usersServiceMethods.changeRole(modaldetails.id, modaldetails.role).then(function (response) {
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
        } else {
            if (modaldetails.status == "ACTIVE") {
                usersServiceMethods.activeUserStatus(modaldetails.id, modaldetails.role).then(function (response) {
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

                usersServiceMethods.deleteUserStatus(modaldetails.id, modaldetails.role).then(function (response) {
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