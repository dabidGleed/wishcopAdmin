/**
 * TOP MENU PAGE CONTROLLER
 */

app.controller('topMenuCtrl',["$scope", "$rootScope","$state","authService","globalVars","$timeout","$localStorage",   function( $scope, $rootScope,$state,authService,globalVars,$timeout,$localStorage ) {
 

 $scope.logout= function(){
   authService.Logout();
   $state.go("login",{},{reload:true})
 }

  if ($localStorage.currentUser) {
    $scope.userImg = $localStorage.currentUser.gravatarUrl;
  }
  
  
 


}]);