  /**
 * LOGIN PAGE SERVICE
 */

app.factory('loginService', ['$http','globalVars', function($http,globalVars) {
    var loginServiceMethods = {};
  
      var baseURL = globalVars.baseURL;
         loginServiceMethods.login =function(data){
            return $http.post(baseURL + 'user/login', data).then(function(res) {
                     return res;
                }, function(res) {
                    return res;
                })
         }
         
        return loginServiceMethods;
    }])