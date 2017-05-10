/**
 * TOP MENU PAGE CONTROLLER
 */

app.controller('topMenuCtrl',["$scope", "$rootScope","$state",   function( $scope, $rootScope,$state   ) {
 

 $scope.logout= function(){
   $state.go("login",{},{reload:true})
 }

}]);