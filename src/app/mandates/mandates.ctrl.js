/**
 * USERS LIST PAGE CONTROLLER
 */

app.controller('mandateCtrl', [ "$scope", "buyerService", function ( $scope, buyerService) {


    $scope.currentPage = 1;
    $scope.itemsPerPage = 15;
    $scope.totalCount = 0;


    // get users list
    $scope.getMandates = function(itemsPerPage, skip, searchText){
        NProgress.start();
        buyerService.getMandatesList(itemsPerPage, skip, searchText).then(function (response) {
            $scope.totalCount = response.data.count;
            $scope.mandates = response.data.mandates;
            console.log($scope.totalCount);
            NProgress.done();
        });
    };
    $scope.getMandates($scope.itemsPerPage, 0);
    $scope.searchText = "";

    $scope.$watch('searchText', function() {
        if($scope.searchText != "" && $scope.searchText != null){
            $scope.getMandates($scope.itemsPerPage, 0, $scope.searchText);
        }else{
            $scope.getMandates($scope.itemsPerPage, 0, $scope.searchText);
        }
    });
    // users list filters
    $scope.resetFilters = function () {
        $scope.searchText = "";
    };
    //modal popup details of the user
    $scope.viewPayments = function (mandate) {
        $scope.mandate = mandate;
        if(mandate.payments && mandate.payments.length >0)
            $scope.payments = mandate.payments;
    };

    $scope.saveStatus = function (mandateId, status) {
        $('#mandateModal').modal('hide');
        buyerService.saveMandateStatus(mandateId, status).then(function (response) {
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
    };

    $scope.pageChanged = function (newPage) {
        var pageDataList = (newPage - 1) * ($scope.itemsPerPage);
        $scope.getMandates($scope.itemsPerPage, pageDataList, $scope.searchText);
    };

}]);