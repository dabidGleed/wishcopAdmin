/**
 * AUDIT LOGS PAGE CONTROLLER
 */

app.controller('auditLogsCtrl', ["$location", "$scope", "$rootScope", "auditLogsService", "$filter", function ($location, $scope, $rootScope, auditLogsServiceMethods, $filter) {
     $scope.currentPage = 1;
     $scope.itemsPerPage = 15
     NProgress.start();
    // get payment gateways list
    $scope.initialLoad = function () {
        auditLogsServiceMethods.getAuditLogslist().then(function (response) {
            $scope.auditLogsList = response.data;
            NProgress.done(); 
        });
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