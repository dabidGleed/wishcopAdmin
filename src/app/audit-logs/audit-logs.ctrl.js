/**
 * AUDIT LOGS PAGE CONTROLLER
 */

app.controller('auditLogsCtrl', ["$location", "$scope", "$rootScope", "auditLogsService", "$filter", function ($location, $scope, $rootScope, auditLogsServiceMethods, $filter) {
     $scope.currentPage = 1;
     $scope.itemsPerPage = 15;
     $scope.totalCount = 0;
     $scope.getAuditLogslist = function (data) {
     NProgress.start();
    // get payment gateways list
    $scope.initialLoad = function () {
        auditLogsServiceMethods.getAuditLogslist(data).then(function (response) {
            $scope.auditLogsList = response.data.logs;
            $scope.totalCount = response.data.count;
            NProgress.done();
        });
    };
  }
  $scope.getAuditLogslist(0);
  $scope.pageChanged = function (newPage) {
      var pageDataList = (newPage - 1) * ($scope.itemsPerPage);
      $scope.getAuditLogslist(pageDataList);
  };

    $scope.initialLoad();

    // $scope.search = {
    //     name: "",
    //     role: "",
    //     status: ""
    // };

    // // users list filters
    // $scope.resetFilters = function () {
    //     $scope.search = {
    //         name: "",
    //         role: "",
    //         status: ""
    //     };
    // }

}]);
