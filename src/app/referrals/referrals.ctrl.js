/**
 * USERS REFERRALS LIST PAGE CONTROLLER
 */

app.controller('referralsListCtrl',["$location", "$scope", "$rootScope","referralsService","$filter",   function($location, $scope, $rootScope,referralsServiceMethods,$filter   ) {


         // get users referrals list
        referralsServiceMethods.getUsersList().then(function(response) {
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

           

}]);