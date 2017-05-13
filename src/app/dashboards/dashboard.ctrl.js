/**
 * DASHBOARD PAGE CONTROLLER
 */

app.controller('dashboardCtrl',["$location", "$scope", "$rootScope","salesService",   function($location, $scope, $rootScope,salesServiceMethods   ) {

  $rootScope.hideLeftMenu = false;
        $rootScope.hideTopMenu = false;
        $rootScope.showFooter = true;
    $('body').removeClass('single-page single-page-inverse');
      

        // Firefox issue: scroll top when page load
        $('html, body').scrollTop(0);

        // Set active state menu after success change route
        $('.left-menu-list-active').removeClass('left-menu-list-active');
        $('nav.left-menu .left-menu-list-root .left-menu-link').each(function(){
            if ($(this).attr('href') == '#' + $location.path()) {
                $(this).closest('.left-menu-list-root > li').addClass('left-menu-list-active');
            }
        });

        // NProgress End
        setTimeout(function(){
            NProgress.done();
        }, 1000);
        $('body').removeClass('cui-page-loading-state');
 

}]);