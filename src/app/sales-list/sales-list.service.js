  /**
 * SALES LIST PAGE SERVICE
 */

app.factory('salesService', ['$http','globalVars', function($http,globalVars) {
    var salesServiceMethods = {};
      var baseURL = globalVars.baseURL;

         //service to get all sales list
        salesServiceMethods.getSalesList = function(page, searchData) {
            var query = "";
            if (searchData.name != "") {
                query += "&str=" + searchData.name;
            }
            if (searchData.vendor != "") {
                query += "&vendorId=" + searchData.vendor;
            }
            if (searchData.subBrand != "") {
                query += "&subBrand=" + searchData.subBrand;
            }
            if (searchData.status != "") {
                query += "&status=" + searchData.status;
            }
            var finalUrl = baseURL + "admin/list/sales?limit=16&skip=" + page + query;
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
        salesServiceMethods.updateSale = function(saleID, sale) {
             
            var finalUrl = baseURL + "admin/"+saleID+"/update/sale-details"
            return $http({
                method: 'POST',
                url: finalUrl,
                data: sale
                // headers:  
            }) 
        };

         
        return salesServiceMethods;
    }])