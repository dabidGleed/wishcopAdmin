  /**
 * USERS LIST PAGE SERVICE
 */
   
app.factory('usersService', ['$http', function($http) {
    var usersServiceMethods = {};
     var baseURL = "http://ec2-52-43-72-177.us-west-2.compute.amazonaws.com/";

         //service to get all users list
        usersServiceMethods.getUsersList = function() {
             
            var finalUrl = baseURL + "admin/users/get/all"
            return $http({
                method: 'POST',
                url: finalUrl
                // data: dataObj,
                // headers:  
            }) 
        };

         
        return usersServiceMethods;
    }])