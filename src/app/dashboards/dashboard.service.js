  /**
   * DASHBOARD PAGE SERVICE
   */

  app.factory('dashboardService', ['$http', 'globalVars', function ($http, globalVars) {
      var dashboardServiceMethods = {};
      var baseURL = globalVars.baseURL;

      //service to get all users list
      dashboardServiceMethods.getOrderDetails = function () {

          var finalUrl = baseURL + "admin/order/details";
          return $http({
              method: 'POST',
              url: finalUrl
          });
      };


      return dashboardServiceMethods;
  }]);