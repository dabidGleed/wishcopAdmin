/**
 * PAYMENT TRANSACTIONS PAGE CONTROLLER
 */

app.controller('paymentTransactionsCtrl', ["$location", "$scope", "$rootScope", "paymentTransactionsService", "$filter", function ($location, $scope, $rootScope, paymentTransactionsServiceMethods, $filter) {

    $scope.currentPage = 1;
    $scope.itemsPerPage = 15;
    $scope.totalCount = 0;
    $scope.search = { 
        status: ""
    };
    $scope.localSearch = { 
        status: ""
    };

    // get account transfers list
    $scope.getTransactionsList = function (data,searchData) {
        NProgress.start();
        paymentTransactionsServiceMethods.getTransactionsList(data,searchData).then(function (response) {
            $scope.userList = response.data.transactions;
            $scope.totalCount = response.data.count;
            NProgress.done();
        });

    }
    $scope.getTransactionsList(0,$scope.localSearch);
    

    $scope.pageChanged = function (newPage) {
        var pageDataList = (newPage-1)*($scope.itemsPerPage);
        $scope.getTransactionsList(pageDataList,$scope.localSearch);
    };
    // users list filters
    $scope.resetFilters = function () {
        $scope.search = { 
            status: ""
        };
        $scope.localSearch = { 
        status: ""
    };
    $scope.getTransactionsList(0,$scope.localSearch);
    }
    //modal popup details of the Transactions
    $scope.userDetails = function (userData) {
         $scope.filterData = $filter('filter')($scope.userList, {
            id: userData.id
        });
         paymentTransactionsServiceMethods.updateView(userData.id).then(function (response) {
                    if (response.status == 200) {
                         $scope.filterData[0].read=true;
                     
                    } else {
                       
                    }
                });
        $scope.modalDetials = {};
        angular.copy(userData, $scope.modalDetials);
    }

   $scope.applyFilters = function(searchData){
       angular.copy(searchData, $scope.localSearch);
       $scope.getTransactionsList(0,$scope.localSearch);

   }
}]);