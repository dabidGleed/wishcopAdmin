  /**
 * REFERRALS LIST PAGE SERVICE
 */
   
app.factory('referralSettingsService', ['$http','globalVars', function($http,globalVars) {
    var referralSettingsServiceMethods = {};
     var baseURL = globalVars.baseURL;

         //service to get all users referrals list
        referralSettingsServiceMethods.getReferrals = function() {
             
            var finalUrl = baseURL + "referral/settings/list"
            return $http({
                method: 'GET',
                url: finalUrl
                // data: dataObj,
                // headers:  
            });
        };

        referralSettingsServiceMethods.updateReferrals = function(data,id) {
             
            var finalUrl = baseURL + "referral/settings/"+id+"/edit "
            return $http({
                method: 'POST',
                url: finalUrl,
                  data: data
                // headers:  
            }) 
        };

         
         
        return referralSettingsServiceMethods;
    }])