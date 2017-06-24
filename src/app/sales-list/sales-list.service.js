  /**
 * SALES LIST PAGE SERVICE
 */

app.factory('salesService', ['$http','globalVars', function($http,globalVars) {
    var salesServiceMethods = {};
      var baseURL = globalVars.baseURL;

         //service to get all sales list
        salesServiceMethods.getSalesList = function() {
             
            var finalUrl = baseURL + "admin/list/sales"
            return $http({
                method: 'POST',
                url: finalUrl
                // data: dataObj,
                // headers:  
            }) 
        };

         salesServiceMethods.getVendorsList = function() {
             
            var finalUrl = baseURL + "admin/vendor/list"
            return $http({
                method: 'GET',
                url: finalUrl
                // data: dataObj,
                // headers:  
            }) 
        };

        salesServiceMethods.blockSale = function(saleID, message) {
             
            var finalUrl = baseURL + "admin/"+saleID+"/block/sale"
            return $http({
                method: 'POST',
                url: finalUrl,
                data: message
                // headers:  
            }) 
        };
        salesServiceMethods.unBlockSale = function(saleID, message) {
             
            var finalUrl = baseURL + "admin/"+saleID+"/unblock/sale"
            return $http({
                method: 'POST',
                url: finalUrl,
                data: message
                // headers:  
            }) 
        };

         
        return salesServiceMethods;
    }])