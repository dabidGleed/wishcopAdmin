app.controller('newOrdersCtrl', ["$location", "$scope", "$rootScope", "ordersService", "$filter","$state", function ($location, $scope, $rootScope, ordersServiceMethods, $filter, $state) {

    $scope.currentPage = 1;
    $scope.itemsPerPage = 15;
    $scope.totalCount = 0;
    $scope.search = {
        name: "",
        vendor: ""
    };
    $scope.dist = '';
    $scope.isLoding = true;
    $scope.showAdd = false;
    $scope.distributor = {};
    $scope.vendorId = "";
    $scope.orderId = "";
    $scope.orderItemId = "";

    // get account orders list
    $scope.getOrders = function (data, searchData) {
        $scope.isLoding = true;
        ordersServiceMethods.getDistributorOrdersList(data, searchData).then(function (response) {
            console.log(response);
            $scope.ordersList = response.data.orders;
            $scope.totalCount = response.data.count;
            $scope.isLoding = false;
        });

    };
    ordersServiceMethods.getVendorsList("DISTRIBUTOR").then(function (response) {
        $scope.vendorList = response.data;
        $scope.search.vendor = $scope.vendorList[0];
    });
    $scope.selectDistributor = function (vendorId, orderId, orderItemId) {
        $scope.distributor = {};
        $scope.isLoding = true;
        $scope.vendorId = vendorId;
        $scope.orderId = orderId;
        $scope.orderItemId = orderItemId;
        ordersServiceMethods.getDistributorsList(vendorId).then(function (response) {
            $scope.distributorsList = response.data;
            $scope.isLoding = false;
        });
    };
    $scope.viewDistributor = function(dist,orderId,orderItemId){
        $scope.distributor = dist;
        $scope.orderId = orderId;
        $scope.orderItemId = orderItemId;
        console.log(dist);
        console.log(orderId);
        console.log(orderItemId);
    };
    $scope.addDistributor = function (distributor) {
        $scope.isLoding = true;
        ordersServiceMethods.addDistributor($scope.vendorId, distributor).then(function (response) {
            $scope.distributor = {};
            $scope.selectDistributor($scope.vendorId);
            $scope.isLoding = false;
            $scope.showAdd = false; // This is flag to hide add Distributor form
            $.notify({
                title: '<strong>Success!</strong>',
                message: response.data.message
            }, {
                type: 'success'
            });
        });
    };
    $scope.attachDistributorforNewInvoice = function(distributor){
        $scope.isLoding = true;
        console.log(distributor);
        distributor.orderItemId = $scope.orderItemId;
        ordersServiceMethods.generateDistributorInvoice($scope.orderId, distributor).then(function (response) {
            $scope.distributor = {};
            $scope.isLoding = false;
            $scope.showAdd = false; // This is flag to hide add Distributor form
            $.notify({
                title: '<strong>Success!</strong>',
                message: response.data.message
            }, {
                type: 'success'
            });
            $('#distributorView').modal('hide');
        });
    };

    $scope.pageChanged = function (newPage) {
        var pageDataList = (newPage - 1) * ($scope.itemsPerPage);
        $scope.getOrders(pageDataList, $scope.search);
    };

    $scope.$watch("search.vendor", function () {
        if (!$scope.search.vendor) {
            $scope.search.vendor = "";
        }
        $scope.getOrders(0, $scope.search);
    });
    $scope.addDist = function () {
        $scope.showAdd = true; // This is flag to display add Distributor form
    };

    $scope.applyFilters = function (searchData) {
        $scope.search.vendor = "";
        angular.copy(searchData, $scope.search);
        $scope.getOrders(0, $scope.search);

    };
    $scope.resetFilters = function () {
        $scope.search = {
            name: "",
            vendor: ""
        };
        $scope.getOrders(0, $scope.search);
    };



}]);
