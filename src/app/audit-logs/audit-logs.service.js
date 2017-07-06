  /**
   * AUDIT LOGS PAGE SERVICE
   */

  app.factory('auditLogsService', ['$http', 'globalVars', function ($http, globalVars) {
      var auditLogsServiceMethods = {};
      var baseURL = globalVars.baseURL;

      //service to get all Audit Logs list
      auditLogsServiceMethods.getAuditLogslist = function () {

          var finalUrl = baseURL + "admin/audit/logs"
          return $http({
              method: 'GET',
              url: finalUrl
              // data: dataObj,
              // headers:  
          })
      };

      return auditLogsServiceMethods;
  }])