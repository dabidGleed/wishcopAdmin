// wishcopVendor.factory("lookupService", ['$http', 'globalVars', '$q', function($http, globalVars, $q) {
//     var allServices = {};
//     var errorData;

//     allServices.lookUpError = function() {
//         var errorData = {
//             "error.user.password.required": "Please enter the password",
//             "error.login.user.Invalid": "Your Email doesn't exists / Email not Authorised",
//             "error.username.password.mismatch": "Your credentials do not match, please check the credentials",
//             "error.user.username.required": "Please enter your registered Email address",
//             "error.user.email.notFound": "Invalid email address, please enter your registered email address",
//             "error.user.email.NotVerified": "Email not verified, please check you email to authenticate",
//             "error.user.account.notFound": "Invalid Email/mobile number, please enter your registered Email/mobile number",
//             "error.user.referral_code.wrong": "Invalid Referral code"
//         }
//         return errorData;
//     }
//     return allServices;
// }]);
