/**
 * ORDERS PAGE CONTROLLER
 */

app.controller('ordersReturnsCtrl', ["$scope", "ordersService", "$filter", "Upload", function ($scope, ordersAPI, $filter, Upload) {

    $scope.currentPage = 1;
    $scope.itemsPerPage = 15;
    $scope.totalCount = 0;
    $scope.search = {
        name: "",
        buyer: ""
    };
    $scope.isAllSelected = false;

    // get account transfers list
    $scope.getReturnsList = function (data, searchData) {
        NProgress.start();
        ordersAPI.getReturnsList(data, searchData).then(function (response) {
            $scope.ordersList = response.data.orders;
            $scope.totalCount = response.data.count;
            NProgress.done();
        });
    };
    $scope.getReturnsList(0, $scope.search);

    // ordersAPI.getVendorsList().then(function (response) {
    //     $scope.vendorList = response.data;
    // });
    ordersAPI.getBuyersList().then(function (response) {
        $scope.buyersList = [];
        if (response.data) {
            for (var i = 0; i < response.data.length; i++) {
                if (!!response.data[i].profile && !!response.data[i].profile.companyName) {
                    $scope.buyersList.push(response.data[i]);
                }
            }
        }

    });
    $scope.pageChanged = function (newPage) {
        var pageDataList = (newPage - 1) * ($scope.itemsPerPage);
        $scope.getReturnsList(pageDataList, $scope.search);
    };

    $scope.$watch("search.buyer", function () {
        if (!!$scope.search.buyer) {
            $scope.getReturnsList(0, $scope.search);
        }
        if (!$scope.search.buyer) {
            $scope.search.buyer = "";
        }
    });
    // orders list filters
    $scope.resetFilters = function () {
        $scope.search = {
            name: "",
            buyer: ""
        };
        $scope.getReturnsList(0, $scope.search);
    };
    $scope.downloadInvoice = function () {
        $scope.saleData = {};
        var fileName = "invoice" + $scope.orderId + ".pdf";
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        NProgress.start();
        ordersAPI.downloadInvoice($scope.orderId).then(function (response, status) {
            if (response) {
                $('#orderData').modal('hide');
                NProgress.done();
                var file = new Blob([response.data], {
                    type: 'application/pdf'
                });
                var fileURL = window.URL.createObjectURL(file);
                a.href = fileURL;
                a.download = fileName;
                a.click();
            } else {
                alert("try again");
            }
        });
    };
    $scope.applyFilters = function (searchData) {
        $scope.search.buyer = "";
        // angular.copy(searchData, $scope.search);
        $scope.getReturnsList(0, searchData);

    };
    $scope.downloadInvoice = function () {
        $scope.saleData = {};
        var fileName = "invoice" + $scope.orderId + ".pdf";
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        NProgress.start();
        ordersAPI.downloadReturnInvoice($scope.orderId).then(function (response, status) {
            if (response) {
                $('#orderData').modal('hide');
                NProgress.done();
                var file = new Blob([response.data], {
                    type: 'application/pdf'
                });
                var fileURL = window.URL.createObjectURL(file);
                a.href = fileURL;
                a.download = fileName;
                a.click();
            } else {
                alert("try again");
            }
        });
    };
    $scope.viewDetails = function (orderId) {
        $scope.orderId = orderId;
        $scope.order = $filter('filter')($scope.ordersList, {
            id: orderId
        })[0];
        $scope.invoiceDate = new Date($scope.order.sales[0].invoiceDate);
    };
}]);
