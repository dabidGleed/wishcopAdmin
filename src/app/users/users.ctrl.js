/**
 * USERS LIST PAGE CONTROLLER
 */

app.controller('usersListCtrl',["$location", "$scope", "$rootScope","usersService","$filter",   function($location, $scope, $rootScope,usersServiceMethods,$filter   ) {

          
          $scope.currentPage = 1;
          $scope.itemsPerPage = 15;
         // get users list
        usersServiceMethods.getUsersList().then(function(response) {
                    $scope.userList = response.data;
               });
            $scope.search={name:"",role:"",status:""};

            // users list filters
            $scope.resetFilters = function(){
                 $scope.search={name:"",role:"",status:""};
            }
            //modal popup details of the user
            $scope.userDetails= function(userData){
                // console.log(userData);
                $scope.modalDetials ={};
                angular.copy(userData, $scope.modalDetials);
            }

            $scope.saveStatus = function(modaldetails){
                    $('#userData').modal('hide');
                $scope.filterData = $filter('filter')($scope.userList,{ id:modaldetails.id});
                if($scope.filterData[0].status == modaldetails.status){
                
                }else{ 
                        if(modaldetails.status == "ACTIVE"){
                        usersServiceMethods.activeUserStatus(modaldetails.id).then(function(response) {
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
                        if(modaldetails.status == "DELETED"){
                        
                            usersServiceMethods.deleteUserStatus(modaldetails.id).then(function(response) {
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
             };

}]);