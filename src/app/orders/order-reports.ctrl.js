/**
 * ORDERS PAGE CONTROLLER
 */

app.controller('orderReportsCtrl', ["$location", "$scope", "$rootScope", "ordersService", "$filter", function ($location, $scope, $rootScope, ordersServiceMethods, $filter) {

    $scope.currentPage = 1;
    $scope.itemsPerPage = 15;
    $scope.totalCount = 0;
    $scope.search = {
        status:""
    };
    $scope.localSearch = {
        status:""
    };

    // get account transfers list
    $scope.getOrderReports = function (data, searchData) {
        NProgress.start();
        ordersServiceMethods.getOrderReports(data, searchData).then(function (response) {
            $scope.userList = response.data.orders;
            $scope.totalCount = response.data.count;
            NProgress.done();
        });

    }
    $scope.getOrderReports(0, $scope.localSearch);

    ordersServiceMethods.getStatusList().then(function (response) {
        $scope.statusList = response.data;

    });
    $scope.pageChanged = function (newPage) {
        var pageDataList = (newPage - 1) * ($scope.itemsPerPage);
        $scope.getOrderReports(pageDataList, $scope.localSearch);
    };

    $scope.$watch("search.status", function () {
        if(!$scope.search.status){
            $scope.search.status = "";
        }
        $scope.getOrderReports(0, $scope.search);
    });
    // users list filters
    $scope.resetFilters = function () {
        $scope.search = {
            status:""
        };
        $scope.localSearch = {
            status:""
        };
        $scope.getOrderReports(0, $scope.localSearch);
    }
    //modal popup details of the Transactions
    $scope.userDetails = function (orderId, saleId) {
        $scope.saleData = {};
        //  $scope.filterData = $filter('filter')($scope.userList, {
        //     id: userData.id
        // });
        ordersServiceMethods.getOrderDetails(orderId, saleId).then(function (data, status) {
            $scope.saleData = data.data;
            //$scope.trackStatus($scope.saleData);
            // console.log( $scope.saleData);
            angular.forEach($scope.saleData.sales.products, function (item1) {
                item1.trackingStatus = 0;
                angular.forEach(item1.variant, function (item2) {
                    item2.trackListNew = { ORDER_RECEIVED: [], ORDER_APPROVED: [], ORDER_SHIPPED: [], ORDER_DELIVERED: [], ORDER_CANCELED: [] }
                    angular.forEach(item2.trackList, function (item3) {
                        if (item3.status == "ORDER_RECEIVED") {
                            item2.trackListNew.ORDER_RECEIVED.push(item3);
                        }
                        if (item3.status == "ORDER_APPROVED") {
                            item2.trackListNew.ORDER_APPROVED.push(item3);
                        }
                        if (item3.status == "ORDER_SHIPPED") {
                            item1.trackingStatus++;
                            item2.trackListNew.ORDER_SHIPPED.push(item3);
                        }
                        if (item3.status == "ORDER_DELIVERED") {
                            item2.trackListNew.ORDER_DELIVERED.push(item3);
                        }
                        if (item3.status == "ORDER_CANCELED") {
                            item2.trackListNew.ORDER_CANCELED.push(item3);
                        }

                    })
                })


            });
        })
        // $scope.modalDetials = {};
        // angular.copy(userData, $scope.modalDetials);
    }



    $scope.applyFilters = function (searchData) {
        $scope.search.status = "";
        angular.copy(searchData, $scope.localSearch);
        $scope.getOrderReports(0, $scope.localSearch);

    }
}]);
