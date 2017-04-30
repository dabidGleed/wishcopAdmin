/**
 * LOGIN PAGE CONTROLLER
 */

app.controller('loginPageCtrl', function($location, $scope, $rootScope) {

    $rootScope.hideLeftMenu = true;
    $rootScope.hideTopMenu = true;
    $rootScope.showFooter = false;

console.log("hi");
    $scope.goToDashboard = function(){
        $location.path('/dashboard')
     console.log("BYE");
    }

}); 