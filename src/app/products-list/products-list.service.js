  /**
 * PRODUCTS LIST PAGE SERVICE
 */

app.factory('productsService', ['$http','globalVars', function($http,globalVars) {
    var productsServiceMethods = {};
    var baseURL = globalVars.baseURL;
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