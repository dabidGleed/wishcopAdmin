  /**
 * USERS LIST PAGE SERVICE
 */
   
app.factory('usersService', ['$http','globalVars', function($http,globalVars) {
    var usersServiceMethods = {};
     var baseURL = globalVars.baseURL;

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

         //service to active user
        usersServiceMethods.activeUserStatus = function(userId) {
             
            var finalUrl = baseURL + "admin/"+userId+"/make/active"
            return $http({
                method: 'POST',
                url: finalUrl
                // data: dataObj,
                // headers:  
            }) 
        };

         //service to delete user
        usersServiceMethods.deleteUserStatus = function(userId) {
             
            var finalUrl = baseURL + "admin/"+userId+"/delete"
            return $http({
                method: 'DELETE',
                url: finalUrl
                // data: dataObj,
                // headers:  
            }) 
        };

         
        return usersServiceMethods;
    }])