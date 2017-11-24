  /**
 * REFERRALS LIST PAGE SERVICE
 */
   
app.factory('referralsService', ['$http','globalVars', function($http,globalVars) {
    var referralsServiceMethods = {};
     var baseURL = globalVars.baseURL;

         //service to get all users referrals list
        referralsServiceMethods.getUsersList = function() {
             
            var finalUrl = baseURL + "admin/referrals/list"
            return $http({
                method: 'GET',
                url: finalUrl
                // data: dataObj,
                // headers:  
            }) 
        };

         
         
        return referralsServiceMethods;
    }])