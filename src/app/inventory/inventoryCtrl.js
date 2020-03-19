/**
 * PRODUCTS LIST PAGE CONTROLLER
 */

app.controller('inventoryCtrl', ["$scope", "inventoryService", "$filter","$state", function ($scope, inventoryService, $filter, $state) {
    $scope.currentPage = 1;
    $scope.itemsPerPage = 16;
    $scope.totalCount = 0;
    $scope.round = Math.round;
    $scope.propertyName = 'title';
    $scope.reverse = true;
    $scope.search = {
        name: "",
        vendor: ""
    };
    $scope.myImage = '';
    $scope.product = {
        specialOffer: 'NIL'
    };
    $scope.newVariant = {
        name: "",
        value: [],
        images: []
    };
    $scope.loadingProgressIcon = [];
    $scope.product.variator = [];
    $scope.product.gst = 12;
    $scope.product.minimum_quantity = 1;
    $scope.product.quantity =0;
    
    $scope.product.images = [];
    $scope.product.specifications = [];
    $scope.getItems = function (data, searchData, sortBy) {
        NProgress.start();
        inventoryService.getInventory(data, searchData, sortBy).then(function (response) {
            $scope.saleslist = response.data.sales;
            $scope.totalCount = response.data.totalCount;
            NProgress.done();
        });
    };
    
    if(!!$state.params.itemId){
        $scope.search.itemId = $state.params.itemId;
        $scope.getItems(0, $scope.search);
    }else{
        $scope.getItems(0, $scope.search);
    }
    $scope.editItem = function(sale){

        sale.gst = $scope.round(100*sale.sale_items[0].tax_price/sale.sale_items[0].price);
        $scope.saleDetails = JSON.parse(JSON.stringify(sale));
        sale.editable = true;
    };
    $scope.cancelItem = function(sale){
        $scope.getItems($scope.pageDataList, $scope.search);
    };
    inventoryService.getVendorsList().then(function (response) {
        $scope.vendorList = response.data;
        $scope.vendors = [];
        
        angular.forEach($scope.vendorList, function (value, key) {
            if(!!value.profile) $scope.vendors.push(value);
        });
        console.log($scope.vendors);
    });
    // Update Inventory
    $scope.updateItem = function (sale) {
        var item = {};
        item.MRPprice = sale.total_MRP;
        item.offerPrice = sale.sale_items[0].price;
        sale.sale_items[0].tax_price = Number((item.offerPrice*sale.gst/100).toFixed(2))
        // sale.quantity = parseInt(sale.available + sale.quantity);
        item.quantity = sale.quantity? sale.quantity: 0;
        item.minimum_quantity = sale.minimum_quantity;
        item.gst = sale.gst? sale.gst : $scope.round(100*sale.sale_items[0].tax_price/sale.sale_items[0].price);
        
        console.log(item);
        inventoryService.updateItem(sale.id, item).then(function (response) {
            $.notify({
                title: '<strong>Success!</strong>',
                message: response.data.message
            }, {
                type: 'success'
            });
            sale.editable = false;
        }, function (response) {
            var message = "";
            if(response.data.message){
                message = response.data.message;
            }else if(response.data.error){
                message = response.data.error;
            }else{
                message = "Something went wrong";
            }
            $.notify({
                title: '<strong>Unsuccessful!</strong>',
                message: response.data.message
            }, {
                type: 'danger'
            });
        });

    };

    // users list filters
    $scope.resetFilters = function () {
        if($scope.search.itemId){
            $state.go("main.inventory",{itemId: null},{reload:true})
        }else{
            $scope.search = {
                name: "",
                vendor: "",
                subVendor: ""
            };
            $scope.subBrands =[];
            $scope.getItems(0, $scope.search)
        }
    };
    $scope.pageChanged = function (newPage) {
        $scope.pageDataList = (newPage - 1) * ($scope.itemsPerPage);
        $scope.getItems($scope.pageDataList, $scope.search);
    };

    $scope.$watch("search.vendor", function () {
        if (!!$scope.search.vendor) {
            var subVendors = $filter('filter')($scope.vendorList, {
                id: $scope.search.vendor
            });
            if(subVendors[0].profile && subVendors[0].profile.subBrands){
                subVendors = subVendors[0].profile;
                $scope.subBrands = $filter('filter')(subVendors.subBrands, {
                    status: 'ACTIVE'
                }); 
            }
            $scope.getItems(0, $scope.search);
        }
    });
    $scope.selectVendor = function () {
        if (!!$scope.product.owner) {
            var subVendors = $filter('filter')($scope.vendorList, {
                id: $scope.product.owner
            });
            if(subVendors[0].profile && subVendors[0].profile.subBrands){
                subVendors = subVendors[0].profile;
                $scope.subVendors = $filter('filter')(subVendors.subBrands, {
                    status: 'ACTIVE'
                }); 
            }   
        }
    };

    $scope.$watch("search.subVendor", function () {
        if (!!$scope.search.subVendor) {
            $scope.getItems(0, $scope.search);
        }
    });

    $scope.$watch("search.name", function () {
        if(!!$scope.search.name){
            $scope.getItems(0, $scope.search);
        }
        
    });

    //modal popup details of the Product
    $scope.productDetails = function (productData) {
        $scope.modalDetials = {};
        inventoryService.getSaleDetails(productData.id).then(function (response) {
            console.log(response);
            $scope.modalDetials = response.data;
        }, function (response) {
            $.notify({
                title: '<strong>Unsuccessful!</strong>',
                message: "Something went wrong"
            }, {
                type: 'danger'
            });
        });
    };

    /**
     * Initialize categories to chooseCategory scope variable
     * method  : getProdCatagories     */
    inventoryService.getProdCatagories().then(function (response) {
        $scope.chooseCategory = response.data;
    });

    inventoryService.getSubBrands().then(function (response) {
        $scope.subBrands = response.data;
    });

     /**
     * scope function selectCategory to get listallProducts scope variable
     * method  : getProductList
     */
    $scope.selectCategory = function () {
        $scope.categoryLoad = true;
        inventoryService.getSubChooseCategory($scope.product.category).then(function (response) {
            $scope.chooseSubCategory = response.data;
            $scope.categoryLoad = false;
        });
    };

    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
        if($scope.reverse) $scope.getItems(0, $scope.search, $scope.propertyName+" DESC");
        else $scope.getItems(0, $scope.search, $scope.propertyName +" ASC");
    };
    $scope.createProduct = function () {
        angular.forEach($scope.variantsObj, function (key, value) {
            if (key.images.length == 0) {
                key.images[0] = $scope.product.images[0];
            }
        });
        $scope.product.pickuppoints = [];
        $scope.product.tagsList = [];
        $scope.product.variants = $scope.variantsObj;
        $scope.product.competitiveProducts = [];

        $scope.product.product_type = "NORMAL";

        $scope.product.taxes = [{ discount: $scope.product.gst, name: "GST" }];
        delete $scope.product.gst;
        if ($scope.product.images.length === 0) {
            var img = [];
            if ($scope.product.subBrand) {
                img = $filter('filter')($scope.subVendors, { "id": $scope.product.subBrand }, true);
                $scope.product.images.push(img[0].SubimageLogo);
            }
        }
        $scope.product.bulk_type = true;

        $scope.product.bulk_sale_details = {
            quantity: $scope.product.quantity,
            minimum_quantity: $scope.product.minimum_quantity,
            variants: $scope.product.variants

        };
        delete $scope.product.quantity;
        delete $scope.product.minimum_quantity;
        console.log($scope.product);
        inventoryService.createAddProduct($scope.product).then(function (response) {
            $.notify({
                title: '<strong>Success!</strong>',
                message: "Successfully Created"
            }, {
                type: 'success'
            });
            $('#addProduct').modal('hide');
            $scope.loadingProgress1 = false;
            $scope.product = {};
        },function (response) {
            $.notify({
                title: '<strong>Unsuccessful!</strong>',
                message: response.data.message
            }, {
                type: 'danger'
            });
        });
    };
     /**
     * scope function variantAdd to add Variants for selected products
     * like color,size
     */
    $scope.$watch('product.variator', function (newValue, oldValue, scope) {
        $scope.permutationsData($scope.product.variator);
        $scope.checkVariantQuantites();
    }, true);

    $scope.$watch('variantsObj', function (newValue, oldValue, scope) {
        $scope.checkVariantQuantites();
    }, true);
    $scope.$watch('product.quantity', function (newValue, oldValue, scope) {
        $scope.checkVariantQuantites();
    }, true); 

    function getPermutation(n, arraysToCombine,keyNames, divisors) {
        var curArray,
            finalObj = {
                images: [],
                isActive: "Available"
            };

        for (var i = 0; i < arraysToCombine.length; i++) {
            curArray = arraysToCombine[i];
            var keyNameValue = keyNames[i];
            finalObj[keyNameValue] = curArray[Math.floor(n / divisors[i]) % curArray.length];

        }

        return finalObj;
    }
    $scope.permutationsData = function (variants) {
        var arraysToCombine = [];
        var keyNames = [];
        angular.forEach(variants, function (value, key) {
            arraysToCombine.push(value.value.split(","));
            keyNames.push(value.name);
        });
        console.log(keyNames);
        $scope.variantsObjInitial = keyNames;

        if (arraysToCombine.length > 0) {
            var divisors = [];
            for (var i = arraysToCombine.length - 1; i >= 0; i--) {
                divisors[i] = divisors[i + 1] ? divisors[i + 1] * arraysToCombine[i + 1].length : 1;
            }
            var numPerms = arraysToCombine[0].length;
            for (i = 1; i < arraysToCombine.length; i++) {
                numPerms *= arraysToCombine[i].length;
            }
            var combinations = [];
            for (i = 0; i < numPerms; i++) {
                combinations.push(getPermutation(i, arraysToCombine, keyNames, divisors));
            }
            $scope.variantsObj = combinations;
        }

        if (arraysToCombine.length === 0) {
            $scope.variantsObj = [];
        }
    };
    $scope.variantAdd = function (data) {
        if (data.name && (data.value.length > 0)) {
            $scope.variantTitleError = false;
            $scope.variantDataError = false;
            $scope.product.variator.push({
                name: data.name,
                value: data.value
            });
            $scope.newVariant = {
                name: "",
                value: []
            };
        } else {
            if (!data.name) {
                $scope.variantTitleError = true;
            } else {
                $scope.variantTitleError = false;
            }
            if (data.value.length == 0) {
                $scope.variantDataError = true;
            } else {
                $scope.variantDataError = false;
            }
        }
    };
    /**
     * scope function variantRemove to remove variants for selected products
     * like color,size
     */
    $scope.variantRemove = function (v) {
        $scope.product.variator.splice(v, 1);
    };

    $scope.checkVariantQuantites = function () {
        if ($scope.variantsObj.length > 0 ) {
            var totalQuantity = 0;
                var quantity = Math.ceil(parseInt($scope.product.quantity) / parseInt($scope.variantsObj.length));
                angular.forEach($scope.variantsObj, function (key, value) {
                    key.variantQuantity = quantity;
                    totalQuantity += key.variantQuantity;
                });
                if ($scope.product.quantity > totalQuantity) {
                    $scope.variantQuantityError = false;
                } else {
                    $scope.variantQuantityError = true;
                }
        } else { $scope.variantQuantityError = false; }
    };

}]);
