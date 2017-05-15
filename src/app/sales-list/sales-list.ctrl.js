/**
 * SALES LIST PAGE CONTROLLER
 */

app.controller('salesListCtrl',["$location", "$scope", "$rootScope","salesService","$filter",   function($location, $scope, $rootScope,salesServiceMethods,$filter   ) {

        salesServiceMethods.getSalesList().then(function(response) {
                    $scope.salesList = response.data;
                    angular.forEach($scope.salesList,function(value,key){
                    value.percentageFinalSalePrice=calculatePercentageDiscount(value.total_price,value.discount_percentage );

                    })

                });

       salesServiceMethods.getVendorsList().then(function(response) {
            $scope.vendorList = response.data;

        });


            $scope.search={name:"",vendor:undefined,status:""};

            // users list filters
            $scope.resetFilters = function(){
                 $scope.search={name:"",vendor:undefined,status:""};
            }

             //modal popup details of the Sale
            $scope.saleDetails= function(saleData){
                // console.log(userData);
                $scope.modalDetials ={};
                angular.copy(saleData, $scope.modalDetials);
            }



     calculatePercentageDiscount = function(price, perecentage){
         return (price-((perecentage/100)*price).toFixed(2));
        };

        $scope.discountExists = function(priceDiscount){
          if(priceDiscount > 0){
            return true;
          }else {
            return false;
          }
        }

        $scope.blockSaleConfirm = function(sales){
                 var result = confirm("Confirm Block?");
            if (result) {
                //Logic to delete the item
                $scope.blockSale(sales);
            }

        }



         //block sale
        $scope.blockSale = function(modaldetails){
                    $('#confirmBlock').modal('hide');
                $scope.filterData = $filter('filter')($scope.salesList,{ id:modaldetails.id});
                if($scope.filterData[0].id == modaldetails.id){
                    salesServiceMethods.blockSale(modaldetails.id).then(function(response) {
                                if(response.status == 200){
                                    $scope.filterData[0].status = modaldetails.status;

                                        $.notify({
                                                title: '<strong>Success!</strong>',
                                                message: response.data.message
                                            },{
                                                type: 'success'
                                            });
                                }else{
                                    $.notify({
                                                title: '<strong>Unsuccessful!</strong>',
                                                message: response.data.message
                                            },{
                                                type: 'danger'
                                            });
                               }
                          });

                }

             }


}]);
