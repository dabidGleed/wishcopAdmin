/**
* USERS LIST PAGE SERVICE
*/

app.factory('usersService', ['$http', 'globalVars', function ($http, globalVars) {
    var usersServiceMethods = {};
    var baseURL = globalVars.baseURL;
    
    usersServiceMethods.getVendorsList = function (page, searchData) {
        var query = "";
        if (searchData.name != "") {
            query += "&str=" + searchData.name;
        }
        if (searchData.status != "") {
            query += "&status=" + searchData.status;
        }
        var finalUrl = baseURL + "admin/list/all/vendors?limit=16&skip=" + page + query;
        return $http({
            method: 'GET',
            url: finalUrl
            // data: dataObj,
            // headers:
        })
    };
    usersServiceMethods.getUsersList = function (page, searchData) {
        var query = "";
        if (searchData.name != "") {
            query += "&str=" + searchData.name;
        }

        if (searchData.role != "") {
            query += "&role=" + searchData.role;
        }
        if (searchData.status != "") {
            query += "&status=" + searchData.status;
        }
        var finalUrl = baseURL + "admin/user/list/all?limit=16&skip=" + page + query;
        return $http({
            method: 'POST',
            url: finalUrl
            // data: dataObj,
            // headers:
        })
    };
    usersServiceMethods.stopOrStartSales = function (data) {
        
        var finalUrl = baseURL + "admin/"+data.vendorId+"/"+data.status+"/stop-resume/sales";
        return $http({
            method: 'GET',
            url: finalUrl
        })
    };
    usersServiceMethods.getCompetitorsList = function () {

        var finalUrl = baseURL + "competitors/list/all"
        return $http({
            method: 'GET',
            url: finalUrl
        })
    };
    usersServiceMethods.getCompetitorsList = function () {

        var finalUrl = baseURL + "competitors/list/all"
        return $http({
            method: 'GET',
            url: finalUrl
        })
    };
    //service to active user
    usersServiceMethods.activeUserStatus = function (userId, roles) {

        var finalUrl = baseURL + "admin/" + userId + "/make/active"
        return $http({
            method: 'POST',
            url: finalUrl,
            data: {role: roles},
            // headers:  
        })
    };

    //service to get user profile Detials
    usersServiceMethods.userprofileDetials = function (userId) {

        var finalUrl = baseURL + "vendor/" + userId + "/profile";
        return $http({
            method: 'GET',
            url: finalUrl
            // data: dataObj,
            // headers:  
        })
    };


    //service to delete user
    usersServiceMethods.deleteUserStatus = function (userId, roles) {

        var finalUrl = baseURL + "admin/" + userId + "/delete"
        return $http({
            method: 'POST',
            url: finalUrl,
            data: {role: roles}
            // headers:  
        })
    };
     //service to change role
     usersServiceMethods.changeRole = function (userId, roles) {

        var finalUrl = baseURL + "admin/" + userId + "/change/role"
        return $http({
            method: 'POST',
            url: finalUrl,
            data: {role: roles}
            // headers:  
        })
    };

    return usersServiceMethods;
}])