'use strict';

angular.module('cleanUI', [
    "ui.router",
    'cleanUI.controllers' 
])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  
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
                
            })
             
       
 
  
  
        //     .state('logout', { // login Page
        //         url: "/logout",
        //         templateUrl: "app/components/logout/logout.html",
        //         controller: "logoutController",
        //         data: {
        //             requireLogin: false,
        //             loginStateReverse: false
        //         }
        //     })
        //     .state('register', { // login Page
        //         url: "/register",
        //         templateUrl: "app/components/register/register.html",
        //         controller: "register",
        //         data: {
        //             requireLogin: false,
        //             loginStateReverse: false
        //         }
        //     })
        //     .state('profilePage', { // login Page
        //         url: "/profile",
        //         templateUrl: "app/components/profilePage/profile.html",
        //         controller: "profileController",
        //         data: {
        //             requireLogin: false,
        //             loginStateReverse: false
        //         }
        //     })
        //     .state('resendEmail', { // login Page
        //         url: "/resendEmail",
        //         templateUrl: "app/components/register/resendEmail.html",
        //         controller: "register",
        //         data: {
        //             requireLogin: false,
        //             loginStateReverse: false
        //         }
        //     })
        //     .state('orderPreview', { // login Page
        //         url: "/orderPreview",
        //         templateUrl: "app/components/orderPreview/orderPreview.html",
        //         controller: "orderPreview",
        //         data: {
        //             requireLogin: false,
        //             loginStateReverse: false
        //         }
        //     })
        //     .state('asVendor', { // login Page
        //         url: "/asVendor",
        //         templateUrl: "app/components/asVendor/asVendor.html",
        //         controller: "asVendorController",
        //         data: {
        //             requireLogin: false,
        //             loginStateReverse: false
        //         }
        //     })
        //     .state('forgotPass', { // login Page  /vendor/createSale
        //         url: "/forgetPassword",
        //         templateUrl: "app/components/forgetPassword/forgotPassword.tpl.html",
        //         controller: "forgetPasswordController",
        //         data: {
        //             requireLogin: false,
        //             loginStateReverse: false
        //         }
        //     })

        //     .state('resetpwd', { // login Page  /vendor/createSale
        //     url: "/resetPwd/:tokenId",
        //     templateUrl: "app/components/forgetPassword/resetPassword.tpl.html",
        //     controller: "resetController",
        //     data: {
        //       requireLogin: false,
        //       loginStateReverse: false
        //     },
        //     resolve: {
        //         auth: function(forgetPasswordService, $stateParams) {
        //             return forgetPasswordService.resetPwd($stateParams.tokenId);
        //         }
        //     }
        //     })
        //     .state('userVerify', { // vendor.product.
        //         url: "/user/confirmation/:token",
        //         templateUrl: "assets/html/verification.html",
        //         controller: "signupController",
        //         data: {
        //             requireLogin: false,
        //             loginStateReverse: false
        //         }
        //     })
        //     .state('main.add-address', { // vendor.product.
        //         url: "add-address",
        //         templateUrl: "app/components/add-address/add-address.html",
        //         data: {
        //             requireLogin: false,
        //             loginStateReverse: true
        //         }
        //     })
        //     .state('main.notification', { // vendor.product.
        //         url: "notification",
        //         templateUrl: "app/components/favourite/notification.html",
        //         // data: {
        //         //     requireLogin: false,
        //         //     loginStateReverse: true
        //         // }
        //     })
        //     .state('main.subMenu.walletHistory', { // vendor.product.
        //         url: "/walletHistory",
        //         templateUrl: "app/components/walletHistory/walletHistory.html",
        //         controller: "walletHistoryController",
        //         data: {
        //             requireLogin: false,
        //             loginStateReverse: true
        //         }
        //     })
        //     .state('main.favourite', { // vendor.product.
        //         url: "favourite",
        //         templateUrl: "app/components/favourite/favourite.html",
        //         // data: {
        //         //     requireLogin: false,
        //         //     loginStateReverse: true
        //         // }
        //     })
        //     .state('main.createchat', { // vendor.product.
        //           url: "createchat",
        //         templateUrl: "app/components/favourite/create-chatroom.html",
        //         // data: {
        //         //     requireLogin: false,
        //         //     loginStateReverse: true
        //         // }
        //     })
        //     .state('main.myCreatechat', { // vendor.product.
        //           url: "myCreatechat",
        //         templateUrl: "app/components/favourite/my-chat-room.html",
        //         // data: {
        //         //     requireLogin: false,
        //         //     loginStateReverse: true
        //         // }
        //     })
        //     .state('main.vendorProfile', { // login Page  /vendor/createSale
        //         url: "vendorProfile/:id",
        //         templateUrl: "app/components/vendorProfile/vendorProfile.html",
        //          controller: "ProfileController",
        //         data: {
        //             requireLogin: false,
        //             loginStateReverse: true
        //         }
        //     })
        //     .state('main.wishlist', { // vendor.product.
        //         url: "wishlist",
        //         templateUrl: "app/components/wishlist/wish-list.html",
        //         controller: "wishListController",
        //         data: {
        //             requireLogin: false,
        //             loginStateReverse: true
        //         }
        //     })
        //     .state('main', { // Main Inner Page
        //         url: "/",
        //         views: {
        //             '': { templateUrl: "app/components/main/main.html",controller: "main" },
        //             'head@main': { templateUrl: "app/shared/head/head.html", controller: "headControl" },
        //             'footer@main': { templateUrl: "app/shared/footer/footer.html", controller:"footerController" },
        //             'submenu@main': { templateUrl: "app/shared/menu/menu.html" },
        //         },
        //         data: {
        //             requireLogin: false,
        //             loginStateReverse: true
        //         }
        //     })
        //     .state('main.subMenu', { // about Page
        //         url: "submenu",
        //         // templateUrl: "app/shared/subMenu/subMenu.html",
        //         views: {
        //             '': { templateUrl: "app/shared/subMenu/subMenu.html" },
        //         },
        //         // controller: "about",

        //         data: {
        //               requireLogin: true,
        //               loginStateReverse: true
        //             }
        //     })
        //     .state('main.settings', { // about Page
        //         url: "settings",
        //         templateUrl: "app/components/settings/settings.html",
        //         controller: "referralController",
        //         // controller: "about",

        //         data: {
        //               requireLogin: true,
        //               loginStateReverse: true
        //             }
        //     })
        //     .state('main.settings.addDeliveryAddress', { // about Page
        //         url: "/addAddress",
        //         templateUrl: "app/components/add-delivery-address/add-delivery-address.html",
        //         controller: "addAddressController",

        //         data: {
        //               requireLogin: true,
        //               loginStateReverse: true
        //             }
        //     })
        //      .state('main.settings.changePassword', { // about Page
        //         url: "/changePassword",
        //         templateUrl: "app/components/change-password/change-password.html",
        //          controller: "changePasswordController",
        //         data: {
        //               requireLogin: true,
        //               loginStateReverse: true
        //             }
        //     })
        //     .state('main.settings.inviteFriends', { // about Page
        //        url: "/inviteFriends",
        //        templateUrl: "app/components/inviteFriends/inviteFriends.html",
        //         controller: "inviteFriendController",
        //        data: {
        //              requireLogin: true,
        //              loginStateReverse: true
        //            }
        //    })
        //     .state('main.settings.profilePage', { // about Page
        //        url: "/profilePage",
        //        templateUrl: "app/components/profilePage/profilePage.html",
        //         controller: "profilePageController",

        //        data: {
        //              requireLogin: true,
        //              loginStateReverse: true
        //            }
        //    })
        //    .state('main.referral', { // about Page
        //         url: "referral",
        //         templateUrl: "app/components/referralCode/referral.html",
        //         controller: "referralController",
        //         data: {
        //               requireLogin: true,
        //               loginStateReverse: true
        //             }
        //     })
        //     .state('main.subMenu.wallet', { // about Page
        //         url: "/wallet",
        //         templateUrl: "app/components/wallet/wallet.html",
        //         controller: "walletController",
        //         data: {
        //               requireLogin: true,
        //               loginStateReverse: true
        //             }
        //     })
        //     .state('main.subMenu.orders', { // about Page
        //         url: "/orders",
        //         templateUrl: "app/components/orders/orders.html",
        //         controller: "ordersController",
        //         data: {
        //               requireLogin: true,
        //               loginStateReverse: true
        //             }
        //     })
        //     .state('main.subMenu.send-transfer', { // about Page
        //         url: "/send-transfer",
        //         templateUrl: "app/components/send-bank/send-transfer.html",
        //         controller: "sendTransferController",
        //         data: {
        //               requireLogin: true,
        //               loginStateReverse: true
        //             }
        //     })
        //     .state('main.viewsale', { // about Page
        //         url: "viewsale",
        //         templateUrl: "app/components/marked-good-price/good-price.tpl.html",
        //         // controller: "about",
        //         data: {
        //               requireLogin: false,
        //               loginStateReverse: true
        //             }
        //     })
        //     .state('main.cart', { // about Page
        //         url: "cart",
        //         templateUrl: "app/components/cart/cart.html",
        //         controller: "cartController",
        //         data: {
        //               requireLogin: false,
        //               loginStateReverse: true
        //             }
        //     })
        //     .state('main.front', { // about Page
        //         url: "front",
        //         templateUrl: "app/components/front/front.html",
        //         controller: "frontController",
        //         data: {
        //             requireLogin: false,
        //             loginStateReverse: true
        //         }
        //     })
        //     .state('main.sales', { // about Page
        //         url: "sales/:id/:value",
        //         templateUrl: "app/components/forSale/for-sale.html",
        //         controller: "forsaleController",
        //         data: {
        //             requireLogin: false,
        //             loginStateReverse: true
        //         }
        //     })
        //     .state('main.viewOrder', { // about Page
        //         url: "order/:uid/:oid/track",
        //         templateUrl: "app/components/viewOrder/viewOrder.html",
        //         controller: "viewOrderController",
        //         data: {
        //             requireLogin: false,
        //             loginStateReverse: true
        //         }
        //     })
        //     .state('main.payment', { // about Page
        //         url: "payment",
        //         templateUrl: "app/components/payment/payment.html",
        //         controller: "paymentController",
        //         data: {
        //             requireLogin: false,
        //             loginStateReverse: true
        //         }
        //     })
        //     .state('main.about', { // about Page
        //         url: "about",
        //         templateUrl: "app/components/about/about.html",
        //         controller: "about",
        //         data: {
        //             requireLogin: true,
        //             loginStateReverse: true
        //         }
        //     })
        //     .state('main.profile', { // about Page
        //         url: "profile",
        //         templateUrl: "app/components/profile/profile.html",
        //         controller: "profile",
        //         data: {
        //             requireLogin: true,
        //             loginStateReverse: true
        //         }
        //     })
        //     .state('main.forsalePreview', { // about Page
        //         url: "forsalePreview/:id",
        //         templateUrl: "app/components/product-preview/product-preview.tpl.html",
        //         controller: "PreviewProductController",
        //         data: {
        //             requireLogin: false,
        //             loginStateReverse: true
        //         }
        //     })
        //     .state('main.item_preview', { // about Page
        //         url: "item-preview/:sid/:pid",
        //         templateUrl: "app/components/item-preview/item-preview.html",
        //         controller: "allProductPreviewController",
        //         data: {
        //             requireLogin: false,
        //             loginStateReverse: true
        //         }
        //     })
        //      .state('main.item', { // about Page
        //         url: "item/:pid",
        //         templateUrl: "app/components/item-preview/item-preview-item.html",
        //         controller: "allProductPreviewController",
        //         data: {
        //             requireLogin: false,
        //             loginStateReverse: true
        //         }
        //     })
        //     .state('main.trackSale', { // about Page
        //         url: "trackSale/:orderId/:saleId",
        //         templateUrl: "app/components/trackSale/track-sale.html",
        //         controller: "trackSaleController",
        //         data: {
        //             requireLogin: true,
        //             loginStateReverse: true
        //         }
        //     })
        //     .state('main.trackOrder', { // about Page
        //         url: "trackOrder",
        //         templateUrl: "app/components/trackorder/track-order.html",
        //         controller: "trackOrderController",
        //         data: {
        //             requireLogin: false,
        //             loginStateReverse: true
        //         }
        //     });
        $urlRouterProvider.otherwise("/dashboard");
        // $locationProvider.html5Mode(true);
    })

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