  /**
   * USERS LIST PAGE SERVICE
   */

  app.factory('accountTransferService', ['$http', 'globalVars', function ($http, globalVars) {
      var accountTransferServiceMethods = {};
      var baseURL = globalVars.baseURL;
      var userId = globalVars.userData.userId;

      //service to get all users list
      accountTransferServiceMethods.getAccountTransferList = function () {

          var finalUrl = baseURL + "accountdetails/" + userId + "/list";
          return $http({
              method: 'GET',
              url: finalUrl
              // data: dataObj,
              // headers:  
          })
      };

      //service to update status
      accountTransferServiceMethods.updateStatus = function (id) {
          var finalUrl = baseURL + "accountdetails/"+id+"/update/transferred"
          return $http({
              method: 'PUT',
              url: finalUrl
              // data: dataObj,
              // headers:  
          })
      };

      //service to update status
      accountTransferServiceMethods.updateStatusRejected = function (id,status) {
          var finalUrl = baseURL + "accountdetails/"+id+"/update/rejected"
          return $http({
              method: 'PUT',
              url: finalUrl,
               data: {"reasonToReject":status}
              // headers:  
          })
      };
 


      return accountTransferServiceMethods;
  }])