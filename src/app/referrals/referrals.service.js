  /**
 * REFERRALS LIST PAGE SERVICE
 */
   
app.factory('referralsService', ['$http', function($http) {
    var referralsServiceMethods = {};
     var baseURL = "http://ec2-52-43-72-177.us-west-2.compute.amazonaws.com/";

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