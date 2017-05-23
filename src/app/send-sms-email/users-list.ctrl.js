/**
 * SMS EMAIL PAGE CONTROLLER
 */

app.controller('smsEmailCtrl',["$location", "$scope", "$rootScope","smsEmailService","$filter",   function($location, $scope, $rootScope,smsEmailServiceMethods,$filter   ) {


         // get users list
        smsEmailServiceMethods.getUsersList().then(function(response) {
                   var userList = response.data;
                    // console.log( $scope.userList);
                    $scope.usersActiveFilter = $filter('filter')(userList,{ status:"ACTIVE"});
                  
                // angular.forEach($scope.usersActiveFilter,function(value,key){
                //     value.checked[value.id]="false";
                // })
                   
               });

            $scope.checkUncheckFilter = false;
            $scope.search={name:"",role:"",status:""};

            $scope.checkUncheckToggle = function(){
                 
                if ($scope.checkUncheckFilter) {
                    $scope.checkUncheckFilter = true;
                } else {
                    $scope.checkUncheckFilter= false;
                }
                angular.forEach($scope.usersActiveFilter, function (item) {
                    item.checked = $scope.checkUncheckFilter;
                });

            }
            $scope.closeButton = function(){
                  $('#sendBulkSms').modal('toggle');
            }

             //initiate validation and selected data     
            $scope.sendBulkSMS = function(){
               $scope.finalObj = []
                
                angular.forEach($scope.usersActiveFilter, function (item) {
                    if(item.checked == true){
                        $scope.finalObj.push({id:item.id,mobileNumber :item.mobileNumber,email:item.mobileNumber,firstName:item.firstName,lastName:item.lastName});
                    }
                    
                });
                console.log($scope.finalObj)
                if($scope.finalObj.length == 0){
                    $.notify({  title: '<strong>Warning!</strong>',
                                message: "Select atlease once recipient"
                             },{
                              type: 'warning'
                           });
                }else{
                    $('#sendBulkSms').modal('toggle');
                }
             }
             
             //send bulk SMS functionality
             $scope.triggerSMS= function(message){
                  $('#sendBulkSms').modal('toggle');
                 smsEmailServiceMethods.sendSMS($scope.finalObj,message).then(function(response) {
                                if(response.status == 200){
                                   
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