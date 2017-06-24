// Global configuration Settings
 
app.factory('globalVars', ['$state', function ($state, $location) {
    return {
        // baseURL:'http://ec2-35-164-109-129.us-west-2.compute.amazonaws.com', // Testing
        baseURL: 'http://ec2-52-43-72-177.us-west-2.compute.amazonaws.com/', // Development
        // baseURL:'/api',

        userData: {} 
    };
}])

