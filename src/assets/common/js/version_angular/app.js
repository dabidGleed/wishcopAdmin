'use strict';

angular.module('cleanUI', [
    'ngRoute',
    'cleanUI.controllers' 
])
.config(['$locationProvider', '$routeProvider',
    function($locationProvider, $routeProvider) {

        /////////////////////////////////////////////////////////////
        // SYSTEM
        $routeProvider.when('/', {redirectTo: '/dashboard'});
        $routeProvider.otherwise({redirectTo: 'pages/page-404'});

        /////////////////////////////////////////////////////////////
        // Documentation
        // $routeProvider.when('/documentation/index', {
        //     templateUrl: 'documentation/index.html'
        // });

        /////////////////////////////////////////////////////////////
        // Dashboards
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboards/dashboard.html'
        });
       
        /////////////////////////////////////////////////////////////
        // Apps
        // $routeProvider.when('/apps/profile', {
        //     templateUrl: 'apps/profile.html'
        // });

        // $routeProvider.when('/apps/messaging', {
        //     templateUrl: 'apps/messaging.html'
        // });

        // $routeProvider.when('/apps/mail', {
        //     templateUrl: 'apps/mail.html'
        // });

        // $routeProvider.when('/apps/calendar', {
        //     templateUrl: 'apps/calendar.html'
        // });

        // $routeProvider.when('/apps/gallery', {
        //     templateUrl: 'apps/gallery.html'
        // });

        /////////////////////////////////////////////////////////////
        // Ecommerce
        $routeProvider.when('/ecommerce/cart-checkout', {
            templateUrl: 'ecommerce/cart-checkout.html'
        });

         $routeProvider.when('/ecommerce/orders', {
            templateUrl: 'ecommerce/orders.html'
        });

        $routeProvider.when('/ecommerce/product-details', {
            templateUrl: 'ecommerce/product-details.html'
        });

        $routeProvider.when('/ecommerce/product-edit', {
            templateUrl: 'ecommerce/product-edit.html'
        });

        $routeProvider.when('/ecommerce/products-list', {
            templateUrl: 'ecommerce/products-list.html'
        });

        $routeProvider.when('/ecommerce/products-catalog', {
            templateUrl: 'ecommerce/products-catalog.html'
        });

        /////////////////////////////////////////////////////////////
        // Users
        $routeProvider.when('/users/list', {
            templateUrl: 'users/users-list.html',
            controller: 'usersListCtrl'
        }); 

        /////////////////////////////////////////////////////////////
        //Sales
        $routeProvider.when('/sales-list', {
            templateUrl: 'sales-list/sales-list.html',
            controller: 'salesListCtrl'
        }); 

        /////////////////////////////////////////////////////////////
        //Products
        $routeProvider.when('/products-list', {
            templateUrl: 'products-list/products-list.html',
            controller: 'productsListCtrl'
        }); 


        /////////////////////////////////////////////////////////////
        // Charts
        $routeProvider.when('/charts/c3', {
            templateUrl: 'charts/c3.html'
        });

        $routeProvider.when('/charts/chartjs', {
            templateUrl: 'charts/chartjs.html'
        });

        $routeProvider.when('/charts/d3', {
            templateUrl: 'charts/d3.html'
        });

        $routeProvider.when('/charts/chartistjs', {
            templateUrl: 'charts/chartistjs.html'
        });

        $routeProvider.when('/charts/peity', {
            templateUrl: 'charts/peity.html'
        });


        /////////////////////////////////////////////////////////////
        // Pages
    
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'loginPageCtrl'
        });

        $routeProvider.when('/pages/page-404', {
            templateUrl: 'pages/page-404.html'
        });

        $routeProvider.when('/pages/page-500', {
            templateUrl: 'pages/page-500.html'
        });
 
        // $routeProvider.when('/pages/register', {
        //     templateUrl: 'pages/register.html',
        //     controller: 'registerPageCtrl'
        // });

    }
]);

var app = angular.module('cleanUI.controllers', []);

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

                if (!$(this).closest('.left-menu-list-submenu').length) {
                    $('.left-menu-list-opened > a + ul').slideUp(200, function(){
                        $('.left-menu-list-opened').removeClass('left-menu-list-opened');
                    });
                }

            });
        }
    };
});