/**
 * INVENTORY MANAGEMENT SERVICES
 */

app.service('inventoryService', function ($http, globalVars, $localStorage) {
    var inventoryService = {};
    var baseURL = globalVars.baseURL;

    //service to get all payment transactions list
    inventoryService.getInventory = function (page, searchData, sortBy) {
        var query = "";
        if (!!searchData.name) {
            query = "&searchString=" + searchData.name;
        }
        if (!!searchData.vendor) {
            query += "&vendor=" + searchData.vendor;
        }
        if (!!searchData.subVendor) {
            query += "&subVendor=" + searchData.subVendor;
        }
        console.log(sortBy);
        if(searchData.itemId) query += "&itemId=" + searchData.itemId;
        if(!sortBy){
            sortBy ="updatedAt"
        }

        var finalUrl = baseURL + "inventory/list/items?limit=30&sort="+sortBy+"&skip=" + page + query;
        return $http({
            method: 'GET',
            url: finalUrl
        });
    };

    //service to update status

    inventoryService.updateItem = function (saleId, sale) {
        var finalUrl = baseURL + "inventory/" + saleId + "/update";
        return $http({
            method: 'POST',
            url: finalUrl,
            data: sale
        });
    };
    inventoryService.getSaleDetails = function(saleId){
        var finalUrl = baseURL + "sales/"+saleId+"/saledetails";
        return $http({
            method: 'GET',
            url: finalUrl
        });
    }

    inventoryService.getVendorsList = function (type) {

        var finalUrl = baseURL + "admin/vendor/list";
        if (type) {
            finalUrl = baseURL + "admin/vendor/list?type=DISTRIBUTOR";
        }
        return $http({
            method: 'GET',
            url: finalUrl
        });
    };
    inventoryService.getBuyersList = function (type) {

        var finalUrl = baseURL + "admin/buyer/list?admin=true";
        return $http({
            method: 'GET',
            url: finalUrl
        });
    };
    //service to get order Details
    inventoryService.getOrderDetails = function (orderId, saleId) {
        var finalUrl = baseURL + 'orders/' + orderId + '/' + saleId + '/trackorder';
        return $http({
            method: 'GET',
            url: finalUrl
        });
    };

    inventoryService.getSubBrands = function() {
        var finalUrl = baseURL + 'user/list/'+globalVars.userData.userId+'/subbrands';
        return $http({
                method: "GET",
                url: finalUrl,
                headers: { Authorization: 'Bearer ' + globalVars.userData.uId }
            });
    }

    inventoryService.getProdCatagories = function() {
        var finalUrl = baseURL + 'category/get/all';
        return $http({
                method: "GET",
                url: finalUrl,
                headers: { Authorization: 'Bearer ' + globalVars.userData.uId }
            });
    }

    inventoryService.getSubChooseCategory = function(catid) {
        var finalUrl = baseURL + 'subcategory/' + catid + '/all';
        return $http({
                method: "GET",
                url: finalUrl,
                headers: { Authorization: 'Bearer ' + globalVars.userData.uId }
            });
    }
    inventoryService.createAddProduct = function(formdata) {

        var finalUrl = baseURL + 'products/' + formdata.owner + '/createproduct';
        console.log($localStorage.currentUser.accessToken);
        return $http({
            method: "POST",
            url: finalUrl,
            data: formdata,
            headers: { 'Content-Type': 'application/json' , Authorization: 'Bearer ' + $localStorage.currentUser.accessToken }
        });
    }
    
    return inventoryService;
});
