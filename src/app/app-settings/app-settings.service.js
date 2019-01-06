  /**
   * APP SETTINGS PAGE SERVICE
   */

  app.factory('appSettingsService', ['$http', 'globalVars', function ($http, globalVars) {
      var appSettingsServiceMethods = {};
      var baseURL = globalVars.baseURL;

      //service to update contact number
      appSettingsServiceMethods.updateContactNumber = function (id, contactNumber) {

          var finalUrl = baseURL + "settings/change/" + id + "/contact";
          return $http({
              method: 'POST',
              url: finalUrl,
              data: {
                  companyNumber: contactNumber
              }
              // headers:  
          });
      };
      //service to update company number
      appSettingsServiceMethods.updateMaxCredit = function (id, maxCredit) {
          maxCredit = parseFloat(maxCredit);
          var finalUrl = baseURL + "admin/" + id + "/change/max-credit";
          return $http({
              method: 'POST',
              url: finalUrl,
              data: {
                  maxCredit: maxCredit
              }
              // headers:  
          });
      };
      //service to update contact number
      appSettingsServiceMethods.getContactNumber = function (id, contactNumber) {

          var finalUrl = baseURL + "settings/change/" + id + "/contact";
          return $http({
              method: 'POST',
              url: finalUrl,
              data: {
                  companyNumber: contactNumber
              }
              // headers:  
          });
      };
      //service to get Users data
      appSettingsServiceMethods.getCredits = function (limit, skip) {

          var finalUrl = baseURL + "admin/users/credits/list?limit=" + limit + "&skip=" + skip;
          return $http({
              method: 'GET',
              url: finalUrl
              // headers:  
          });
      };
      return appSettingsServiceMethods;
  }]);