  /**
 * PRODUCTS LIST PAGE SERVICE
 */

app.factory('productsService', ['$http', function($http) {
    var productsServiceMethods = {};
     var baseURL = "http://ec2-52-43-72-177.us-west-2.compute.amazonaws.com/";

         //service to get all products list
        productsServiceMethods.getProductsList = function() {
             
            var finalUrl = baseURL + "admin/list/products"
            return $http({
                method: 'POST',
                url: finalUrl
                // data: dataObj,
                // headers:  
            }) 
        };

         
        return productsServiceMethods;
    }])