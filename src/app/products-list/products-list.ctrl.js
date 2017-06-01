/**
 * PRODUCTS LIST PAGE CONTROLLER
 */

app.controller('productsListCtrl',["$location", "$scope", "$rootScope","productsService","$sce","$filter",   function($location, $scope, $rootScope,productsServiceMethods,$sce,$filter   ) {

    productsServiceMethods.getProductsList().then(function(response) {
                $scope.productsList = response.data;
                angular.forEach($scope.productsList,function(value,key){
                    value.htmlDesc=$sce.trustAsHtml(value.description);
                    
                    })
              
         
            });
    
  
     productsServiceMethods.getVendorsList().then(function(response) {
            $scope.vendorList = response.data;
            
        });

     $scope.search={name:"",vendor:"",status:""};

            // users list filters
            $scope.resetFilters = function(){
                 $scope.search={name:"",vendor:"",status:""};
      }

       $scope.$watch("search.vendor", function() {
                   
                   if($scope.search.vendor == null){$scope.search.vendor="";} 
                });
  
      //modal popup details of the Product
            $scope.productDetails= function(productData){
                
                $scope.modalDetials ={};
                angular.copy(productData, $scope.modalDetials);
                 if("review" in $scope.modalDetials){
                         $scope.modalDetials.starRatings = $scope.modalDetials.review.avg_rating;
                  }else{$scope.modalDetials.starRatings = 0 ;}
            }
     
            
         //change Product status
        $scope.changeProductStatus = function(modaldetails){
                    $('#productDetails').modal('hide');
                    var data ={reasonToBlock:modaldetails.reason};
                $scope.filterData = $filter('filter')($scope.productsList,{ id:modaldetails.id});
                if($scope.filterData[0].id == modaldetails.id &&  modaldetails.status == "DELETED" && modaldetails.status != $scope.filterData[0].status){
                    productsServiceMethods.blockProduct(modaldetails.id,data).then(function(response) {
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
                
                }else if($scope.filterData[0].id == modaldetails.id &&  modaldetails.status == "ACTIVE" && modaldetails.status != $scope.filterData[0].status){
                    productsServiceMethods.activeProduct(modaldetails.id).then(function(response) {
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

                   
                }else{
                     $.notify({
                                                title: '<strong>Unsuccessful!</strong>',
                                                message: "Action cannot be performed"
                                            },{
                                                type: 'warning'
                                            });

                }
                        
             };

            $scope.changesStatus= function(modaldetails){
                  $scope.filterData = $filter('filter')($scope.productsList,{ id:modaldetails.id});
                    if( $scope.filterData[0].status == modaldetails.status){
                        $scope.showData = false;
                    }else{
                        $scope.showData = true;
                    }
           }

}]);