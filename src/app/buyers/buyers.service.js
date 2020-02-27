  /**
   * USERS LIST PAGE SERVICE
   */

  app.factory('buyerService', ['$http', 'globalVars', function ($http, globalVars) {
      var buyerService = {};
      var baseURL = globalVars.baseURL;

      //service to get all users list
      buyerService.getBuyersList = function (limit, skip, searchString) {

          var finalUrl = baseURL + "admin/list/buyer/profiles?role=BUYER&status=ACTIVE";
          if (limit) {
              finalUrl = finalUrl + "&limit=" + limit;
          }
          if (skip) {
              finalUrl = finalUrl + "&skip=" + skip;
          }
          if (searchString) {
              finalUrl = finalUrl + "&str=" + searchString;
          }
          return $http({
              method: 'POST',
              url: finalUrl
          });
      };

      //service to get all users list
      buyerService.getVendorsList = function (limit, skip, searchString) {

          var finalUrl = baseURL + "admin/list/buyer/profiles?role=VENDOR&status=ACTIVE";
          if (limit) {
              finalUrl = finalUrl + "&limit=" + limit;
          }
          if (skip) {
              finalUrl = finalUrl + "&skip=" + skip;
          }
          if (searchString) {
              finalUrl = finalUrl + "&str=" + searchString;
          }
          return $http({
              method: 'POST',
              url: finalUrl
          });
      };
      //service to active user
      buyerService.activeUserStatus = function (userId, profile) {

          var finalUrl = baseURL + "admin/update/" + userId + "/user-profile";
          return $http({
              method: 'PUT',
              url: finalUrl,
              data: {
                  adminApprove: profile.adminApprove,
                  adminNotes: profile.adminNotes,
                  role: profile.role,
                  ptrFormat: profile.ptrFormat,
                  ptrPercent: profile.ptrPercent,
                  distPercent: profile.distPercent
              }
          });
      };

      //service to provide access to vendor
      buyerService.activateVendorStatus = function (userId, status) {

          var finalUrl = baseURL + "admin/" + userId + "/make/active";
          return $http({
              method: 'POST',
              url: finalUrl,
              data: {
                  access: status
              }
          });
      };
      //service to provide access to vendor
      buyerService.updateVendorPermission = function (userId, access, subBrand) {

          var finalUrl = baseURL + "admin/permission/update/" + userId + "/vendor";
          if (subBrand) finalUrl += "?subBrand=" + subBrand;
          return $http({
              method: 'POST',
              url: finalUrl,
              data: {
                  access: access
              }
          });
      };
      //service to get user profile Detials
      buyerService.userprofileDetials = function (userId) {

          var finalUrl = baseURL + "admin/" + userId + "/userprofile";
          return $http({
              method: 'GET',
              url: finalUrl
          });
      };

      //service to get all users list
      buyerService.getMandatesList = function (limit, skip, searchString) {

        var finalUrl = baseURL + "admin/list/mandates";
        if (limit) {
            finalUrl = finalUrl + "?limit=" + limit;
        }
        if (skip) {
            finalUrl = finalUrl + "&skip=" + skip;
        }
        if (searchString) {
            finalUrl = finalUrl + "&str=" + searchString;
        }
        return $http({
            method: 'POST',
            url: finalUrl
        });
      };
      //service to get user profile Detials
      buyerService.saveMandateStatus = function (mandateId, status) {

        var finalUrl = baseURL + "admin/update/" + mandateId + "/"+ status +"/mandate";
        return $http({
            method: 'POST',
            url: finalUrl
        });
    };

      return buyerService;
  }]);