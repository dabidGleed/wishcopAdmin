/**
 * SALES LIST PAGE CONTROLLER
 */

app.controller('salesListCtrl',["$location", "$scope", "$rootScope","salesService",   function($location, $scope, $rootScope,salesServiceMethods   ) {

 salesServiceMethods.getSalesList().then(function(response) {
            $scope.salesList = response.data;
            
        });
 
              
 

}]);