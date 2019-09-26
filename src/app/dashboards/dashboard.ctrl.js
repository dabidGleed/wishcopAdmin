/**
 * DASHBOARD PAGE CONTROLLER
 */

app.controller('dashboardCtrl', ["$location", "$scope", "$state", "$rootScope", "dashboardService", function ($location, $scope, $state, $rootScope, service) {

    $rootScope.hideLeftMenu = false;
    $rootScope.hideTopMenu = false;
    $rootScope.showFooter = true;
    $scope.orderData = {};
    console.log("dashboardCtrl");
    $scope.getOrderDetails = function(){
        NProgress.start();
        service.getOrderDetails().then(function (response) {
            console.log(response.data[0]);
            $scope.orderData = response.data[0];
            NProgress.done();
        });
    };
    $scope.reLoad = function(){
        $state.reload();
    };
    $scope.getOrderDetails();


    $('body').removeClass('single-page single-page-inverse');


    // Firefox issue: scroll top when page load
    $('html, body').scrollTop(0);

    // Set active state menu after success change route
    $('.left-menu-list-active').removeClass('left-menu-list-active');
    $('nav.left-menu .left-menu-list-root .left-menu-link').each(function () {
        if ($(this).attr('href') == '#' + $location.path()) {
            $(this).closest('.left-menu-list-root > li').addClass('left-menu-list-active');
        }
    });

    // NProgress End
    setTimeout(function () {
        NProgress.done();
    }, 1000);
    $('body').removeClass('cui-page-loading-state');


}]);