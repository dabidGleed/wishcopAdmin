  /**
 * USERS LIST PAGE SERVICE
 */
   
app.factory('usersService', ['$http','globalVars', function($http,globalVars) {
    var usersServiceMethods = {};
     var baseURL = globalVars.baseURL;

         //service to get all users list
        // usersServiceMethods.getUsersList = function() {
             
        //     var finalUrl = baseURL + "admin/users/get/all"
        //     return $http({
        //         method: 'POST',
        //         url: finalUrl
        //         // data: dataObj,
        //         // headers:  
        //     }) 
        // };
        usersServiceMethods.getUsersList = function(page, searchData) {
            var query = "";
            if (searchData.name != "") {
              query += "&str="+searchData.name;
            }
  
            if (searchData.role != "") {
              query += "&role="+searchData.role;
            }
            if (searchData.status != "") {
              query += "&status="+searchData.status;
            }
              var finalUrl = baseURL + "admin/user/list/all?limit=16&skip=" + page +query  ;
              return $http({
                  method: 'POST',
                  url: finalUrl
                  // data: dataObj,
                  // headers:
              })
          };
        usersServiceMethods.getCompetitorsList = function() {
            
           var finalUrl = baseURL + "competitors/list/all"
           return $http({
               method: 'GET',
               url: finalUrl
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

        //service to get user profile Detials
        usersServiceMethods.userprofileDetials = function(userId) {
             
            var finalUrl = baseURL + "vendor/"+userId+"/profile";
            return $http({
                method: 'GET',
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