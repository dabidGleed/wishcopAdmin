/**
 * ORDERS PAGE CONTROLLER
 */

app.controller('ordersCtrl', ["$location", "$scope", "$rootScope", "ordersService", "$filter", function ($location, $scope, $rootScope, ordersServiceMethods, $filter) {

    $scope.currentPage = 1;
    $scope.itemsPerPage = 15;
    $scope.totalCount = 0;
    $scope.DeliveredDa = [];
    $scope.search = { 
        name: ""
    };
    $scope.localSearch = { 
        name: ""
    };

    // get account transfers list
    $scope.getTransactionsList = function (data,searchData) {
        NProgress.start();
        ordersServiceMethods.getTransactionsList(data,searchData).then(function (response) {
            $scope.userList = response.data.orders;
            $scope.totalCount = response.data.count;
            NProgress.done();
        });

    }
    $scope.getTransactionsList(0,$scope.localSearch);
    
      
    $scope.pageChanged = function (newPage) {
        var pageDataList = (newPage-1)*($scope.itemsPerPage);
        $scope.getTransactionsList(pageDataList,$scope.localSearch);
    };
    // users list filters
    $scope.resetFilters = function () {
        $scope.search = { 
            name: ""
        };
        $scope.localSearch = { 
        name: ""
    };
    $scope.getTransactionsList(0,$scope.localSearch);
    }
    //modal popup details of the Transactions
    $scope.userDetails = function (orderId,saleId) {
        $scope.saleData = {};
        //  $scope.filterData = $filter('filter')($scope.userList, {
        //     id: userData.id
        // });
         ordersServiceMethods.getOrderDetails(orderId,saleId).then(function(data, status) {
            $scope.saleData = data.data;
            //$scope.trackStatus($scope.saleData);
            // console.log( $scope.saleData);
            angular.forEach($scope.saleData.sales.products, function (item1) {
               item1.trackingStatus=0;
                angular.forEach(item1.variant, function (item2) {
                    item2.trackListNew ={ORDER_RECEIVED:[],ORDER_APPROVED:[],ORDER_SHIPPED:[],ORDER_DELIVERED:[],ORDER_CANCELED:[]}
                    angular.forEach(item2.trackList, function (item3) {
                                  if(item3.status == "ORDER_RECEIVED"){
                                      item2.trackListNew.ORDER_RECEIVED.push(item3);
                                  }
                                  if(item3.status == "ORDER_APPROVED"){
                                      item2.trackListNew.ORDER_APPROVED.push(item3);
                                  }
                                  if(item3.status == "ORDER_SHIPPED"){
                                      item1.trackingStatus ++ ;
                                      item2.trackListNew.ORDER_SHIPPED.push(item3);
                                  }
                                  if(item3.status == "ORDER_DELIVERED"){
                                      item2.trackListNew.ORDER_DELIVERED.push(item3);
                                  }
                                  if(item3.status == "ORDER_CANCELED"){
                                      item2.trackListNew.ORDER_CANCELED.push(item3);
                                  }
                            
                    })
                })
                    
                
           });
        })  
        // $scope.modalDetials = {};
        // angular.copy(userData, $scope.modalDetials);
    }
   
   $scope.confirmDeliveryStatus= function(varientId, orderItemId, orderId, saleId){
          $scope.deliveryData = {};
          $scope.deliveryData.varientId =varientId;
          $scope.deliveryData.orderItemId =orderItemId;
          $scope.deliveryData.orderId =orderId;
          $scope.deliveryData.saleId =saleId;
        swal({
                title: "Are you sure?",
                text: "You want to update status to Delivered!",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Yes",
                cancelButtonText: "Cancel",
                closeOnConfirm: true,
                closeOnCancel: true
            },
            function (isConfirm) {
                if (isConfirm) {
                   
                    ordersServiceMethods.updateOrderDelivery(varientId, orderItemId, orderId, saleId).then(function (response) {
                        if (response.status == 200) {
                             $scope.userDetails(orderId,orderItemId);
                            $.notify({
                                title: '<strong>Success!</strong>',
                                message: response.data.message
                            }, {
                                type: 'success'
                            });
                        } else {
                            $scope.userDetails(orderId,orderItemId);
                            $.notify({
                                title: '<strong>Unsuccessful!</strong>',
                                message: response.data.message
                            }, {
                                type: 'danger'
                            });
                        }

                    });

                } else {
                  
                }
            });
             
        }


   $scope.applyFilters = function(searchData){
       angular.copy(searchData, $scope.localSearch);
       $scope.getTransactionsList(0,$scope.localSearch);

   }
}]);