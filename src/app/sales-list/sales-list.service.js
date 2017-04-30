  /**
 * SALES LIST PAGE SERVICE
 */

app.factory('salesService', ['$http', function($http) {
    var salesServiceMethods = {};
     var baseURL = "http://ec2-52-43-72-177.us-west-2.compute.amazonaws.com/";

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

         
        return salesServiceMethods;
    }])