/**
 * ORDERS PAGE CONTROLLER
 */

app.controller('ordersCtrl', ["$scope", "ordersService", "$filter", "Upload", function ($scope, ordersAPI, $filter, Upload) {

    $scope.currentPage = 1;
    $scope.itemsPerPage = 15;
    $scope.totalCount = 0;
    $scope.DeliveredDa = [];
    $scope.search = {
        name: "",
        buyer: ""
    };
    $scope.imagesProofList = [];
    $scope.isAllSelected = false;
    $scope.payments = [{name:"CHEQUE"}, {name:"CASH"}, {name:"OTHERS"}];

    // get account transfers list
    $scope.getTransactionsList = function (data, searchData) {
        NProgress.start();
        ordersAPI.getTransactionsList(data, searchData).then(function (response) {
            $scope.ordersList = response.data.orders;
            $scope.totalCount = response.data.count;
            NProgress.done();
        });
    };
    $scope.getTransactionsList(0, $scope.search);

    ordersAPI.getVendorsList().then(function (response) {
        $scope.vendorList = response.data;
    });
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
        $scope.getTransactionsList(pageDataList, $scope.search);
    };

    $scope.$watch("search.buyer", function () {
        if (!!$scope.search.buyer) {
            $scope.getTransactionsList(0, $scope.search);
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
        $scope.getTransactionsList(0, $scope.search);
    };
    //modal popup details of the Transactions
    $scope.userDetails = function (orderId, saleId) {
        $scope.saleData = {};
        ordersAPI.getOrderDetails(orderId, saleId).then(function (data, status) {
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
    $scope.downloadDeliveredInvoice = function () {
        $scope.saleData = {};
        var fileName = "invoice" + $scope.orderId + ".pdf";
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        NProgress.start();
        ordersAPI.downloadDeliveredInvoice($scope.orderId).then(function (response, status) {
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

    $scope.sendInvoice = function () {
        NProgress.start();
        ordersAPI.sendInvoice($scope.orderId).then(function (response, status) {
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
    $scope.applyFilters = function (searchData) {
        $scope.search.buyer = "";
        // angular.copy(searchData, $scope.search);
        $scope.getTransactionsList(0, searchData);

    };
    $scope.editBatchExpiry = function (orderId) {
        $scope.orderId = orderId;
        $scope.order = $filter('filter')($scope.ordersList, {
            id: orderId
        })[0];
        console.log($scope.order.paymentType);

        $scope.deliverData = $filter('filter')($scope.order.sales, {
            status: "ORDER_DELIVERED"
        }).length;
        console.log($scope.deliverData);
        $scope.invoiceDate = new Date($scope.order.sales[0].invoiceDate);
    };
    $scope.openUploadModal = function (orderId) {
        $scope.order = $filter('filter')($scope.ordersList, {
            id: orderId
        })[0];
        if(!!$scope.order.companyInvoices){
            $scope.imagesProofList = $scope.order.companyInvoices;
        }else{
            $scope.imagesProofList =[];
        }
    };
    $scope.updateBatchAndExpiry = function () {
        angular.forEach($scope.order.sales, function (item) {
            if(item.HSNCode && item.batchName && item.expiryDate){
                item.invoiceDate = new Date($scope.invoiceDate).getTime();
            }
            if (item.selected) {
                delete item.selected;
            }
        });
        $('#orderData').modal('hide');
        console.log($scope.order.paymentType);
        // if($scope.order.paymentType){
        //     $scope.order.paymentType = $scope.order.paymentType.name;
        // }
        ordersAPI.updateOrderDetails($scope.orderId, $scope.order).then(function (response, status) {
            if (response.status == 200) {
                $.notify({
                    title: '<strong>Success!</strong>',
                    message: response.data.message
                }, {
                    type: 'success'
                });
                $scope.getTransactionsList(0, $scope.search);
                
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
    $scope.splitInvoiceChange = function () {
        var items = [];
        var invoiceDate = new Date($scope.invoiceDate).getTime();
        angular.forEach($scope.order.sales, function (item) {
            if (item.selected) {
                delete item.selected;
                items.push({
                    order_item_id:item.order_item_id,
                    HSNCode: item.HSNCode,
                    batchName: item.batchName,
                    expiryDate: item.expiryDate,
                    order_quantity: item.order_quantity
                });
            }
        });
        var fileName = "invoice" + $scope.orderId + ".pdf";
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        NProgress.start();
        $('#orderData').modal('hide');
        $scope.splitInvoice = false;
        $scope.returnInv = false;
        $scope.isAllSelected = false;
        ordersAPI.splitInvoiceService($scope.orderId, items, invoiceDate).then(function (response, status) {
            if (response.status == 200) {
                NProgress.done();
                var file = new Blob([response.data], {
                    type: 'application/pdf'
                });
                var fileURL = window.URL.createObjectURL(file);
                a.href = fileURL;
                a.download = fileName;
                a.click();
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
    $scope.generateReturnInvoice = function () {
        var items = [];
        var returnDate = new Date($scope.invoiceDate).getTime();
        angular.forEach($scope.order.sales, function (item) {
            if (item.selected) {
                delete item.selected;
                items.push({
                    order_item_id:item.order_item_id
                });
            }
        });
        var fileName = "invoice" + $scope.orderId + ".pdf";
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        NProgress.start();
        $('#orderData').modal('hide');
        $scope.splitInvoice = false;
        $scope.isAllSelected = false;
        ordersAPI.returnInvoiceService($scope.orderId, items, returnDate).then(function (response, status) {
            if (response.status == 200) {
                NProgress.done();
                var file = new Blob([response.data], {
                    type: 'application/pdf'
                });
                var fileURL = window.URL.createObjectURL(file);
                a.href = fileURL;
                a.download = fileName;
                a.click();
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
    $scope.stateChanged = function(){
        $scope.splitInvoice = false;
        $scope.returnInv = false;
        $scope.filterData = $filter('filter')($scope.order.sales, {
            selected: true
        });
        $scope.isAllSelected = false;
        if($scope.filterData.length >0){
            $scope.splitInvoice = true;
            $scope.returnInv = true;
        } 
        if($scope.filterData.length == $scope.order.sales.length){
            $scope.isAllSelected = true;
            $scope.splitInvoice = false;
        }
        
    }
    $scope.toggleAll = function() {
        var toggleStatus = $scope.isAllSelected;
        angular.forEach($scope.order.sales, function(itm){ itm.selected = toggleStatus; });
        $scope.stateChanged();
    }
    // Upload image proofs
    $scope.uploadImageProof = function (files) {
        $scope.files = files;
        $scope.typeArray = ["application/pdf", "image/jpg", "image/png", "image/jpeg"];

        if (files && files.length) {
            NProgress.start();
            Upload.base64DataUrl(files).then(function (urls) {
                $scope.loadingProgress = true;
                for (i = 0; i < urls.length; i++) {
                    if ($scope.typeArray.indexOf(files[i].type) != -1) {
                        ordersAPI.uploadImage(urls[i], files[i].name).then(uploadProofs);
                    } else {
                        $.notify({
                            title: 'Invalid file format, please upload .pdf, .jpg, .jpeg, .png format files',
                        }, {
                            type: 'danger'
                        });
                    }
                }
            });
        }

        function uploadProofs(response) {
            $scope.addImageProofUrl(response.data);
        }
    };
    // Adding image proofs
    $scope.addImageProofUrl = function (link) {
        NProgress.done();
        if (!$scope.imagesProofList) {
            $scope.imagesProofList = [];
        }
        $scope.imagesProofList.push({
            'link': link.imageURL,
            'oralink': link.imageURL,
            'imageName': link.filename
        });
    };
    $scope.removeImgFiles = function (v) {
        $scope.imagesProofList.splice(v, 1);
    };
    $scope.removeItem = function(sale){
        var index = $scope.order.sales.indexOf(sale);
        $scope.order.sales.splice(index, 1);
    };
    $scope.uploadInvoices = function () {
        $scope.order.companyInvoices = $scope.imagesProofList;
        ordersAPI.updateOrderDetails($scope.order.id, $scope.order).then(function (response, status) {
            if (response.status == 200) {
                $.notify({
                    title: '<strong>Success!</strong>',
                    message: response.data.message
                }, {
                    type: 'success'
                });
                $('#uploadModal').modal('hide');
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
    $scope.confirmDelivery = function (orderId) {
        $scope.order = $filter('filter')($scope.ordersList, {
            id: orderId
        })[0];
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

                    ordersAPI.updateOrderDelivery(orderId, $scope.order).then(function (response) {
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

                } else {

                }
            });

    };
}]);
