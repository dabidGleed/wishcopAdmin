  /**
 * SALES LIST PAGE SERVICE
 */

app.factory('reportsService', ['$http','globalVars', function($http,globalVars) {
    var reportsServiceMethods = {};
      var baseURL = globalVars.baseURL;

         //service to get all sales list
    reportsServiceMethods.getBuyerOrdersAPI = function (searchData) {
        var query = "";
        if (!!searchData.fromDate && !!searchData.toDate) {
            query += "?from=" + new Date(searchData.fromDate).getTime() + "&to=" + new Date(searchData.toDate).getTime();
        }
        var finalUrl = baseURL + "orders/" + searchData.buyer.id + "/admin/listorders" + query;
        return $http({
            method: 'GET',
            url: finalUrl
        })
    };

    reportsServiceMethods.saveLedger = function (buyerId, data) {
        var finalUrl = baseURL + "admin/" + buyerId + "/save/ledger";
        return $http({
            method: 'POST',
            url: finalUrl,
            data: data
        })
    };

         
        return reportsServiceMethods;
    }])