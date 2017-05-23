  /**
 * USERS LIST PAGE SERVICE
 */
   
app.factory('smsEmailService', ['$http', function($http) {
    var smsEmailServiceMethods = {};
     var baseURL = "http://ec2-52-43-72-177.us-west-2.compute.amazonaws.com/";

         //service to get all users list
        smsEmailServiceMethods.getUsersList = function() {
             
            var finalUrl = baseURL + "admin/users/get/all"
            return $http({
                method: 'POST',
                url: finalUrl
                // data: dataObj,
                // headers:  
            }) 
        };

         //service to send bulk SMS
       smsEmailServiceMethods.sendSMS = function(dataObj,message) {
             var data = {message:message,dataObj:dataObj};
            var finalUrl = baseURL + "admin/sms/bulk";
            return $http({
                method: 'POST',
                url: finalUrl,
                data: data,
                // headers:  
            }) 
        };

         //service to delete user
      smsEmailServiceMethods.deleteUserStatus = function(userId) {
             
            var finalUrl = baseURL + "admin/"+userId+"/delete"
            return $http({
                method: 'DELETE',
                url: finalUrl
                // data: dataObj,
                // headers:  
            }) 
        };

         
        return smsEmailServiceMethods;
    }])