// Global configuration Settings
 
app.factory('globalVars', ['$state', function ($state) {
    return {
        baseURL: 'http://ec2-52-40-70-96.us-west-2.compute.amazonaws.com:1337/', // NEW DEV URL
        // baseURL:'/api/',

        userData: {} 
    };
}]);

