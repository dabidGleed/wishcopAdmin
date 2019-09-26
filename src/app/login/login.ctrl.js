/**
 * LOGIN PAGE CONTROLLER
 */

app.controller('loginPageCtrl', ["loginService", "$location", "$state", "$scope", "$rootScope", "$stateParams", "authService", "$window", "$localStorage", "$http", function (loginServiceMethods, $location, $state, $scope, $rootScope, $stateParams, authService, $window, $localStorage, $http) {

    $rootScope.hideLeftMenu = true;
    $rootScope.hideTopMenu = true;
    $rootScope.showFooter = false;
    $scope.user = {};

    // $scope.goToDashboard = function (user) {
    //     loginServiceMethods.login(user).then(function (response) {
    //         console.log(response.data.role);
    //         console.log(response.data.role.includes("MARKETING_ADMIN"));
    //         if (response.data.role.includes("ADMIN") || response.data.role.includes("MARKETING_ADMIN")) {
    //             $rootScope.hideLeftMenu = false;
    //             $rootScope.hideTopMenu = false;
    //             $rootScope.showFooter = false;
    //             $('body').removeClass('single-page single-page-inverse');
    //             $state.go("main.dashboard", {}, {
    //                 reload: true
    //             });
    //         } else {
    //             $scope.error = "User name and password not valid";
    //         }
    //     });
    // };

    $scope.authenticationCheck = function (user) {
        authService.login(user)
            .then(function (result) {
                console.log(result);
                console.log(result.role.includes("MARKETING_ADMIN"));
                if (result.role.includes("ADMIN") || result.role.includes("MARKETING_ADMIN")) {
                    $localStorage.currentUser = result;

                    authService.init();
                    $rootScope.hideLeftMenu = false;
                    $rootScope.hideTopMenu = false;
                    $rootScope.showFooter = false;
                    $('body').removeClass('single-page single-page-inverse');
                    $state.go("main.dashboard", {}, {
                        reload: true
                    });
                } else {
                    $scope.error = "Username or password is not Valid";
                }

            }, function (error) {
                $scope.error = "Username or password is not Valid";
            });

    };

}]);