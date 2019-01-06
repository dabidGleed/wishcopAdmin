// Global configuration Settings
 
app.factory('globalVars', ['$state', function ($state, $location) {
    return {
        // baseURL: 'http://ec2-52-43-72-177.us-west-2.compute.amazonaws.com/', // Development
        baseURL: 'http://ec2-52-40-70-96.us-west-2.compute.amazonaws.com:1337/', // NEW DEV URL
        // baseURL:'/api/',

        userData: {} 
    };
}]);

