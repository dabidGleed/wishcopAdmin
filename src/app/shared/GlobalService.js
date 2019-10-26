// Global configuration Settings
 
app.factory('globalVars', [function () {
    return { 
        // baseURL: 'http://localhost:1337/',
        // baseURL: 'http://ec2-52-40-70-96.us-west-2.compute.amazonaws.com:1337/', // NEW DEV URL
        // baseURL:'https://wishcop.com/api/',
        baseURL:'/api/',
        userData: {} 
    };
}]);

