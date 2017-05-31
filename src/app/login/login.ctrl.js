/**
 * LOGIN PAGE CONTROLLER
 */

app.controller('loginPageCtrl',["loginService","$location","$state", "$scope", "$rootScope","$stateParams", function(loginServiceMethods,$location,$state, $scope, $rootScope,$stateParams) {

    $rootScope.hideLeftMenu = true;
    $rootScope.hideTopMenu = true;
    $rootScope.showFooter = false;
    $scope.user = {};

    $scope.goToDashboard = function(user){
    loginServiceMethods.login(user).then(function(response) {
                if(response.data.role[0] == "ADMIN"){
                  $rootScope.hideLeftMenu = false;
                  $rootScope.hideTopMenu = false;
                  $rootScope.showFooter = false;
                  $('body').removeClass('single-page single-page-inverse');
                    $state.go("main.dashboard",{},{reload:true})

                }else{
                    $scope.error ="User name and password not valid"
                }

            });
        //  $state.go("main.dashboard",{},{reload:true})
        // $state.transitionTo("main.dashboard", $stateParams, {
        // reload: true, inherit: false, notify: true
        // });
     console.log("BYE");
    }

}]);
