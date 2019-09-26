  /**
   *ORDERS  PAGE SERVICE
   */

  app.service('ordersService', function ($http, globalVars) {
      var ordersServiceMethods = {};
      var baseURL = globalVars.baseURL;

      //service to get all payment transactions list
      ordersServiceMethods.getTransactionsList = function (page, searchData) {
          var query = "";
          if (!!searchData.name) {
              query = "&searchString=" + searchData.name;
          }
          if (!!searchData.buyer) {
              query += "&userId=" + searchData.buyer.id;
          }
          var finalUrl = baseURL + "admin/list/all/orders?limit=30&sort=orderDate DESC&skip=" + page + query;
          return $http({
              method: 'GET',
              url: finalUrl
          });
      };
      ordersServiceMethods.getDistributorOrdersList = function (page, searchData) {
          var query = "";
          if (searchData.name != "") {
              query = "&searchString=" + searchData.name;
          }

          if (searchData.vendor != "") {
              query = "&vendorId=" + searchData.vendor.id;
          }
          var finalUrl = baseURL + "admin/list/distributor/orders?limit=15&sort=orderDate DESC&skip=" + page + query;
          return $http({
              method: 'GET',
              url: finalUrl
          });
      };
      ordersServiceMethods.getVendorsList = function (type) {

          var finalUrl = baseURL + "admin/vendor/list";
          if (type) {
              finalUrl = baseURL + "admin/vendor/list?type=DISTRIBUTOR";
          }
          return $http({
              method: 'GET',
              url: finalUrl
          });
      };
      ordersServiceMethods.getBuyersList = function (type) {

        var finalUrl = baseURL + "admin/buyer/list?admin=true";
        return $http({
            method: 'GET',
            url: finalUrl
        });
    };
      ordersServiceMethods.getDistributorsList = function (vendorId) {

          var finalUrl = baseURL + "admin/get/" + vendorId + "/distributors/list";
          return $http({
              method: 'GET',
              url: finalUrl
          });
      };
      ordersServiceMethods.addDistributor = function (vendorId, data) {
          var finalUrl = baseURL + "admin/create/" + vendorId + "/distributor";
          return $http({
              method: 'POST',
              url: finalUrl,
              data: data
          });
      };
      ordersServiceMethods.generateDistributorInvoice = function (orderId, data) {
          var finalUrl = baseURL + "admin/generate/" + orderId + "/distributors/invoice";
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

      //service to download Invoice
      ordersServiceMethods.downloadInvoice = function (orderId) {
        var finalUrl = baseURL + 'orders/' + orderId + '/download-invoices';
        return $http.get(finalUrl, {
            responseType: 'arraybuffer' 
        });
      };
      ordersServiceMethods.sendInvoice = function (orderId) {
        return $http.get(globalVars.baseURL + 'orders/' + orderId + '/send/invoice/email');
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
      ordersServiceMethods.updateOrderDetails = function (orderId, order) {
          var finalUrl = baseURL + "order/update/" + orderId + "/invoice-details";
          return $http({
              method: 'POST',
              url: finalUrl,
              data: order
          });
      };
      ordersServiceMethods.uploadImage = function (url, name) {
        return $http({
            method: "POST",
            url: globalVars.baseURL + 'file/base64/upload',
            data: {
                imgbase64: url,
                filename: name
            },
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + globalVars.userData.uId }
        });
    };
      return ordersServiceMethods;
  });
