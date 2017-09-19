  /**
   * APP SETTINGS PAGE SERVICE
   */

  app.factory('appSettingsService', ['$http', 'globalVars', function ($http, globalVars) {
      var appSettingsServiceMethods = {};
      var baseURL = globalVars.baseURL;

      //service to update contact number
      appSettingsServiceMethods.updateContactNumber = function (id,contactNumber) {

          var finalUrl = baseURL + "settings/change/"+id+"/contact"
          return $http({
              method: 'POST',
              url: finalUrl,
              data: {companyNumber:contactNumber}
              // headers:  
          })
      };
      //service to update contact number
      appSettingsServiceMethods.getContactNumber = function (id,contactNumber) {

          var finalUrl = baseURL + "settings/change/"+id+"/contact"
          return $http({
              method: 'POST',
              url: finalUrl,
              data: {companyNumber:contactNumber}
              // headers:  
          })
      };


   

     
      

      return appSettingsServiceMethods;
  }])