/**
 * USERS REFERRALS SETTINGS PAGE CONTROLLER
 */

app.controller('referralsSettingsCtrl',["$location", "$scope", "$rootScope","referralSettingsService","$filter",   function($location, $scope, $rootScope,referralSettingsServiceMethods,$filter   ) {
         
          $scope.currentPage = 1;
          $scope.itemsPerPage = 15;

         // get referrals settings data
         function initialLoad(){
               referralSettingsServiceMethods.getReferrals().then(function(response) {
                    $scope.getReferrals = response.data;
               });

         }
           initialLoad();
       
            // update referral settings
            $scope.update = function(){
               if(angular.isNumber($scope.getReferrals[0].expires_in) && angular.isNumber($scope.getReferrals[0].cashBackPercentage)){
                   var data = {"cashBackPercentage":$scope.getReferrals[0].cashBackPercentage,"expires_in": $scope.getReferrals[0].expires_in};
                    referralSettingsServiceMethods.updateReferrals(data,$scope.getReferrals[0].id).then(function(response) {
                       if (response.status == 200) {

                            $.notify({
                                title: '<strong>Success!</strong>',
                                message: response.data.message
                            }, {
                                type: 'success'
                            });
                         
                        } else {
                            $.notify({
                                title: '<strong>Unsuccessful!</strong>',
                                message: response.data.message
                            }, {
                                type: 'danger'
                            });
                             
                        }
                       initialLoad();
                    });
                }else{
                    $.notify({
                                title: '<strong>Unsuccessful!</strong>',
                                message: "Enter valid data"
                            }, {
                                type: 'danger'
                            });
                    
                    
                }

            };

}]);