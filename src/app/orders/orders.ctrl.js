/**
 * ORDERS PAGE CONTROLLER
 */

app.controller('ordersCtrl', ["$location", "$scope", "$rootScope", "ordersService", "$filter", function ($location, $scope, $rootScope, ordersServiceMethods, $filter) {

    $scope.currentPage = 1;
    $scope.itemsPerPage = 15;
    $scope.totalCount = 0;
    $scope.DeliveredDa = [];
    $scope.search = {
        name: "",
        vendor: ""
    };

    // get account transfers list
    $scope.getTransactionsList = function (data, searchData) {
        NProgress.start();
        ordersServiceMethods.getTransactionsList(data, searchData).then(function (response) {
            $scope.userList = response.data.orders;
            $scope.totalCount = response.data.count;
            NProgress.done();
        });

    };
    $scope.getTransactionsList(0, $scope.search);

    ordersServiceMethods.getVendorsList().then(function (response) {
        $scope.vendorList = response.data;

    });

    $scope.pageChanged = function (newPage) {
        var pageDataList = (newPage - 1) * ($scope.itemsPerPage);
        $scope.getTransactionsList(pageDataList, $scope.search);
    };

    $scope.$watch("search.vendor", function () {
        if (!$scope.search.vendor) {
            $scope.search.vendor = "";
        }
        $scope.getTransactionsList(0, $scope.search);
    });
    // orders list filters
    $scope.resetFilters = function () {
        $scope.search = {
            name: "",
            vendor: ""
        };
        $scope.getTransactionsList(0, $scope.search);
    };
    //modal popup details of the Transactions
    $scope.userDetails = function (orderId, saleId) {
        $scope.saleData = {};
        ordersServiceMethods.getOrderDetails(orderId, saleId).then(function (data, status) {
            $scope.saleData = data.data;
            angular.forEach($scope.saleData.sales.products, function (item1) {
                item1.trackingStatus = 0;
                angular.forEach(item1.variant, function (item2) {
                    item2.trackListNew = {
                        ORDER_RECEIVED: [],
                        ORDER_APPROVED: [],
                        ORDER_SHIPPED: [],
                        ORDER_DELIVERED: [],
                        ORDER_CANCELED: []
                    };
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

                    });
                });


            });
        });
    };

    $scope.downloadInvoice = function () {
        $scope.saleData = {};
        var fileName = "invoice.pdf";
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        NProgress.start();
        ordersServiceMethods.downloadInvoice($scope.orderId).then(function (response, status) {
            if (response) {
                $('#orderData').modal('hide');
                NProgress.done();
                var file = new Blob([response.data], {
                    type: 'application/pdf'
                });
                var fileURL = window.URL.createObjectURL(file);
                console.log(fileURL);
                a.href = fileURL;
                a.download = fileName;
                a.click();
            } else {
                alert("try again");
            }
        });
    };
    $scope.sendInvoice = function () {
        NProgress.start();
        ordersServiceMethods.sendInvoice($scope.orderId).then(function (response, status) {
            if (response.status == 200) {
                $('#orderData').modal('hide');
                NProgress.done();
                $.notify({
                    title: '<strong>Successfuly Sent!</strong>',
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
    $scope.confirmDeliveryStatus = function (varientId, orderItemId, orderId, saleId) {
        $scope.deliveryData = {};
        $scope.deliveryData.varientId = varientId;
        $scope.deliveryData.orderItemId = orderItemId;
        $scope.deliveryData.orderId = orderId;
        $scope.deliveryData.saleId = saleId;
        swal({
                title: "Are you sure?",
                text: "You want to update status to Delivered!",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Yes",
                cancelButtonText: "Cancel",
                closeOnConfirm: true,
                closeOnCancel: true
            },
            function (isConfirm) {
                if (isConfirm) {

                    ordersServiceMethods.updateOrderDelivery(varientId, orderItemId, orderId, saleId).then(function (response) {
                        if (response.status == 200) {
                            $scope.userDetails(orderId, orderItemId);
                            $.notify({
                                title: '<strong>Success!</strong>',
                                message: response.data.message
                            }, {
                                type: 'success'
                            });
                        } else {
                            $scope.userDetails(orderId, orderItemId);
                            $.notify({
                                title: '<strong>Unsuccessful!</strong>',
                                message: response.data.message
                            }, {
                                type: 'danger'
                            });
                        }

                    });

                } else {

                }
            });

    };
    $scope.applyFilters = function (searchData) {
        $scope.search.vendor = "";
        angular.copy(searchData, $scope.search);
        $scope.getTransactionsList(0, $scope.search);

    };
    $scope.editBatchExpiry = function(orderId){
        $scope.orderId = orderId;
        console.log("edit");
        $scope.orderItems = [];
        var order = $filter('filter')($scope.userList, {
                 id: orderId
             });
        $scope.orderItems = order[0].sales;
    };
    $scope.updateBatchAndExpiry = function(){
        $scope.order = $filter('filter')($scope.userList, {
            id: $scope.orderId
        })[0];
        $scope.order.sales = $scope.orderItems;
        console.log($scope.order);
        ordersServiceMethods.updateOrderDetails($scope.orderId, $scope.order).then(function (response, status) {
            console.log(response);
            if (response.status == 200) {
                $.notify({
                    title: '<strong>Success!</strong>',
                    message: response.data.message
                }, {
                    type: 'success'
                });
                $('#orderData').modal('hide');
            } else {
                $.notify({
                    title: '<strong>Unsuccessful!</strong>',
                    message: response.data
                }, {
                    type: 'danger'
                });
            }
        });
    };
}]);
