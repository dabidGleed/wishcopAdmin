  /**
   * PRODUCTS LIST PAGE SERVICE
   */

  app.factory('productsService', ['$http', 'globalVars', function ($http, globalVars) {
      var productsServiceMethods = {};
      var baseURL = globalVars.baseURL;
      //service to get all products list
      productsServiceMethods.getProductsList = function (page, searchData) {
          var query = "";
          if (searchData.name != "") {
              query += "&str=" + searchData.name;
          }

          if (searchData.vendor != "") {
              query += "&vendorId=" + searchData.vendor;
          }
          if (searchData.status != "") {
              query += "&status=" + searchData.status;
          }
          var finalUrl = baseURL + "admin/list/products?limit=16&skip=" + page + query;
          return $http({
              method: 'POST',
              url: finalUrl
              // data: dataObj,
              // headers:
          });
      };

      productsServiceMethods.getVendorsList = function () {

          var finalUrl = baseURL + "admin/vendor/list";
          return $http({
              method: 'GET',
              url: finalUrl
              // data: dataObj,
              // headers:
          });
      };
      productsServiceMethods.bulkUpload = function (file, data) {

          console.log(file);
          var finalUrl = baseURL + "products/upload/" + data.vendor + "/bulk";
          if(data.subVendor){
            finalUrl = finalUrl + "?subBrand="+ data.subVendor;
          }
          
          var fd = new FormData();
          fd.append('content', file);
          return $http.post(finalUrl, fd, {
              transformRequest: angular.identity,
              headers: {
                  'Content-Type': undefined
              }
          });

      };

      productsServiceMethods.blockProduct = function (productID, dataObj) {

          var finalUrl = baseURL + "admin/" + productID + "/block/product";
          return $http({
              method: 'POST',
              url: finalUrl,
              data: dataObj
              // headers:
          });
      };

      productsServiceMethods.activeProduct = function (productID) {

          var finalUrl = baseURL + "admin/" + productID + "/active/product";
          return $http({
              method: 'POST',
              url: finalUrl
              // data: dataObj,
              // headers:
          });
      };
      productsServiceMethods.addProductPrices = function (productID, data) {

          var finalUrl = baseURL + "products/" + productID + "/add/prices";
          return $http({
              method: 'POST',
              url: finalUrl,
              data: data
              // headers:
          });
      };


      return productsServiceMethods;
  }]);
