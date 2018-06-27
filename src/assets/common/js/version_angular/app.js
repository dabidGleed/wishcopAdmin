var app = angular.module('cleanUI', [
    "ui.router", "angularUtils.directives.dirPagination", "summernote", "ngStorage","ui.grid", 'ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.cellNav'
]);

app.run(function ($rootScope, $state) {
    $rootScope.currency = '₹';
});
app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state('main', { // Main Inner Page
            url: "/",
            views: {
                '': {
                    templateUrl: "main/main.html",
                    controller: "homeCtrl"
                },
                'footer@main': {
                    templateUrl: "footer/_footer.html",
                    controller: "footerCtrl"
                },
                'topMenu@main': {
                    templateUrl: "top-menu/_top-menu.html",
                    controller: "topMenuCtrl"
                },
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
        .state('main.productsbulkupload', {
            url: "products-upload",
            templateUrl: "products-list/products-bulk-upload.html",
            controller: "productsListCtrl"

        })
        .state('main.productsprices', {
            url: "products-prices",
            templateUrl: "products-list/products-pricing.html",
            controller: "productsListCtrl"

        })
        .state('main.referralslist', {
            url: "referrals-list",
            templateUrl: "referrals/referrals.html",
            controller: "referralsListCtrl"

        })
        .state('main.smsemaillist', {
            url: "smsemail",
            templateUrl: "send-sms-email/users-list.html",
            controller: "smsEmailCtrl"

        })
        .state('main.paymentgateway', {
            url: "payment-gateway",
            templateUrl: "payment-gateway/payment-gateway.html",
            controller: "paymentGatewayCtrl"

        })
        .state('main.paymenttransactions', {
            url: "payment-transactions",
            templateUrl: "payment-transactions/payment-transactions.html",
            controller: "paymentTransactionsCtrl"

        })
        .state('main.category', {
            url: "category",
            templateUrl: "category/category.html",
            controller: "categoryCtrl"

        })
        .state('main.subcategory', {
            url: "sub-category",
            templateUrl: "sub-category/sub-category.html",
            controller: "subCategoryCtrl"

        })
        .state('main.auditlogs', {
            url: "audit-logs",
            templateUrl: "audit-logs/audit-logs.html",
            controller: "auditLogsCtrl"

        })
        .state('main.competitors', {
            url: "competitors-list",
            templateUrl: "competitors-list/competitors-list.html",
            controller: "competitorsCtrl"

        })
        .state('main.accountTransfer', {
            url: "account-transfer",
            templateUrl: "account-transfer/account-transfer.html",
            controller: "accountTransferCtrl"

        })
        .state('main.referralSettings', {
            url: "referral-settings",
            templateUrl: "referral-settings/referral-settings.html",
            controller: "referralsSettingsCtrl"

        })
        .state('main.appSettings', {
            url: "app-settings",
            templateUrl: "app-settings/app-settings.html",
            controller: "appSettingsCtrl"

        })
        .state('main.orders', {
            url: "orders",
            templateUrl: "orders/orders.html",
            controller: "ordersCtrl"

        })
        .state('main.neworders', {
            url: "neworders",
            templateUrl: "neworders/neworders.html",
            controller: "newOrdersCtrl"

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
});


app.run(['$rootScope', '$http', '$location', '$localStorage', function ($rootScope, $http, $location, $localStorage) {
    // keep user logged in after page refresh
    if ($localStorage.currentUser) {

        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.accessToken;
    }

    // redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var publicPages = ['/login'];
        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$localStorage.currentUser) {
            $location.path('/login');
        }
    });
}]);
app.config(function ($provide, $httpProvider) {

    $provide.factory('unauthorisedInterceptor', ['$q', function ($q) {
        return {
            'responseError': function (rejection) {
                if (rejection.status === 401) {
                    window.location.href = '/#!/login';
                }

                return $q.reject(rejection);
            }
        };
    }]);

    $httpProvider.interceptors.push('unauthorisedInterceptor');
});
app.controller('MainCtrl', function ($location, $scope, $rootScope, $timeout) {

    NProgress.configure({
        minimum: 0.2,
        trickleRate: 0.1,
        trickleSpeed: 200
    });

    $scope.$on('$routeChangeStart', function () {

        // NProgress Start
        $('body').addClass('cui-page-loading-state');
        NProgress.start();

    });

    $scope.$on('$routeChangeSuccess', function () {

        // Set to default (show) state left and top menu, remove single page classes
        $('body').removeClass('single-page single-page-inverse');
        $rootScope.hideLeftMenu = false;
        $rootScope.hideTopMenu = false;
        $rootScope.showFooter = true;

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
    });

});

