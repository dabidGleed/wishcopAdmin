/**
 * PRODUCTS LIST PAGE CONTROLLER
 */

app.controller('productsListCtrl', ["$location", "$scope", "$rootScope", "productsService", "$sce", "$filter", function ($location, $scope, $rootScope, productsServiceMethods, $sce, $filter) {
    $scope.currentPage = 1;
    $scope.itemsPerPage = 16;
    $scope.totalCount = 0;
    $scope.subVendor = false;
    $scope.bulk = {
        vendor:""
    };
    $scope.search = {
        name: "",
        vendor: "",
        status: ""
    };
    $scope.localSearch = {
        name: "",
        vendor: "",
        status: ""
    };
    $scope.getProductsList = function (data, searchData) {
        NProgress.start();
        productsServiceMethods.getProductsList(data, searchData).then(function (response) {
            $scope.productsList = response.data.products;
            $scope.totalCount = response.data.count;
            angular.forEach($scope.productsList, function (value, key) {
                value.htmlDesc = $sce.trustAsHtml(value.description);
            })
            NProgress.done();
        });
    }
    $scope.getProductsList(0, $scope.localSearch);
    productsServiceMethods.getVendorsList().then(function (response) {
        if(response.data){
            $scope.vendorList = [];
            angular.forEach(response.data, function (value, key) {
                if(value.profile){
                    $scope.vendorList.push(value);
                    value.name = value.firstName +" " +value.lastName + ", "+ value.profile.companyName;
                }
                
            })
            // $scope.vendorList = response.data;
        }
        

    });



    // users list filters
    $scope.resetFilters = function() {
        $scope.search = {
            name: "",
            vendor: "",
            status: ""
        };
    }
    $scope.pageChanged = function(newPage) {
        var pageDataList = (newPage - 1) * ($scope.itemsPerPage);
        $scope.getProductsList(pageDataList, $scope.localSearch);
    };
    $scope.$watch("search.status", function() {

        if ($scope.search.status == null) {
            $scope.search.status = "";
        }
        angular.copy($scope.search, $scope.localSearch);
        $scope.getProductsList(0, $scope.localSearch);

    });

    $scope.$watch("search.vendor", function() {
        if ($scope.search.vendor == null) {
            $scope.search.vendor = "";
        }
        angular.copy($scope.search, $scope.localSearch);
        $scope.getProductsList(0, $scope.localSearch);
    });
    $scope.$watch("search.name", function () {
        $scope.search.vendor = "";
        angular.copy($scope.search, $scope.localSearch);
        $scope.getProductsList(0, $scope.localSearch);
    });
    $scope.$watch("bulk.vendor", function () {
        if ($scope.bulk.vendor != "" && $scope.bulk.vendor != null) {
            var vendor = $filter('filter')($scope.vendorList, { id: $scope.bulk.vendor })[0];
            $scope.subVendor = false;
            $scope.subBrands = [];
            if (vendor.profile) {
                if (vendor.profile.subBrands) {
                    $scope.subVendor = true;
                    $scope.subBrands = vendor.profile.subBrands;
                }
            }
        }
    });
    //modal popup details of the Product
    $scope.productDetails = function(productData) {

        $scope.modalDetials = {};
        angular.copy(productData, $scope.modalDetials);
        if ("review" in $scope.modalDetials) {
            $scope.modalDetials.starRatings = $scope.modalDetials.review.avg_rating;
        } else {
            $scope.modalDetials.starRatings = 0;
        }
    }


    //change Product status
    $scope.changeProductStatus = function(modaldetails) {
        $('#productDetails').modal('hide');
        var data = {
            reasonToBlock: modaldetails.reason
        };
        $scope.filterData = $filter('filter')($scope.productsList, {
            id: modaldetails.id
        });
        if ($scope.filterData[0].id == modaldetails.id && modaldetails.status == "DELETED" && modaldetails.status != $scope.filterData[0].status) {
            productsServiceMethods.blockProduct(modaldetails.id, data).then(function(response) {
                if (response.status == 200) {
                    $scope.filterData[0].status = modaldetails.status;

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
            });

        } else if ($scope.filterData[0].id == modaldetails.id && modaldetails.status == "ACTIVE" && modaldetails.status != $scope.filterData[0].status) {
            productsServiceMethods.activeProduct(modaldetails.id).then(function(response) {
                if (response.status == 200) {
                    $scope.filterData[0].status = modaldetails.status;

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
            });


        } else {
            $.notify({
                title: '<strong>Unsuccessful!</strong>',
                message: "Action cannot be performed"
            }, {
                    type: 'warning'
                });

        }

    };

    $scope.changesStatus = function(modaldetails) {
        $scope.filterData = $filter('filter')($scope.productsList, {
            id: modaldetails.id
        });
        if ($scope.filterData[0].status == modaldetails.status) {
            $scope.showData = false;
        } else {
            $scope.showData = true;
        }
    }

    $scope.export = function (id) {
        NProgress.start();
        //print all vendors data

        if ($scope.search.vendor == "") {
            var data = [];

            angular.forEach($scope.vendorList, function(value, key) {
                if (value.profile.companyName == undefined) {
                    value.profile.companyName = '';
                }
                if (value.profile.aboutCompany == undefined) {
                    value.profile.aboutCompany = '';
                }
                var tableData = {
                    style: 'tableExample',
                    table: {
                        // headers are automatically repeated if the table spans over multiple pages
                        // you can declare how many rows should be treated as headers
                        headerRows: 1,
                        widths: [60, 'auto', 80],

                        body: [
                            [{
                                text: 'S.NO',
                                style: 'tableheader'
                            }, {
                                text: 'Product Name',
                                style: 'tableheader'
                            }, {
                                text: 'Price',
                                style: 'tableheader'
                            }]
                        ]
                    }
                };
                data.push({
                    text: 'Vendor Name : ' + value.firstName + value.lastName,
                    style: 'subheader'
                });
                data.push({
                    text: 'Company : ' + value.profile.companyName,
                    style: 'title'
                });
                data.push({
                    text: 'About Company : ' + value.profile.aboutCompany,
                    style: 'title'
                });

                $scope.pdfFilterData = $filter('filter')($scope.productsList, {
                    owner: value.id
                });
                angular.forEach($scope.pdfFilterData, function(value1, key1) {
                    value1.sno = key1 + 1;
                    tableData.table.body.push([{
                        text: (value1.sno).toString(),
                        style: 'title'
                    }, {
                        text: value1.title,
                        style: 'title'
                    }, {
                        text: " ₹​" + value1.price,
                        style: 'title'
                    }])

                });
                data.push(tableData);

            });

            var docDefinition = {

                content: data,
                pageSize: 'A4',
                // by default we use portrait, you can change it to landscape if you wish
                pageOrientation: 'potrait',
                // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
                pageMargins: [40, 60, 40, 60],
                styles: {
                    header: {
                        fontSize: 20,
                        bold: true,
                        margin: [50, 10, 10, 20]
                    },
                    title: {
                        italic: false,
                        alignment: 'left',
                        fontSize: 12,
                    },
                    tableheader: {
                        fontSize: 14,
                        alignment: 'center',
                        bold: true,
                    },
                    subheader: {
                        fontSize: 16,
                        bold: true,
                        margin: [0, 10, 0, 5]
                    },
                    tableExample: {
                        margin: [0, 5, 0, 15]
                    }
                }
            };

            pdfMake.createPdf(docDefinition).download(new Date().getTime() + ".pdf");

        } else {

            $scope.vendorDetails = $filter('filter')($scope.vendorList, {
                id: id
            });
            if ($scope.vendorDetails[0].profile.companyName == undefined) {
                $scope.vendorDetails[0].profile.companyName = '';
            }
            if ($scope.vendorDetails[0].profile.aboutCompany == undefined) {
                $scope.vendorDetails[0].profile.aboutCompany = '';
            }
            var data = [{
                text: 'Company : ' + $scope.vendorDetails[0].profile.companyName,
                style: 'title'
            },
            {
                text: 'About Company : ' + $scope.vendorDetails[0].profile.aboutCompany,
                style: 'title'
            },
            {
                style: 'tableExample',
                table: {
                    // headers are automatically repeated if the table spans over multiple pages
                    // you can declare how many rows should be treated as headers
                    headerRows: 1,
                    widths: [60, 'auto', 80],

                    body: [
                        [{
                            text: 'S.NO',
                            style: 'tableheader'
                        }, {
                            text: 'Product Name',
                            style: 'tableheader'
                        }, {
                            text: 'Price',
                            style: 'tableheader'
                        }]
                    ]
                }
            }
            ];

            $scope.pdfFilterData = $filter('filter')($scope.productsList, {
                owner: id
            });

            angular.forEach($scope.pdfFilterData, function(value, key) {
                value.sno = key + 1;
                data[2].table.body.push([{
                    text: (value.sno).toString(),
                    style: 'title'
                }, {
                    text: value.title,
                    style: 'title'
                }, {
                    text: " ₹​" + value.price,
                    style: 'title'
                }])

            });

            var docDefinition = {
                header: [{
                    text: 'Vendor Name :' + $scope.vendorDetails[0].firstName + $scope.vendorDetails[0].lastName,
                    style: 'header'
                }],
                content: data,
                pageSize: 'A4',
                // by default we use portrait, you can change it to landscape if you wish
                pageOrientation: 'potrait',
                // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
                pageMargins: [40, 60, 40, 60],
                styles: {
                    header: {
                        fontSize: 20,
                        bold: true,
                        margin: [50, 10, 10, 20]
                    },
                    title: {
                        italic: false,
                        alignment: 'left',
                        fontSize: 12,
                    },
                    tableheader: {
                        fontSize: 14,
                        alignment: 'center',
                        bold: true,
                    },
                    tableExample: {
                        margin: [0, 5, 0, 15]
                    }
                }
            };

            pdfMake.createPdf(docDefinition).download(new Date().getTime() + ".pdf");

        }
        NProgress.done();
    }
    $scope.uploadProducts = function(data){
        console.log(data);
        swal({
            title: "Are you sure?",
            text: "You want to upload all products in sheet!",
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
                productsServiceMethods.bulkUpload($scope.myFile,data).then(function (response) {
                    if (response.status == 200) {
                        $scope.bulk ={
                            vendor :""
                        }
                        $scope.myFile = null;
                        $.notify({
                            title: '<strong>Success!</strong>',
                            message: "Successfully Uploaded"
                        }, {
                            type: 'success'
                        });
                    } 

                }).catch(function (err) {
                    console.log(err);
                    $.notify({
                        title: '<strong>Unsuccessful!</strong>',
                        message: err.data.error
                    }, {
                        type: 'danger'
                    });
                });

            }
        });
 
    }

}]);
app.directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;
          
          element.bind('change', function(){
             scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
             });
          });
       }
    };
 }]);
