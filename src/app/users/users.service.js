  /**
   * USERS LIST PAGE SERVICE
   */

  app.factory('usersService', ['$http', 'globalVars', function ($http, globalVars) {
      var usersServiceMethods = {};
      var baseURL = globalVars.baseURL;

      //service to get all users list
      usersServiceMethods.getUsersList = function () {

          var finalUrl = baseURL + "admin/users/get/all";
          return $http({
              method: 'POST',
              url: finalUrl
          });
      };
      usersServiceMethods.getCompetitorsList = function () {

          var finalUrl = baseURL + "competitors/list/all";
          return $http({
              method: 'GET',
              url: finalUrl
          });
      };
      //service to active user
      usersServiceMethods.activeUserStatus = function (userId, access) {

          var finalUrl = baseURL + "admin/" + userId + "/make/active";
          return $http({
              method: 'POST',
              url: finalUrl,
              data: {
                  access: access
              }
          });
      };

      //service to get user profile Detials
      usersServiceMethods.userprofileDetials = function (userId) {

          var finalUrl = baseURL + "admin/" + userId + "/userprofile";
          return $http({
              method: 'GET',
              url: finalUrl
          });
      };


      //service to delete user
      usersServiceMethods.deleteUserStatus = function (userId) {

          var finalUrl = baseURL + "admin/" + userId + "/delete";
          return $http({
              method: 'POST',
              url: finalUrl
          });
      };


      return usersServiceMethods;
  }]);