app.directive('leftMenu', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', '.left-menu-link', function () {

                if (!$(this).closest('.left-menu-list-submenu').length) {

                    $('.left-menu-list-opened > a + ul').slideUp(200, function () {
                        $('.left-menu-list-opened').removeClass('left-menu-list-opened');
                    });
                }

            });
        }
    };
});

app.factory("stars", function ($http) {
    /**
     * Draw wrapping rectangle
     *
     * @param ctx {Object} 2d context
     * @param dim {Number}
     * @param backColor {String}
     */
    function _drawRect(ctx, dim, backColor) {
        if (!ctx) throw Error('No Canvas context found!');
        ctx.save();
        ctx.width = dim;
        ctx.height = dim;
        ctx.fillStyle = backColor;
        ctx.fillRect(0, 0, dim, dim);
        ctx.restore();
    }

    /**
     * Draw one star with certain general params
     *
     * @param ctx {Object} 2d context
     * @param r {Number} Radius
     * @private
     */
    function _star(ctx, r) {
        if (!ctx) throw Error('No Canvas context found!');
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';

        ctx.beginPath();
        ctx.translate(r, r);
        ctx.moveTo(0, 0 - r);
        for (var i = 0; i < 5; i++) {
            ctx.rotate(Math.PI / 5);
            ctx.lineTo(0, 0 - (r * 0.5));
            ctx.rotate(Math.PI / 5);
            ctx.lineTo(0, 0 - r);
        }
        ctx.fill();
        ctx.restore();
    }

    // Draw one empty star
    function drawRatingElement(ctx, r, rectBackColor, ratingElDrawerFunc) {
        _drawRect(ctx, r * 2, rectBackColor);
        if (typeof ratingElDrawerFunc === 'function') {
            ratingElDrawerFunc(ctx, r); // draw custom rating item
        } else {
            _star(ctx, r); // draw star as a default rating item
        }

    }

    // Return API
    return {
        drawRatingElement: drawRatingElement
    };
});


app.factory('starsUtility', function () {
    /**
     * Creates an array with index values
     *
     * @param n {Number}
     * @returns {Array}
     */
    var createRange = function (n) {
        var i = 0;
        var range = new Array(n);
        while (i < n) {
            range[i++] = i;
        }
        return range;
    };

    /**
     * Calculate percent of area to filled with color star
     *
     * @param attrs {Object}
     * @returns {Number}
     */
    var calculatePercent = function (attrs) {
        var percent, stars, selectedStars;
        if (!attrs) {
            return 0;
        } else if (attrs.ratingPercent) {
            percent = parseInt(attrs.ratingPercent) ? parseInt(attrs.ratingPercent) : 0;
            return percent > 100 ? 100 : percent;
        } else if (attrs.ratingStars) {
            stars = parseInt(attrs.stars || 5);
            selectedStars = parseFloat(attrs.ratingStars) > stars ? stars : parseFloat(attrs.ratingStars);
            return (100 / stars) * selectedStars || 0.0;
        }
    };

    /**
     * Calculate how many stars should be filled (in percent)
     *
     * @param totalStars
     * @param totalWidth
     * @param starWidth
     * @param width
     * @returns {number}
     */
    var percentFullStars = function (totalStars, totalWidth, starWidth, width) {
        var pxPerOneStar = totalWidth / totalStars;
        var percentPerOneStar = 100 / totalStars;
        return Math.ceil(width / pxPerOneStar) * percentPerOneStar;
    };

    /**
     * Calculate stars in percents
     *
     * @param totalStars
     * @param percent
     * @param precision
     * @returns {string}
     */
    var starsByPercent = function (totalStars, percent, precision) {
        var percentPerOneStar = 100 / totalStars;
        return (percent / percentPerOneStar).toFixed(precision || 2);
    };

    return {
        createRange: createRange,
        calculatePercent: calculatePercent,
        percentFullStars: percentFullStars,
        starsByPercent: starsByPercent
    };
});


