/**
 * PAYMENT GATEWAY PAGE CONTROLLER
 */

app.controller('paymentGatewayCtrl', ["$location", "$scope", "$rootScope", "paymentGatewayService", "$filter", function ($location, $scope, $rootScope, paymentGatewayServiceMethods, $filter) {


    $scope.itemsInPage = 1;

    // get payment gateways list
    $scope.initialLoad = function () {
        paymentGatewayServiceMethods.getPaymentGatwayslist().then(function (response) {
            $scope.paymentData = {
                status: true
            };
            $scope.paymentGatewaysList = response.data;
            angular.forEach($scope.paymentGatewaysList, function (item) {
                if (item.status == "ACTIVE") {
                    item.isActive = true;

                } else {
                    item.isActive = false;
                }
            });
        });
    };

    $scope.initialLoad();

    $scope.setActive = function (id) {
        angular.forEach($scope.paymentGatewaysList, function (item) {
            if (item.id === id) {
                item.status = "ACTIVE";
            } else {
                item.status = "INACTIVE";
            }
        });
    };

    // update payment gateway 
    $scope.updatePaymentGateway = function () {
        $scope.selectedItem = "";
        angular.forEach($scope.paymentGatewaysList, function (item) {
            if (item.status === "ACTIVE") {
                $scope.selectedItem = item.id;
            }
        });

        paymentGatewayServiceMethods.updatePaymentGatwayslist($scope.selectedItem).then(function (response) {
            if (response.status == 200) {

                $.notify({
                    title: '<strong>Success!</strong>',
                    message: response.data.message
                }, {
                    type: 'success'
                });
                $scope.initialLoad();
            } else {
                $.notify({
                    title: '<strong>Unsuccessful!</strong>',
                    message: response.data.message
                }, {
                    type: 'danger'
                });
                $scope.initialLoad();
            }
        });
    };

    $scope.updatePaymentFailed = function (failedCount, id) {
        //   console.log(failedCount+"---------------------"+ id );
        //   console.log(angular.isNumber(failedCount));
        if (angular.isNumber(failedCount)) {
            paymentGatewayServiceMethods.updatePaymentFailedAttempts(failedCount, id).then(function (response) {
                console.log(response.status);
                if (response.status == 200) {

                    $.notify({
                        title: '<strong>Success!</strong>',
                        message: response.data.message
                    }, {
                        type: 'success'
                    });
                    $scope.initialLoad();
                } else {
                    $.notify({
                        title: '<strong>Unsuccessful!</strong>',
                        message: response.data.message
                    }, {
                        type: 'danger'
                    });
                    $scope.initialLoad();
                }
            });

        } else {
            $.notify({
                title: '<strong>Unsuccessful!</strong>',
                message: ''
            }, {
                type: 'danger'
            });
            $scope.initialLoad();

        }


    };

    //modal popup details of the Failed transactions
    $scope.failedTransactions = function (data) {
        $scope.modalDetials = [];
        angular.copy(data, $scope.modalDetials);
    }
}]);