app.factory("authService", ['$http', 'globalVars', '$q', '$window', '$localStorage','$http', function ($http, globalVars, $q, $window, $localStorage,$http) {
    var userInfo = {};
    var orderId = {};

    function login(credentials) {
        
        var deferred = $q.defer();
        var data = {
            identifier: credentials.identifier,
            password: credentials.password,
        };
        $http.post(globalVars.baseURL + 'user/login', data)
            .then(function (result) {

                userInfo = {
                    role: result.data.role,
                    userId: result.data.id,
                    accessToken: result.data.tokenId,
                    firstName: result.data.firstName,
                    lastName: result.data.lastName,
                    referral_code: result.data.referral_code,
                    gravatarUrl: result.data.gravatarUrl
                };
                deferred.resolve(userInfo);
            }, function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

     
    function Logout() {
        // remove user from local storage and clear http auth header
        delete $localStorage.currentUser;
        globalVars.userData ={};
        $http.defaults.headers.common.Authorization = '';
    }

    function getUserInfo() {
        if ($localStorage.currentUser) {
            userInfo = $localStorage.currentUser;
    }
    return userInfo;
};


function init() {
        if ($localStorage.currentUser) {
             
            userInfo = $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.accessToken;
        if (userInfo) {
            globalVars.userData = userInfo;
        } else {
            globalVars.userData = {};
        }
    } else {
        globalVars.userData = {};
    }

}
init();
return {
login: login,
init:init,
Logout: Logout,
getUserInfo: getUserInfo,
};
}])

 