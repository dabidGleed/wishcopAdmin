  /**
   * PAYMENT GATEWAY PAGE SERVICE
   */

  app.factory('paymentGatewayService', ['$http', 'globalVars', function ($http, globalVars) {
      var paymentGatewayServiceMethods = {};
      var baseURL = globalVars.baseURL;

      //service to get all payment gateways list
      paymentGatewayServiceMethods.getPaymentGatwayslist = function () {

          var finalUrl = baseURL + "admin/payment/gateway/list"
          return $http({
              method: 'POST',
              url: finalUrl
              // data: dataObj,
              // headers:  
          })
      };

      //service to update payment gateway
      paymentGatewayServiceMethods.updatePaymentGatwayslist = function (id) {

          var finalUrl = baseURL + "admin/payment/gateway/" + id + "/update"
          return $http({
              method: 'POST',
              url: finalUrl
              // data: dataObj,
              // headers:  
          })
      };

      return paymentGatewayServiceMethods;
  }])