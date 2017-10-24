/**
 * CATEGORY PAGE CONTROLLER
 */

app.controller('categoryCtrl', ["$location", "$scope", "$rootScope", "categoryService", "$filter", function ($location, $scope, $rootScope, categoryServiceMethods, $filter) {

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

    $scope.addCategory = function (data) {

        categoryServiceMethods.addCategory(data).then(function (response) {
            if (response.status == 200) {
                $scope.add = {};
                $scope.categoryForm.$setPristine();
                $scope.categoryForm.$setUntouched();
                $scope.getCategoryList();

                $.notify({
                    title: '<strong>Success!</strong>',
                    message: "Category added"
                }, {
                    type: 'success'
                });
            } else {
                $scope.getCategoryList();
                $.notify({
                    title: '<strong>Unsuccessful!</strong>',
                    message: "Category not added"
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

        categoryServiceMethods.updateCategory(data).then(function (response) {
            if (response.status == 200) {
                $scope.edit = {};
                $scope.editCategoryPage = false;
                $scope.editCategoryForm.$setPristine();
                $scope.editCategoryForm.$setUntouched();
                $scope.getCategoryList();

                $.notify({
                    title: '<strong>Success!</strong>',
                    message: "Category updated"
                }, {
                    type: 'success'
                });
            } else {
                $scope.getCategoryList();
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
                text: "You want to delete category!",
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
                    categoryServiceMethods.deleteCategory(data).then(function (response) {
                        if (response.status == 200) {
                            $scope.getCategoryList();
                            $.notify({
                                title: '<strong>Success!</strong>',
                                message: response.data.message
                            }, {
                                type: 'success'
                            });
                        } else {
                            $scope.getCategoryList();
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