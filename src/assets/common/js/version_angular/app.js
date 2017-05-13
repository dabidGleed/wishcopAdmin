'use strict';

var app = angular.module('cleanUI', [
    "ui.router" ,"angularUtils.directives.dirPagination"
])

app.run(function ($rootScope, $state) {
 
  $rootScope.currency = '₹';
   
});
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
              
                if (!$(this).closest('.left-menu-list-submenu').length) {
                   
                    $('.left-menu-list-opened > a + ul').slideUp(200, function(){
                        $('.left-menu-list-opened').removeClass('left-menu-list-opened');
                    });
                }

            });
        }
    };
});

app.factory("stars", function($http ) {
    function _drawRect(ctx, dim, backColor) {
        if (!ctx) throw Error("No Canvas context found!");
        ctx.save(), ctx.width = dim, ctx.height = dim, ctx.fillStyle = backColor, ctx.fillRect(0, 0, dim, dim), 
        ctx.restore();
    }
    function _star(ctx, r) {
        if (!ctx) throw Error("No Canvas context found!");
        ctx.save(), ctx.globalCompositeOperation = "destination-out", ctx.beginPath(), ctx.translate(r, r), 
        ctx.moveTo(0, 0 - r);
        for (var i = 0; i < 5; i++) ctx.rotate(Math.PI / 5), ctx.lineTo(0, 0 - .5 * r), 
        ctx.rotate(Math.PI / 5), ctx.lineTo(0, 0 - r);
        ctx.fill(), ctx.restore();
    }
    function drawRatingElement(ctx, r, rectBackColor, ratingElDrawerFunc) {
        _drawRect(ctx, 2 * r, rectBackColor), "function" == typeof ratingElDrawerFunc ? ratingElDrawerFunc(ctx, r) : _star(ctx, r);
    }
    return {
        drawRatingElement: drawRatingElement
    };
})
app.factory("starsUtility", function() {
    return {
        createRange: function(n) {
            for (var i = 0, range = new Array(n); i < n; ) range[i++] = i;
            return range;
        },
        calculatePercent: function(attrs) {
            var percent, stars, selectedStars;
            return attrs ? attrs.ratingPercent ? (percent = parseInt(attrs.ratingPercent) ? parseInt(attrs.ratingPercent) : 0, 
            percent > 100 ? 100 : percent) : attrs.ratingStars ? (stars = parseInt(attrs.stars || 5), 
            selectedStars = parseFloat(attrs.ratingStars) > stars ? stars : parseFloat(attrs.ratingStars), 
            100 / stars * selectedStars || 0) : void 0 : 0;
        },
        percentFullStars: function(totalStars, totalWidth, starWidth, width) {
            var pxPerOneStar = totalWidth / totalStars, percentPerOneStar = 100 / totalStars;
            return Math.ceil(width / pxPerOneStar) * percentPerOneStar;
        },
        starsByPercent: function(totalStars, percent, precision) {
            return (percent / (100 / totalStars)).toFixed(precision || 2);
        }
    };
})
app.directive("starRating", function($compile, $timeout, stars, starsUtility) {
    return {
        restrict: "A",
        scope: {
            percent: "=outerPercent",
            starsSelected: "=outerStarSelection",
            customFigureDrawer: "=?"
        },
        template: '<div class="stars" ng-mousemove="changeRating($event)" ng-mouseleave="leaveRating()" ng-style="{\'background-color\': emptyBackColor}"><div class="stars-selected addReviewStar" ng-style="{\'width\': percent + \'%\', \'background-color\': selColor}"></div></div>',
        link: function($scope, el, attrs) {
            var starEls = [], wrapper = angular.element(el[0].querySelector(".stars")), filler = angular.element(el[0].querySelector(".stars-selected"));
            $scope.howManyStars = starsUtility.createRange(attrs.stars) || starsUtility.createRange(5), 
            $scope.starRadius = parseInt(attrs.starRadius) || 20, $scope.percent = $scope.prevPercent = starsUtility.calculatePercent(attrs), 
            $scope.backColor = attrs.backColor || "white", $scope.emptyBackColor = attrs.emptyBackColor || "#d3d3d3", 
            $scope.selColor = attrs.selColor || "gold", $scope.ratingDefine = attrs.ratingDefine || !1, 
            $scope.ratingDefine && ($scope.$watch("percent", function(newValue) {
                filler.css("width", newValue + "%"), $scope.starsSelected = starsUtility.starsByPercent($scope.howManyStars.length, $scope.percent);
            }), $scope.changeRating = function(e) {
                var el = wrapper[0], w = el.offsetWidth, selected = e.clientX - el.getBoundingClientRect().left + 2, newPercent = "star" == $scope.ratingDefine ? starsUtility.percentFullStars($scope.howManyStars.length, w, 2 * $scope.starRadius, selected) : Math.floor(100 * selected / w);
                $scope.percent = newPercent > 100 ? 100 : newPercent;
            }, $scope.leaveRating = function() {
                $scope.percent = $scope.prevPercent;
            }, $scope.secureNewRating = function() {
                $scope.prevPercent = $scope.percent;
            }), $scope.howManyStars.forEach(function() {
                var star = angular.element('<canvas class="star" ng-click="secureNewRating()" height="{{starRadius*2}}" width="{{starRadius*2}}"></canvas>');
                $compile(star)($scope), wrapper.append(star), starEls.push(star);
            }), $timeout(function() {
                starEls.forEach(function(el) {
                    stars.drawRatingElement(el[0].getContext("2d"), $scope.starRadius, $scope.backColor, $scope.customFigureDrawer);
                }), wrapper.css("visibility", "visible");
            });
        }
    };
})