  /**
 * USERS LIST PAGE SERVICE
 */
   
app.factory('smsEmailService', ['$http', function($http) {
    var smsEmailServiceMethods = {};
     var baseURL = "http://localhost/";

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

         //service to send bulk Email
       smsEmailServiceMethods.sendEmail = function(dataObj,message,subject) {
             var data = {message:message,dataObj:dataObj,subject:subject};
            var finalUrl = baseURL + "admin/email/bulk";
            return $http({
                method: 'POST',
                url: finalUrl,
                data: data,
                // headers:  
            }) 
        };

         

         
        return smsEmailServiceMethods;
    }])