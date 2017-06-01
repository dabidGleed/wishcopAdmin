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

        productsServiceMethods.getVendorsList = function() {
             
            var finalUrl = baseURL + "admin/vendor/list"
            return $http({
                method: 'GET',
                url: finalUrl
                // data: dataObj,
                // headers:  
            }) 
        };

        productsServiceMethods.blockProduct = function(productID,dataObj) {
             
            var finalUrl = baseURL + "admin/"+productID+"/block/product"
            return $http({
                method: 'POST',
                url: finalUrl,
                data: dataObj
                // headers:  
            }) 
        };

        productsServiceMethods.activeProduct = function(productID) {
             
            var finalUrl = baseURL + "admin/"+productID+"/active/product"
            return $http({
                method: 'POST',
                url: finalUrl
                // data: dataObj,
                // headers:  
            }) 
        };


         
        return productsServiceMethods;
    }])