// ------------------------
//        DIRECTIVE
// ------------------------
// @ngInject

app.directive('starRating', function ($compile, $timeout, stars, starsUtility) {
    return {
        restrict: 'A',

        scope: {
            percent: "=outerPercent",
            starsSelected: "=outerStarSelection",
            customFigureDrawer: "=?"
        },

        template: '<div class="stars" ng-mousemove="changeRating($event)" ng-mouseleave="leaveRating()" ng-style="{\'background-color\': emptyBackColor}"><div class="stars-selected addReviewStar" ng-style="{\'width\': percent + \'%\', \'background-color\': selColor}"></div></div>',

        link: function ($scope, el, attrs) {
            // Configs
            var starEls = [];
            var wrapper = angular.element(el[0].querySelector('.stars'));
            var filler = angular.element(el[0].querySelector('.stars-selected'));

            $scope.howManyStars = starsUtility.createRange(attrs.stars) || starsUtility.createRange(5);
            $scope.starRadius = parseInt(attrs.starRadius) || 20;
            $scope.percent = $scope.prevPercent = starsUtility.calculatePercent(attrs);
            $scope.backColor = attrs.backColor || 'white';
            $scope.emptyBackColor = attrs.emptyBackColor || '#d3d3d3';
            $scope.selColor = attrs.selColor || 'gold';
            $scope.ratingDefine = attrs.ratingDefine || false;

            // Allowed to define a new rating?
            // -------------------------------
            if ($scope.ratingDefine) {

                // watch percent value to update the view
                $scope.$watch('percent', function (newValue) {
                    filler.css('width', newValue + '%');
                    $scope.starsSelected = starsUtility.starsByPercent($scope.howManyStars.length, $scope.percent);
                });

                // handle events to change the rating
                $scope.changeRating = function (e) {
                    var el = wrapper[0];
                    var w = el.offsetWidth;
                    var selected = e.clientX - el.getBoundingClientRect().left + 2;
                    var newPercent = $scope.ratingDefine == 'star' ? starsUtility.percentFullStars($scope.howManyStars.length, w, $scope.starRadius * 2, selected) : Math.floor((selected * 100) / w);
                    $scope.percent = newPercent > 100 ? 100 : newPercent;
                };

                $scope.leaveRating = function () {
                    $scope.percent = $scope.prevPercent;
                };

                $scope.secureNewRating = function () {
                    $scope.prevPercent = $scope.percent;
                };
            }

            // add canvas to DOM first
            $scope.howManyStars.forEach(function () {
                var star = angular.element('<canvas class="star" ng-click="secureNewRating()" height="{{starRadius*2}}" width="{{starRadius*2}}"></canvas>');
                $compile(star)($scope);
                wrapper.append(star);
                starEls.push(star);
            });

            // we should wait for next JS 'tick' to show up the stars
            $timeout(function () {
                starEls.forEach(function (el) {
                    stars.drawRatingElement(el[0].getContext("2d"), $scope.starRadius, $scope.backColor, $scope.customFigureDrawer);
                });
                wrapper.css('visibility', 'visible'); // this to avoid to show partly rendered layout
            });

        }
    };
});
