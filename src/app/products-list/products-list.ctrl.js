/**
 * PRODUCTS LIST PAGE CONTROLLER
 */

app.controller('productsListCtrl',["$location", "$scope", "$rootScope","productsService",   function($location, $scope, $rootScope,productsServiceMethods   ) {

 productsServiceMethods.getProductsList().then(function(response) {
            $scope.productsList = response.data;
       

        });
 
              
 

}]);