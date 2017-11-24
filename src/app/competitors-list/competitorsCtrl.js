/**
 * USERS LIST PAGE CONTROLLER
 */

app.controller('competitorsCtrl', ["$location", "$scope", "$rootScope", "usersService", "$filter", function ($location, $scope, $rootScope, usersServiceMethods, $filter) {
    
    
        $scope.currentPage = 1;
        $scope.itemsPerPage = 15;
    
        // get users list
        usersServiceMethods.getCompetitorsList().then(function (response) {
            console.log("competitors Data");
            $scope.userList = response.data;
        });
        $scope.search = {
            name: ""
        };
    
        // users list filters
        $scope.resetFilters = function () {
            $scope.search = {
                name: ""
            };
        }
        //modal popup details of the user
        $scope.userDetails = function (userData) {
            // console.log(userData);
            $scope.modalDetials = {};
            angular.copy(userData, $scope.modalDetials);
        }
    
    }]);