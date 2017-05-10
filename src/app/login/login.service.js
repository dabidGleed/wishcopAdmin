  /**
 * LOGIN PAGE SERVICE
 */

app.factory('loginService', ['$http', function($http) {
    var loginServiceMethods = {};
      var baseURL = "http://ec2-52-43-72-177.us-west-2.compute.amazonaws.com/";
         loginServiceMethods.login =function(data){
            return $http.post(baseURL + 'user/login', data).then(function(res) {
                     return res;
                }, function(res) {
                    return res;
                })
         }
         
        return loginServiceMethods;
    }])