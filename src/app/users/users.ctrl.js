/**
 * USERS LIST PAGE CONTROLLER
 */

app.controller('usersListCtrl',["$location", "$scope", "$rootScope","usersService",   function($location, $scope, $rootScope,usersServiceMethods   ) {

 usersServiceMethods.getUsersList().then(function(response) {
            $scope.userList = response.data;
         
        });
 
              
 

}]);