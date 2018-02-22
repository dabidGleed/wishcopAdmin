/**
 * LOGIN PAGE CONTROLLER
 */

app.controller('loginPageCtrl', ["loginService", "$location", "$state", "$scope", "$rootScope", "$stateParams", "authService", "$window", "$localStorage", "$http", function (loginServiceMethods, $location, $state, $scope, $rootScope, $stateParams, authService, $window, $localStorage, $http) {

    $rootScope.hideLeftMenu = true;
    $rootScope.hideTopMenu = true;
    $rootScope.showFooter = false;
    $scope.user = {};
    $scope.error = false;
    $scope.goToDashboard = function (user) {
        loginServiceMethods.login(user).then(function (response) {
            if (response.data.role[0] == "ADMIN") {
                $rootScope.hideLeftMenu = false;
                $rootScope.hideTopMenu = false;
                $rootScope.showFooter = false;
                $('body').removeClass('single-page single-page-inverse');
                $state.go("main.dashboard", {}, {
                    reload: true
                })

            } else {
                $scope.error = "Your credentials do not match, please check the credentials"
            }
        });
    }

    $scope.authenticationCheck = function (user) {
        authService.login(user)
            .then(function (result) {

                if (result.role[0] == "ADMIN") {
                    $localStorage.currentUser = result;
                    
                    authService.init();
                    console.log(result)
                    $rootScope.hideLeftMenu = false;
                    $rootScope.hideTopMenu = false;
                    $rootScope.showFooter = false;
                    $('body').removeClass('single-page single-page-inverse');
                    $state.go("main.dashboard", {}, {
                        reload: true
                    })
                } else {
                    $scope.error = "Your credentials do not match, please check the credentials"
                }


            }).catch(function (error) {
                console.log(error);
                $scope.error = "Your credentials do not match, please check the credentials"
            });

    };

}]);