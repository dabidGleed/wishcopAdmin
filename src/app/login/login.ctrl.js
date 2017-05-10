/**
 * LOGIN PAGE CONTROLLER
 */

app.controller('loginPageCtrl', function($location,$state, $scope, $rootScope) {

    $rootScope.hideLeftMenu = true;
    $rootScope.hideTopMenu = true;
    $rootScope.showFooter = false;

console.log("hi");
    $scope.goToDashboard = function(user){
          $('#form-validation').validate({
            submit: {
                settings: {
                    inputContainer: '.form-group',
                    errorListClass: 'form-control-error',
                    errorClass: 'has-danger'
                }
            }
        });
        console.log(user);
 

         $state.go("main.dashboard",{},{reload:true})
     console.log("BYE");
    }

}); 