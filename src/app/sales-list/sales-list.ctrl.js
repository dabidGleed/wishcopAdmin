/**
 * SALES LIST PAGE CONTROLLER
 */

app.controller('salesListCtrl', ["$location", "$scope", "$rootScope", "salesService", "$filter", "$state", "$sce", function($location, $scope, $rootScope, salesServiceMethods, $filter, $state, $sce) {

    salesServiceMethods.getSalesList().then(function(response) {
        $scope.salesList = response.data;
        angular.forEach($scope.salesList, function(value, key) {
            value.percentageFinalSalePrice = calculatePercentageDiscount(value.total_price, value.discount_percentage);

        })

    });

    salesServiceMethods.getVendorsList().then(function(response) {
        $scope.vendorList = response.data;

    });

    $scope.convertHtml = function(description) {
        // console.log(description);
        return $sce.trustAsHtml(description);
    }

    $scope.saleData = {};
    $scope.search = {
        name: "",
        vendor: "",
        status: ""
    };
    $scope.$watch("search.vendor", function() {

        if ($scope.search.vendor == null) {
            $scope.search.vendor;
        }
    });

    // users list filters
    $scope.resetFilters = function() {
        $scope.search = {
            name: "",
            vendor: "",
            status: ""
        };
    };

    //modal popup details of the Sale
    $scope.saleDetails = function(saleData) {
        $scope.modalDetials = {};
        angular.copy(saleData, $scope.modalDetials);
    };

    $scope.closeButton = function() {
        $('#reasonForDelete').modal('toggle');
    };

    $scope.confirmDelete = function(reasonToBlock) {
        var message = {
            reasonToBlock: reasonToBlock
        };
        $('#reasonForDelete').modal('toggle');
        var result = confirm("Confirm Block?");
        if (result) {
            //Logic to delete the item
            $scope.blockSale($scope.saleData, message);
        }

    };
    $scope.confirmUnBlock = function(reasontoUnBlock) {
        var message = {
            reasonToUnblock: reasontoUnBlock
        };
        $('#reasonForUnBlock').modal('toggle');
        var result = confirm("Confirm UnBlock?");
        if (result) {
            //Logic to delete the item
            // console.log($scope.saleDataUnBlock);
            // console.log(message)
            $scope.unBlockSale($scope.saleDataUnBlock, message);
        }

    };

    calculatePercentageDiscount = function(price, perecentage) {
        return (price - ((perecentage / 100) * price).toFixed(2));
    };

    $scope.discountExists = function(priceDiscount) {
        if (priceDiscount > 0) {
            return true;
        } else {
            return false;
        }
    };

    $scope.blockSaleConfirm = function(sales) {
        $scope.saleData = sales;
        $('#reasonForDelete').modal('toggle');
    };
    $scope.unBlockSaleConfirm = function(sales) {
        $scope.saleDataUnBlock = sales;
        $('#reasonForUnBlock').modal('toggle');
    };

    $scope.closeUnBlockButton = function() {
        $('#reasonForUnBlock').modal('toggle');
    };

    //block sale
    $scope.blockSale = function(modaldetails, message) {
            // $('#confirmBlock').modal('hide');
            $scope.filterData = $filter('filter')($scope.salesList, {
                id: modaldetails.id
            });
            if ($scope.filterData[0].id == modaldetails.id) {
                salesServiceMethods.blockSale(modaldetails.id, message).then(function(response) {
                    if (response.status == 200) {
                        $scope.filterData[0].status = modaldetails.status;
                        $scope.saleData = {};
                        $scope.reasonToBlock = "";
                        $state.reload();
                        $.notify({
                            title: '<strong>Success!</strong>',
                            message: response.data.message
                        }, {
                            type: 'success'
                        });
                    }
                }, function(res) {
                    $state.reload();
                    $.notify({
                        title: '<strong>Unsuccessful!</strong>',
                        message: res.data.message
                    }, {
                        type: 'danger'
                    });
                });

            }

        }
        //unblock sale
    $scope.unBlockSale = function(modaldetails, message) {
        // $('#confirmBlock').modal('hide');
        $scope.filterData = $filter('filter')($scope.salesList, {
            id: modaldetails.id
        });
        if ($scope.filterData[0].id == modaldetails.id) {
            salesServiceMethods.unBlockSale(modaldetails.id, message).then(function(response) {
                if (response.status == 200) {
                    $scope.filterData[0].status = modaldetails.status;
                    $scope.saleData = {};
                    $scope.reasonToUnBlock = "";
                    $state.reload();
                    $.notify({
                        title: '<strong>Success!</strong>',
                        message: response.data.message
                    }, {
                        type: 'success'
                    });
                }
            }, function(res) {
                $state.reload();
                $.notify({
                    title: '<strong>Unsuccessful!</strong>',
                    message: res.data.message
                }, {
                    type: 'danger'
                });
            });

        }

    }



}]);