  /**
   *ORDERS  PAGE SERVICE
   */

  app.service('ordersService', function ($http, globalVars) {
      var ordersServiceMethods = {};
      var baseURL = globalVars.baseURL;
      var userId = globalVars.userData.userId;

      //service to get all payment transactions list
      ordersServiceMethods.getTransactionsList = function (page, searchData) {
          var query = "";
          if (searchData.name != "") {
              query = "&searchString=" + searchData.name;
          }

          if (searchData.vendor != "") {
              query = "&vendorId=" + searchData.vendor.id;
          }
          var finalUrl = baseURL + "admin/list/all/orders?limit=15&sort=createdAt DESC&skip=" + page + query;
          return $http({
              method: 'GET',
              url: finalUrl
          });
      };
      ordersServiceMethods.getVendorsList = function (type) {

          var finalUrl = baseURL + "admin/vendor/list";
          if(type){
            finalUrl = baseURL + "admin/vendor/list?type=DISTRIBUTOR";
          }
          return $http({
              method: 'GET',
              url: finalUrl
          });
      };
      ordersServiceMethods.getDistributorsList = function (vendorId) {

          var finalUrl = baseURL + "admin/get/"+vendorId+"/distributors/list";
          return $http({
              method: 'GET',
              url: finalUrl
          });
      };
      ordersServiceMethods.addDistributor = function(vendorId, data){
          var finalUrl = baseURL + "admin/create/"+vendorId+"/distributor";
          return $http({
            method: 'POST',
            url: finalUrl,
            data: data
        });
      };
      ordersServiceMethods.generateDistributorInvoice = function(orderId, data){
        var finalUrl = baseURL + "admin/generate/"+orderId+"/distributors/invoice";
        return $http({
          method: 'POST',
          url: finalUrl,
          data: data
      });
    };
      //service to get order Details
      ordersServiceMethods.getOrderDetails = function (orderId, saleId) {
          var finalUrl = baseURL + 'orders/' + orderId + '/' + saleId + '/trackorder';
          return $http({
              method: 'GET',
              url: finalUrl
          });
      };

      //service to update status
      ordersServiceMethods.updateView = function (id) {
          var finalUrl = baseURL + "admin/payment/updateToRead";
          return $http({
              method: 'PUT',
              url: finalUrl,
              data: {
                  "ids": [id]
              }
          });
      };

      //service to update to order delivery
      ordersServiceMethods.updateOrderDelivery = function (varientId, orderItemId, orderId, saleId) {
          var finalUrl = baseURL + "admin/" + orderId + "/updateto/delivered";
          var variendData = [];
          variendData[0] = varientId;
          return $http({
              method: 'POST',
              url: finalUrl,
              data: {
                  orderItemId: orderItemId,
                  saleId: saleId,
                  status: "ORDER_DELIVERED",
                  variants: variendData
              }
          });
      };
      return ordersServiceMethods;
  });
