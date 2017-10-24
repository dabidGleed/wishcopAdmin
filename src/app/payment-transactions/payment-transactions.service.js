  /**
   *PAYMENT TRANSACTIONS  PAGE SERVICE
   */

  app.factory('paymentTransactionsService', ['$http', 'globalVars', function ($http, globalVars) {
      var paymentTransactionsServiceMethods = {};
      var baseURL = globalVars.baseURL;
      var userId = globalVars.userData.userId;

      //service to get all payment transactions list
      paymentTransactionsServiceMethods.getTransactionsList = function (page, searchData) {
          var query = "";
          if (searchData.status == "") {
              query = "";
          } else {
              query = "&paymentStatus="+searchData.status;
          }

          var finalUrl = baseURL + "admin/payment/listTransactions?limit=15&sort=createdAt&skip=" + page + query;
          return $http({
              method: 'GET',
              url: finalUrl
              // data: dataObj,
              // headers:  
          })
      };

      //service to update status
      paymentTransactionsServiceMethods.updateView = function (id) {
          var finalUrl = baseURL + "admin/payment/updateToRead";
          return $http({
              method: 'PUT',
              url: finalUrl,
              data: {
                  "ids": [id]
              }
              // headers:  
          })
      };



      return paymentTransactionsServiceMethods;
  }])