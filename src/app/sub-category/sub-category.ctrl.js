/**
 * SUB CATEGORY PAGE CONTROLLER
 */

app.controller('subCategoryCtrl', ["$location", "$scope", "$rootScope", "subCategoryService","categoryService", "$filter", function ($location, $scope, $rootScope, subCategoryServiceMethods,categoryServiceMethods, $filter) {

    $scope.currentPage = 1;
    $scope.itemsPerPage = 15;
    $scope.add = {};
    $scope.edit = {};
    $scope.editCategoryPage = false;

    // get categories list
    $scope.getCategoryList = function () {
        categoryServiceMethods.getCategoryList().then(function (response) {
            $scope.categoryList = response.data;
        });
    }

    $scope.getCategoryList();

    // get categories list
    $scope.getSubCategoryList = function () {
        subCategoryServiceMethods.getCategoryList().then(function (response) {
            $scope.subCategoryList = response.data;
        });

    }

    $scope.getSubCategoryList();

    $scope.addCategory = function (data) {
   
        subCategoryServiceMethods.addCategory(data).then(function (response) {
            if (response.status == 200) {
                $scope.add = {};
                $scope.categoryForm.$setPristine();
                $scope.categoryForm.$setUntouched();
                $scope.getSubCategoryList();

                $.notify({
                    title: '<strong>Success!</strong>',
                    message: "Sub Category added"
                }, {
                    type: 'success'
                });
            } else {
                $scope.getSubCategoryList();
                $.notify({
                    title: '<strong>Unsuccessful!</strong>',
                    message: "Sub Category not added"
                }, {
                    type: 'danger'
                });
            }

        });
    }

    $scope.editCategory = function (data) {
        $scope.editCategoryPage = true;
        angular.copy(data, $scope.edit);
        $('html, body').animate({
            scrollTop: $('#editcategroy').offset().top
        }, 'slow');
    }

    $scope.editCategoryCancel = function () {
        $scope.editCategoryPage = false;
        $scope.edit = {};
    }

    $scope.updateCategory = function (data) {
       
        subCategoryServiceMethods.updateCategory(data).then(function (response) {
            if (response.status == 200) {
                $scope.edit = {};
                $scope.editCategoryPage = false;
                $scope.editCategoryForm.$setPristine();
                $scope.editCategoryForm.$setUntouched();
                $scope.getSubCategoryList();

                $.notify({
                    title: '<strong>Success!</strong>',
                    message: "Category updated"
                }, {
                    type: 'success'
                });
            } else {
                $scope.getSubCategoryList();
                $.notify({
                    title: '<strong>Unsuccessful!</strong>',
                    message: "Category not updated"
                }, {
                    type: 'danger'
                });
            }

        });
    }

    $scope.deleteCategory = function (data) {
        swal({
                title: "Are you sure?",
                text: "You want to delete sub category!",
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
                    subCategoryServiceMethods.deleteCategory(data).then(function (response) {
                        if (response.status == 200) {
                            $scope.getSubCategoryList();
                            $.notify({
                                title: '<strong>Success!</strong>',
                                message: response.data.message
                            }, {
                                type: 'success'
                            });
                        } else {
                            $scope.getSubCategoryList();
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
 
}]);