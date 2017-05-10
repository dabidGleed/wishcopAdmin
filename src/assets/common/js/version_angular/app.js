'use strict';

var app = angular.module('cleanUI', [
    "ui.router" 
])
app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  
   $stateProvider
        .state('main', { // Main Inner Page
                url: "/",
                views: {
                    '': { templateUrl: "main/main.html",controller: "homeCtrl" },
                    'leftMenuBlock@main': { templateUrl: "left-menu/_left-menu.html", controller: "leftMenuCtrl" },
                    'footer@main': { templateUrl: "footer/_footer.html", controller:"footerCtrl" },
                    'topMenu@main': { templateUrl: "top-menu/_top-menu.html", controller:"topMenuCtrl"  },
                }
            })
            .state('main.dashboard', {  
                url: "dashboard",
                templateUrl: "dashboards/dashboard.html",
                controller: "MainCtrl"
            })
            .state('main.userslist', {  
                url: "users/list",
                templateUrl: "users/users-list.html",
                controller: "usersListCtrl"
                
            })
            .state('main.saleslist', {  
                url: "sales-list",
                templateUrl: "sales-list/sales-list.html",
                controller: "salesListCtrl"
                
            })
             .state('main.productslist', {  
                url: "products-list",
                templateUrl: "products-list/products-list.html",
                controller: "productsListCtrl"
                
            })
            .state('login', {  
                url: "/login",
                templateUrl: "login/login.html",
                controller: "loginPageCtrl"
                
            })
            .state('pages404', {  
                url: "/pages/page-404",
                templateUrl: "pages/page-404.html" 
                
            })
            .state('pages500', {  
                url: "/pages/page-500",
                templateUrl: "pages/page-500.html" 
                
            });
             
       
 
  
        $urlRouterProvider.otherwise("/login");
        // $locationProvider.html5Mode(true);
    })

// var app = angular.module('cleanUI.controllers', []);

app.controller('MainCtrl', function($location, $scope, $rootScope, $timeout) {

    NProgress.configure({
        minimum: 0.2,
        trickleRate: 0.1,
        trickleSpeed: 200
    });

    $scope.$on('$routeChangeStart', function() {

        // NProgress Start
        $('body').addClass('cui-page-loading-state');
        NProgress.start();

    });

    $scope.$on('$routeChangeSuccess', function() {

        // Set to default (show) state left and top menu, remove single page classes
        $('body').removeClass('single-page single-page-inverse');
        $rootScope.hideLeftMenu = false;
        $rootScope.hideTopMenu = false;
        $rootScope.showFooter = true;

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
    });
 
});

app.directive('leftMenu', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.on('click', '.left-menu-link', function() {
                 
          console.log($(this).closest('.left-menu-list-submenu').length)
                if (!$(this).closest('.left-menu-list-submenu').length) {
                    console.log("hi");
                    $('.left-menu-list-opened > a + ul').slideUp(200, function(){
                        $('.left-menu-list-opened').removeClass('left-menu-list-opened');
                    });
                }

            });
        }
    };
});